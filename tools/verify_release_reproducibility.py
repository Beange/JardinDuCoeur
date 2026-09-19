#!/usr/bin/env python3
"""Build a release ZIP twice and emit an external reproducibility attestation.

The attestation must live outside the source tree to avoid a self-hash recursion:
a ZIP cannot contain a stable record of its own final SHA-256 while that record
itself changes the ZIP bytes.
"""
from __future__ import annotations
import argparse, hashlib, json, subprocess, sys, tempfile, zipfile
from pathlib import Path

def sha256(p: Path) -> str:
    h=hashlib.sha256()
    with p.open('rb') as f:
        for b in iter(lambda:f.read(1024*1024), b''): h.update(b)
    return h.hexdigest()

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--root',type=Path,required=True)
    ap.add_argument('--archive-root',required=True)
    ap.add_argument('--report',type=Path,required=True)
    args=ap.parse_args()
    root=args.root.resolve(); report=args.report.resolve()
    builder=root/'tools/build_release_zip.py'
    with tempfile.TemporaryDirectory(prefix='jdc-repro-') as td:
        a=Path(td)/'build-a.zip'; b=Path(td)/'build-b.zip'
        for out in (a,b):
            subprocess.run([sys.executable,str(builder),'--root',str(root),'--output',str(out),'--archive-root',args.archive_root],check=True,capture_output=True,text=True)
        ha,hb=sha256(a),sha256(b)
        with zipfile.ZipFile(a) as za, zipfile.ZipFile(b) as zb:
            na,nb=za.namelist(),zb.namelist()
        result={
          'schemaVersion':1,'project':'Jardin du Cœur','release':('V'+args.archive_root.rsplit('_v',1)[1] if '_v' in args.archive_root else args.archive_root),
          'purpose':'External deterministic ZIP double-build attestation; stored outside the ZIP to avoid self-hash recursion.',
          'archiveRoot':args.archive_root,
          'builder':'tools/build_release_zip.py','builderSha256':sha256(builder),
          'sourceFileSetContract':'data/religious-library-release-archive-fileset-v1.json',
          'buildA':{'sha256':ha,'entryCount':len(na)},
          'buildB':{'sha256':hb,'entryCount':len(nb)},
          'byteIdentical':ha==hb and na==nb,
          'entryListsIdentical':na==nb,
          'crossToolchainBitIdentityClaimed':False,
          'selfReferencePolicy':'Report is external to the archive; final ZIP SHA-256 is therefore recordable without changing archive bytes.'
        }
        report.parent.mkdir(parents=True,exist_ok=True)
        report.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n','utf-8')
        if not result['byteIdentical']:
            raise SystemExit('Reproducibility verification failed')
        print(json.dumps(result,ensure_ascii=False))
if __name__=='__main__': main()
