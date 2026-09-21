import pathlib, unittest
SW=(pathlib.Path(__file__).resolve().parents[1]/'sw.js').read_text()
class CacheHttpTests(unittest.TestCase):
 def test_http_error_handling(self):
  self.assertIn('response.status < 500',SW)
  self.assertIn("if (isCore || !['image', 'font'].includes(request.destination))",SW)
  self.assertIn('if (response) return response;',SW)
 def test_cache_version(self):
  self.assertIn("const CACHE = 'jardin-du-coeur-v309'",SW)
if __name__=='__main__': unittest.main()
