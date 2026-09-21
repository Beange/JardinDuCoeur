import pathlib, unittest
SW=(pathlib.Path(__file__).resolve().parents[1]/'sw.js').read_text()
class CacheInstallTests(unittest.TestCase):
 def test_failed_install_deletes_partial_cache(self):
  self.assertIn('await cache.addAll(CORE)', SW)
  self.assertIn('await caches.delete(CACHE)', SW)
  self.assertIn('throw error;', SW)
 def test_previous_cache_completeness_checked(self):
  self.assertIn('async function isCompleteCache(key)', SW)
  self.assertIn('async function selectCompletePreviousCache()', SW)
  self.assertIn('if (await isCompleteCache(key)) return key;', SW)
if __name__=='__main__': unittest.main()
