import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const htmlPath = path.join(root, 'index.html');
const outPath = path.join(root, 'data', 'religious-library-implemented.json');
const html = fs.readFileSync(htmlPath, 'utf8');
const m = html.match(/const DAILY_QUOTES = (\[[\s\S]*?\n\]);\nconst DAILY_SCENES=/);
if (!m) throw new Error('DAILY_QUOTES introuvable dans index.html');
const quotes = vm.runInNewContext(m[1], Object.create(null), { timeout: 1000 });
const payload = {
  schemaVersion: 1,
  extractedFrom: 'index.html',
  extractionMode: 'exact runtime DAILY_QUOTES array',
  status: 'implemented-provisional',
  note: 'Ce fichier reflète uniquement les citations effectivement présentes dans le code actuel. Il ne constitue pas le corpus canonique 183 entrées audité dans la conversation.',
  count: quotes.length,
  entries: quotes
};
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n');
console.log(`Extracted ${quotes.length} entries -> ${outPath}`);
