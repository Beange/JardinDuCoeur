import pathlib, subprocess, unittest
ROOT=pathlib.Path(__file__).resolve().parents[1]
class UpdateModalTests(unittest.TestCase):
    def test_controllerchange_preserves_unsaved_modal_and_reloads_when_clean(self):
        source=(ROOT/'app.js').read_text()
        start=source.index("navigator.serviceWorker.addEventListener('controllerchange'")
        handler=source[start:source.index('});',start)+3]
        script=r'''const vm=require('vm');let reloads=0,warnings=0,saves=0;const events={};
const context={navigator:{serviceWorker:{addEventListener:(n,fn)=>events[n]=fn}},location:{reload:()=>reloads++},toast:()=>warnings++};
vm.createContext(context);
vm.runInContext('let refreshingFromServiceWorker=false;function hasUnsavedModalFields(){return globalThis.dirty};function persistBeforeLeave(){globalThis.saves++;return globalThis.canSave};'+process.argv[1],context);
context.saves=0;context.dirty=true;context.canSave=true;events.controllerchange();if(reloads||context.saves||warnings!==1)process.exit(1);
context.dirty=false;context.canSave=false;events.controllerchange();if(reloads||context.saves!==1||warnings!==2)process.exit(2);
context.canSave=true;events.controllerchange();if(reloads!==1||context.saves!==2)process.exit(3);
console.log('modal modifiee: pas de rechargement; sauvegarde impossible: pas de rechargement; formulaire propre: rechargement');'''
        result=subprocess.run(['node','-e',script,handler],capture_output=True,text=True)
        self.assertEqual(result.returncode,0,result.stderr)
    def test_modal_fields_are_compared_to_initial_values(self):
        js=(ROOT/'app.js').read_text()
        self.assertIn('modalInitialFields=modalFieldSnapshot();',js)
        self.assertIn('field.value!==modalInitialFields[i].value',js)
        self.assertIn('field.checked!==modalInitialFields[i].checked',js)
        self.assertIn("onclick=()=>{closeModal();registration.waiting.postMessage",js)
