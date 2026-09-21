import pathlib, subprocess, unittest
ROOT = pathlib.Path(__file__).resolve().parents[1]
class UpdateSaveTests(unittest.TestCase):
    def test_failed_storage_prevents_reload(self):
        js = (ROOT/'app.js').read_text()
        start = js.index("navigator.serviceWorker.addEventListener('controllerchange'")
        handler = js[start:js.index('});', start)+3]
        self.assertIn('if(!persistBeforeLeave())', handler)
        self.assertLess(handler.index('if(!persistBeforeLeave())'), handler.index('location.reload()'))
        self.assertIn('return false', js[js.index('function persistBeforeLeave()'):js.index("window.addEventListener('pagehide'")])
    def test_controllerchange_behavior(self):
        source=(ROOT/'app.js').read_text()
        start=source.index("navigator.serviceWorker.addEventListener('controllerchange'")
        handler=source[start:source.index('});',start)+3]
        script = r"""const vm=require('vm');let writes=0,reloads=0,warnings=0;const events={};
const context={navigator:{serviceWorker:{addEventListener:(n,fn)=>events[n]=fn}},location:{reload:()=>reloads++},toast:()=>warnings++};
vm.createContext(context);
vm.runInContext('let refreshingFromServiceWorker=false;function hasUnsavedModalFields(){return false};function persistBeforeLeave(){return globalThis.canSave};'+process.argv[1],context);
context.canSave=false;events.controllerchange();if(reloads!==0||warnings!==1)process.exit(1);
context.canSave=true;events.controllerchange();if(reloads!==1)process.exit(2);
events.controllerchange();if(reloads!==1)process.exit(3);
console.log('controllerchange: echec bloque, succes recharge une seule fois');"""
        result=subprocess.run(['node','-e',script,handler],capture_output=True,text=True)
        self.assertEqual(result.returncode,0,result.stderr)
