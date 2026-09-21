"""Vérifie que l'invite de mise à jour ne remplace pas une fenêtre ouverte."""
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]

class UpdatePromptTests(unittest.TestCase):
    def test_update_prompt_waits_until_modal_closes(self):
        source = (ROOT / 'app.js').read_text()
        start = source.index('let pendingUpdateRegistration=null;')
        end = source.index("window.addEventListener('beforeinstallprompt'", start)
        update_code = source[start:end]
        close_start = source.index('function closeModal(){')
        close_end = source.index("document.addEventListener('keydown'", close_start)
        close_code = source[close_start:close_end]
        script = r'''const vm=require('vm');let visible=true,body='saisie non validée',warnings=0,opened=0;
const backdrop={classList:{contains:()=>visible,remove:()=>{visible=false}},setAttribute:()=>{}};
const elements={modalBackdrop:backdrop,applyAppUpdate:{},modalTitle:{},modalBody:{}};
const context={document:{getElementById:id=>elements[id],contains:()=>false},toast:()=>warnings++,queueMicrotask:fn=>fn(),modalReturnFocus:null,modalFieldSnapshot:()=>[],requestAnimationFrame:()=>{},modalFocusable:()=>[],HTMLElement:class {}};
context.openModal=(title,html)=>{opened++;body=html;visible=true;};
vm.createContext(context);
vm.runInContext(process.argv[1]+process.argv[2],context);
const reg={waiting:{postMessage:()=>{}}};
context.showUpdateReady(reg);
if(opened!==0||body!=='saisie non validée'||warnings!==1)throw Error('la saisie a été remplacée');
context.closeModal();
if(opened!==1||!body.includes('Mettre à jour'))throw Error('invite absente après fermeture');
console.log('Fenêtre de saisie préservée ; invite différée jusqu’à sa fermeture.');'''
        result = subprocess.run(['node', '-e', script, update_code, close_code], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
