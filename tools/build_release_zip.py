#!/usr/bin/env python3
"""Build a byte-reproducible Jardin du Cœur release ZIP from the declared file set.

The builder is administrative only: it never mutates religious data. It verifies
that the source tree matches the archive file-set contract, then writes files in
lexicographic order with fixed ZIP metadata.
"""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path
import zipfile

FIXED_DATE_TIME = (1980, 1, 1, 0, 0, 0)
FILE_MODE = 0o100644
COMPRESSION = zipfile.ZIP_DEFLATED
COMPRESSLEVEL = 9
CONTRACT = Path("data/religious-library-release-archive-fileset-v1.json")


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def regular_files(root: Path) -> list[str]:
    out: list[str] = []
    for p in root.rglob("*"):
        if p.is_symlink():
            raise SystemExit(f"Refusing symbolic link: {p.relative_to(root).as_posix()}")
        if p.is_file():
            out.append(p.relative_to(root).as_posix())
    return sorted(out)


def declared_files(root: Path) -> list[str]:
    data = json.loads((root / CONTRACT).read_text("utf-8"))
    entries = data.get("entries")
    if not isinstance(entries, list) or not all(isinstance(x, str) for x in entries):
        raise SystemExit("Archive file-set contract has invalid entries")
    if entries != sorted(entries) or len(entries) != len(set(entries)):
        raise SystemExit("Archive file-set entries must be sorted and unique")
    return entries


def build(root: Path, output: Path, archive_root: str) -> str:
    root = root.resolve()
    output = output.resolve()
    declared = declared_files(root)
    actual = regular_files(root)
    if declared != actual:
        missing = sorted(set(declared) - set(actual))
        extra = sorted(set(actual) - set(declared))
        raise SystemExit(f"File-set mismatch; missing={missing!r}; extra={extra!r}")

    output.parent.mkdir(parents=True, exist_ok=True)
    if output.exists():
        output.unlink()
    with zipfile.ZipFile(output, "w", compression=COMPRESSION, compresslevel=COMPRESSLEVEL, allowZip64=True) as zf:
        zf.comment = b""
        for rel in declared:
            src = root / rel
            arcname = f"{archive_root.rstrip('/')}/{rel}"
            info = zipfile.ZipInfo(arcname, date_time=FIXED_DATE_TIME)
            info.create_system = 3
            info.external_attr = FILE_MODE << 16
            info.compress_type = COMPRESSION
            info.extra = b""
            info.comment = b""
            with src.open("rb") as f:
                payload = f.read()
            zf.writestr(info, payload, compress_type=COMPRESSION, compresslevel=COMPRESSLEVEL)
    return sha256(output)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", type=Path, required=True)
    ap.add_argument("--output", type=Path, required=True)
    ap.add_argument("--archive-root", required=True)
    args = ap.parse_args()
    digest = build(args.root, args.output, args.archive_root)
    print(f"{digest}  {args.output}")


if __name__ == "__main__":
    main()
