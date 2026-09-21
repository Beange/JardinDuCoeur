import pathlib, re, unittest
ROOT = pathlib.Path(__file__).resolve().parents[1]
class SecurityV285(unittest.TestCase):
 def test_csp_meta_has_no_ineffective_frame_ancestors(self):
  html=(ROOT/'index.html').read_text()
  meta=re.search(r'<meta[^>]+http-equiv="Content-Security-Policy"[^>]+>',html)
  self.assertIsNotNone(meta)
  self.assertNotIn('frame-ancestors',meta.group())
  self.assertIn("script-src 'self'",meta.group())
 def test_deployment_headers(self):
  headers=(ROOT/'_headers').read_text()
  self.assertIn("frame-ancestors 'none'",headers)
  self.assertIn('X-Content-Type-Options: nosniff',headers)
  self.assertIn('X-Frame-Options: DENY',headers)
  self.assertIn("script-src 'self'",headers)
 def test_cache_version_and_core_files(self):
  sw=(ROOT/'sw.js').read_text()
  self.assertIn("const CACHE = 'jardin-du-coeur-v309'",sw)
  core=re.search(r'const CORE = \[(.*?)\];',sw,re.S).group(1)
  for rel in re.findall(r"'\./([^']+)'",core):
   self.assertTrue((ROOT/rel).is_file(),rel)
  self.assertNotIn('localStorage.clear(',sw)
if __name__=='__main__': unittest.main()
