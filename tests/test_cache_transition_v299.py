import pathlib
import re
import unittest

SW = (pathlib.Path(__file__).resolve().parents[1] / "sw.js").read_text()

class CacheTransitionTests(unittest.TestCase):
    def test_shared_selector_used_for_activation_and_fallback(self):
        self.assertNotIn("function selectPreviousCache(keys)", SW)
        self.assertIn("const previous = await selectCompletePreviousCache();", SW)
        self.assertIn("const previousKey = await selectCompletePreviousCache();", SW)
        self.assertNotIn("for (const key of keys)", SW)

    def test_fallback_excludes_executable_resources(self):
        self.assertIn("if (isCore || !['image', 'font'].includes(request.destination))", SW)

if __name__ == "__main__":
    unittest.main()
