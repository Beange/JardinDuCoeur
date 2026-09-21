// Simulation sans navigateur : compatibilité des caches et cycle de vie du service worker.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '..', 'sw.js'), 'utf8');
const scope = 'https://example.test/jardin/';
const stores = new Map();
const key = path => new URL(path, scope).href;
function store(name) { if (!stores.has(name)) stores.set(name, new Map()); return stores.get(name); }
const caches = {
  async keys() { return [...stores.keys()]; },
  async open(name) { const entries = store(name); return {
    async match(req) { return entries.get(typeof req === 'string' ? req : req.url); },
    async put(req, response) { entries.set(typeof req === 'string' ? req : req.url, response); },
    async addAll(paths) { for (const p of paths) entries.set(key(p), new Response('ok')); }
  }; },
  async delete(name) { return stores.delete(name); }
};
const handlers = {};
let claimed = false;
const self = { registration: { scope }, location: { origin: new URL(scope).origin }, clients: { async claim() { claimed = true; } }, addEventListener(name, fn) { handlers[name] = fn; }, skipWaiting() {} };
const context = vm.createContext({ caches, self, URL, Request, Response, fetch: async () => { throw Error('offline'); } });
vm.runInContext(source, context, { filename: 'sw.js' });
const select = () => vm.runInContext('selectCompletePreviousCache()', context);
const core = vm.runInContext('CORE', context);
const legacy = vm.runInContext('LEGACY_CORE_V302', context);
async function seed(version, paths, marker) {
  const c = await caches.open('jardin-du-coeur-v' + version);
  for (const path of paths) await c.put(key(path), new Response('ok'));
  if (marker !== undefined) await c.put(key('./__cache_ready__'), new Response(marker));
}
async function dispatch(name, event) {
  let pending;
  handlers[name]({ ...event, waitUntil(promise) { pending = promise; } });
  if (pending) await pending;
}
(async () => {
  // V302 : marqueur texte historique, liste complète historique.
  await seed(302, legacy, 'ready');
  assert.equal(await select(), 'jardin-du-coeur-v302', 'V302 historique complet retenu');
  store('jardin-du-coeur-v302').delete(key(legacy[1]));
  assert.equal(await select(), undefined, 'V302 historique incomplet rejeté');
  stores.clear();
  // Un manifeste propre à V303 reste valable si le CORE de la version active grandit.
  await seed(303, ['./', './index.html'], JSON.stringify({ core: ['./', './index.html'] }));
  assert.equal(await select(), 'jardin-du-coeur-v303', 'cache V303 valide sélectionné comme précédent');
  // Un cache moderne incomplet est rejeté, même avec un manifeste valide.
  store("jardin-du-coeur-v303").delete(key("./index.html"));
  assert.equal(await select(), undefined, "cache V303 endommagé rejeté");
  stores.clear();
  await seed(303, ['./', './index.html'], '{incorrect');
  assert.equal(await select(), undefined, 'manifeste V303 invalide rejeté');
  stores.clear();
  // Installation, activation et navigation hors ligne avec la vraie liste CORE.
  await seed(302, legacy, 'ready');
  await seed(299, legacy, 'ready');
  await dispatch('install', {});
  assert.equal(store('jardin-du-coeur-v309').size, core.length + 1, 'installation du noyau et manifeste');
  await dispatch('activate', {});
  assert.equal(claimed, true, 'prise de contrôle des clients');
  assert.deepEqual([...stores.keys()].sort(), ['jardin-du-coeur-v302', 'jardin-du-coeur-v309']);
  let responsePromise;
  // Request.mode ne peut pas être forcé par Node ; vérifier une ressource du noyau hors ligne.
  handlers.fetch({ request: new Request(key('./app.js')), respondWith(p) { responsePromise = p; } });
  assert.equal(await (await responsePromise).text(), 'ok', 'ressource du noyau disponible hors ligne');
  console.log('Simulation: V302 historique, manifeste V303, installation, activation et ressource hors ligne validés');
})().catch(e => { console.error(e); process.exitCode = 1; });
