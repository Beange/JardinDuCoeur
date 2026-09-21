import pathlib, unittest
SW = (pathlib.Path(__file__).resolve().parents[1] / "sw.js").read_text()
class CacheIntegrityTests(unittest.TestCase):
    def test_complete_cache_checks_all_core_resources(self):
        body = SW.split("async function isCompleteCache(key) {", 1)[1].split("async function selectCompletePreviousCache()", 1)[0]
        self.assertIn("for (const path of required)", body)
        self.assertIn("if (!(await cache.match(new URL(path, self.registration.scope).href))) return false;", body)
        self.assertIn("required = manifest.core", body)
if __name__ == "__main__": unittest.main()
