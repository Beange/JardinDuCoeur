import pathlib, unittest
SW = (pathlib.Path(__file__).resolve().parents[1] / 'sw.js').read_text()
class CacheManifestTests(unittest.TestCase):
 def test_versioned_manifest_written_after_core_install(self):
  self.assertLess(SW.index('await cache.addAll(CORE)'), SW.index('JSON.stringify({ core: CORE })'))
 def test_previous_cache_checked_against_own_manifest(self):
  self.assertIn('required = manifest.core', SW)
  self.assertIn('for (const path of required)', SW)
  self.assertIn('const LEGACY_CORE_V302 = ', SW)
 def test_invalid_modern_manifest_rejected(self):
  self.assertIn('>= 303) return false', SW)
if __name__ == '__main__': unittest.main()
