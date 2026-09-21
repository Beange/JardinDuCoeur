import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class MarkupRegression(unittest.TestCase):
 def test_about_markup(self):
  self.assertNotIn('<divclass=', (ROOT/'index.html').read_text())
  self.assertIn('<div class="jdc-inline-13">', (ROOT/'index.html').read_text())
 def test_backup_buttons_classes(self):
  source=(ROOT/'app.js').read_text()
  self.assertNotIn('class="mini-btn" class=',source)
  self.assertNotIn('class="mini-btn danger-btn" class=',source)
  self.assertIn('class="mini-btn danger-btn jdc-inline-12"',source)

class DynamicMarkupRegression(unittest.TestCase):
 def test_no_duplicate_class_attributes_in_dynamic_fragments(self):
  import re
  source=(ROOT/"app.js").read_text()
  self.assertNotIn('class="faith-status faith-verified" class=',source)
  self.assertEqual(source.count('class="faith-status faith-verified jdc-inline-7"'),2)

class AdditionalDynamicMarkupRegression(unittest.TestCase):
 def test_no_duplicate_class_attributes_in_app_templates(self):
  import re
  source=(ROOT/'app.js').read_text()
  self.assertIsNone(re.search(r'class="[^"]+"\s+class=',source))
  self.assertIn('class="subtle jdc-inline-1"',source)
  self.assertIn('class="faith-status jdc-inline-8"',source)

class NavigationCspRegression(unittest.TestCase):
 def test_generated_navigation_has_no_inline_handler(self):
  source=(ROOT/'app.js').read_text()
  self.assertIn('data-nav-target="${i[3]}"', source)
  self.assertNotIn('onclick="go(${i[3]})"', source)
  self.assertIn("button[data-nav-target]", source)
