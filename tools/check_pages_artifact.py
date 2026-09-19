#!/usr/bin/env python3
"""Verify GitHub Pages artifact has every resource required for install and offline use."""
from pathlib import Path
import re,sys
root=Path(sys.argv[1]) if len(sys.argv)>1 else Path('_site')
index=(root/'index.html').read_text(encoding='utf-8')
sw=(root/'sw.js').read_text(encoding='utf-8')
core=re.search(r'const CORE = \[(.*?)\];',sw,re.S)
if not core: raise SystemExit('Missing service worker CORE list')
paths=re.findall(r"'\./([^']+)'",core.group(1))
paths+=re.findall(r'(?:src|href)="\./([^"#?]+)',index)
paths+=['index.html','sw.js','manifest.webmanifest','.nojekyll']
missing=sorted({p for p in paths if not (root/p).is_file()})
if missing: raise SystemExit('Missing published resources: '+', '.join(missing))
print(f'GitHub Pages artifact OK: {len(set(paths))} required resources present')
