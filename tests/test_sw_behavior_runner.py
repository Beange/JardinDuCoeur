"""Exécute la simulation comportementale du service worker avec la suite Python."""
import pathlib
import shutil
import subprocess
import unittest


class ServiceWorkerBehaviorTest(unittest.TestCase):
    def test_cache_transition_simulation(self):
        node = shutil.which('node')
        if not node:
            self.skipTest('Node.js indisponible : simulation du service worker non exécutée')
        script = pathlib.Path(__file__).with_name('test_sw_behavior_v303.js')
        result = subprocess.run([node, str(script)], capture_output=True, text=True, timeout=20)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn('Simulation:', result.stdout)

class ServiceWorkerFetchTest(unittest.TestCase):
    def test_network_fallback_simulation(self):
        node = shutil.which('node')
        if not node:
            self.skipTest('Node.js indisponible : simulation fetch non exécutée')
        script = pathlib.Path(__file__).with_name('test_sw_fetch_v306.js')
        result = subprocess.run([node, str(script)], capture_output=True, text=True, timeout=20)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn('Simulation fetch:', result.stdout)
