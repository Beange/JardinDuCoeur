// Scénarios de récupération réseau du vrai service worker, exécuté dans un VM Node.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
const scope = 'https://example.test/jardin/';
const absolute = p => new URL(p, scope).href;
const stores = new Map();
const entries = name => { if (!stores.has(name)) stores.set(name, new Map()); return stores.get(name); };
const caches = {
  async keys() { return [...stores.keys()]; },
  async open(name) { const data = entries(name); return {
    async match(request) { return data.get(typeof request === 'string' ? absolute(request) : request.url); },
    async put(request, response) { data.set(typeof request === 'string' ? absolute(request) : request.url, response); },
    async addAll(paths) { for (const p of paths) data.set(absolute(p), new Response('current')); }
  }; },
  async delete(name) { return stores.delete(name); }
};
const handlers = {};
let network = async () => { throw Error('offline'); };
const self = { registration: { scope }, location: { origin: new URL(scope).origin },
  clients: { async claim() {} }, addEventListener(type, callback) { handlers[type] = callback; }, skipWaiting() {} };
const context = vm.createContext({ caches, self, URL, Request, Response, fetch: request => network(request) });
vm.runInContext(source, context, { filename: 'sw.js' });
const legacy = vm.runInContext('LEGACY_CORE_V302', context);
const core = vm.runInContext('CORE', context);
async function request(url, destination) {
  let promise;
  handlers.fetch({ request: { url: absolute(url), method: 'GET', mode: 'no-cors', destination }, respondWith(value) { promise = value; } });
  assert.ok(promise, 'requête prise en charge');
  return promise;
}
(async () => {
  const previous = entries('jardin-du-coeur-v302');
  for (const p of legacy) previous.set(absolute(p), new Response('legacy core'));
  previous.set(absolute('./__cache_ready__'), new Response('ready'));
  previous.set(absolute('./assets/old-photo.jpg'), new Response('previous image'));
  previous.set(absolute('./assets/old-font.woff2'), new Response('previous font'));
  const current = entries('jardin-du-coeur-v309');
  for (const p of core) current.set(absolute(p), new Response('current core'));
  current.set(absolute('./__cache_ready__'), new Response(JSON.stringify({core: [...core]})));
  const image = './assets/old-photo.jpg';
  network = async () => new Response('not found', { status: 404 });
  assert.equal((await request(image, 'image')).status, 404, '404 non masquée par ancien cache');
  network = async () => new Response('server error', { status: 503 });
  assert.equal(await (await request(image, 'image')).text(), 'previous image', '503 image : secours ancien cache');
  network = async () => { throw Error('offline'); };
  assert.equal(await (await request('./assets/old-font.woff2', 'font')).text(), 'previous font', 'panne réseau police : secours');
  assert.equal(await (await request('./app.js', 'script')).text(), 'current core', 'noyau actif servi hors ligne');
  current.delete(absolute('./app.js'));
  await assert.rejects(request('./app.js', 'script'), /offline/, 'noyau manquant : aucun mélange avec ancien cache');
  await assert.rejects(request(image, 'script'), /offline/, 'script non noyau : pas de secours ancien cache');
  console.log('Simulation fetch: 404, 503, panne réseau, police, noyau actif et absence de mélange validés');
})().catch(error => { console.error(error); process.exitCode = 1; });
