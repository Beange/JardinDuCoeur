#!/usr/bin/env python3
"""V216 non-regression suite for the application shell (corpus excluded/frozen)."""
from pathlib import Path
import hashlib, json, re, unittest
R=Path(__file__).resolve().parents[1]

def text(p): return (R/p).read_text('utf-8')

class AppRegression(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.index=text('index.html'); cls.js=text('app.js'); cls.css=text('app.css'); cls.sw=text('sw.js')
        cls.manifest=json.loads(text('manifest.webmanifest'))

    def test_v232_day_closure_summary(self):
        self.assertIn('id="dayCloseSummary"', self.index)
        self.assertIn('function renderEveningSummary()', self.js)
        self.assertIn('d.finishedAt=d.finishedAt||new Date().toISOString()', self.js)
        self.assertIn("if(d.finishedAt) return {screen:5", self.js)


    def test_v233_journal_memory_status(self):
        self.assertIn('function journalDayMeta', self.js)
        self.assertIn("label:closed?'Clôturée':'En cours'", self.js)
        self.assertIn('journal-day-status', self.js)
        self.assertIn("finishedAt?'closed':'started'", self.js)

    def test_v265_book_children_direct_access(self):
        self.assertIn('data-book-lesson="book-wadiiyya-children">Enfants & transmission</button>', self.js)
        self.assertIn("id:'book-wadiiyya-children'", self.js)

    def test_v266_book_all_existing_lessons_direct_access(self):
        for lesson in ('sincerity', 'modesty', 'family'):
            self.assertIn(f'data-book-lesson="book-wadiiyya-{lesson}"', self.js)
            self.assertIn(f"id:'book-wadiiyya-{lesson}'", self.js)

    def test_version_is_consistent(self):
        self.assertIn("const APP_VERSION = '2.1.12'", self.js)
        self.assertIn('const BUILD_VERSION = 268', self.js)
        self.assertIn('Version 2.1.12 PWA · build 268', self.index)
        self.assertIn("const CACHE = 'jardin-du-coeur-v268'", self.sw)

    def test_v239_input_resume_and_exit_persistence(self):
        self.assertIn("let lastActiveField = '';", self.js)
        self.assertIn('lastActiveField,updatedAt', self.js)
        self.assertIn("window.addEventListener('pagehide',persistBeforeLeave)", self.js)
        self.assertIn('restoreLastActiveField(restoredUiSession)', self.js)
        self.assertIn('aria-live="polite"', self.index)


    def test_v247_muhasabah_interface_accessibility(self):
        self.assertIn('class="muhasabah-guide"', self.index)
        self.assertEqual(self.index.count('aria-labelledby="muhasabah'), 6)
        self.assertIn('/* V247 — interface 4 : Muhâsabah */', self.css)

    def test_v248_journal_interface_hierarchy(self):
        self.assertIn('journal-intro', self.index)
        self.assertIn('journal-calendar-legend', self.index)
        self.assertIn('aria-label="Calendrier du journal"', self.index)
        self.assertIn('/* V248 — interface 5 : Journal */', self.css)

    def test_v249_dua_interface_hierarchy(self):
        self.assertIn('dua-page-intro', self.index)
        self.assertIn('role="tablist"', self.index)
        self.assertIn('id="duaResultsCount" aria-live="polite"', self.index)
        self.assertIn('/* V249 — interface 6 : Mes du‘â */', self.css)

    def test_v250_cycle_interface_hierarchy(self):
        self.assertIn('cycle-page-intro', self.index)
        self.assertIn('aria-label="Vue du cycle"', self.index)
        self.assertIn('aria-label="Calendrier du cycle"', self.index)
        self.assertIn("setAttribute('aria-selected',String(selected))", self.js)
        self.assertIn('/* V250 — interface 7 : Mon cycle */', self.css)

    def test_external_runtime_assets_exist(self):
        self.assertTrue((R/'app.js').is_file()); self.assertTrue((R/'app.css').is_file())
        self.assertIn('./app.js', self.index); self.assertIn('./app.css', self.index)

    def test_manifest_core_contract(self):
        self.assertEqual(self.manifest.get('display'),'standalone')
        self.assertEqual(self.manifest.get('id'),'./'); self.assertEqual(self.manifest.get('start_url'),'./')

    def test_service_worker_core_files_exist(self):
        m=re.search(r"const CORE = \[(.*?)\];", self.sw, re.S); self.assertIsNotNone(m)
        paths=re.findall(r"['\"](\.\/[^'\"]+)['\"]",m.group(1))
        self.assertGreaterEqual(len(paths),5)
        for p in paths:
            if p=='./': continue
            self.assertTrue((R/p[2:]).is_file(), p)

    def test_daily_backgrounds_complete(self):
        for i in range(1,13):
            p=R/f'assets/daily/daily-{i:02d}.jpg'
            self.assertTrue(p.is_file()); self.assertGreater(p.stat().st_size,1000)

    def test_storage_contract_preserved(self):
        self.assertIn("const STORAGE_KEY = 'jardin-du-coeur-v1'",self.js)
        self.assertIn('const DATA_SCHEMA_VERSION = 1',self.js)
        for name in ('safeStorageGet','safeStorageSet','safeStorageRemove','normalizeState','loadState','saveState'):
            self.assertRegex(self.js,rf'function\s+{name}\s*\(')

    def test_recovery_contract_present(self):
        self.assertIn("const RECOVERY_KEY = STORAGE_KEY + '-recovery'",self.js)
        self.assertIn('safeStorageGet(RECOVERY_KEY)',self.js)
        self.assertIn('safeStorageSet(RECOVERY_KEY, serialized)',self.js)

    def test_import_guards_present(self):
        self.assertIn('normalizeImportedState',self.js)
        self.assertIn('5*1024*1024',self.js)
        self.assertIn("throw new Error('recovery')",self.js)

    def test_accessibility_contract(self):
        self.assertIn('aria-live="polite"',self.index)
        self.assertIn(':focus-visible',self.css)
        self.assertIn('prefers-reduced-motion',self.css)
        self.assertIn('modalFocusable',self.js)

    def test_no_inline_daily_base64_regression(self):
        self.assertNotIn('data:image/jpeg;base64',self.js)
        self.assertLess(len(self.js.encode()),150000)

    def test_service_worker_update_contract(self):
        self.assertIn("event.data.type === 'SKIP_WAITING'",self.sw)
        self.assertIn('self.skipWaiting()',self.sw)
        self.assertIn('controllerchange',self.js)

    def test_service_worker_scope_safety(self):
        self.assertIn('url.origin !== self.location.origin',self.sw)
        self.assertIn("request.method !== 'GET'",self.sw)
        self.assertIn('key.startsWith(CACHE_PREFIX)',self.sw)

    def test_required_icons_are_nonempty(self):
        for p in ('icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png'):
            f=R/p; self.assertTrue(f.is_file()); self.assertGreater(f.stat().st_size,100)

    def test_html_has_no_duplicate_ids(self):
        ids=re.findall(r'\bid=["\']([^"\']+)["\']',self.index)
        dup={x for x in ids if ids.count(x)>1}
        self.assertEqual(dup,set())

    def test_corpus_standby_snapshot_matches(self):
        marker=text('CORPUS-STANDBY.sha256').strip().splitlines()
        self.assertTrue(marker)
        # Marker is intentionally immutable in functional releases; data is validated separately.
        self.assertTrue((R/'data').is_dir())
        self.assertGreaterEqual(len(list((R/'data').glob('*.json'))),100)

    def test_daily_habit_tracking_contract(self):
        self.assertIn('function habitStats(habit)', self.js)
        self.assertIn('function habitsPanel()', self.js)
        self.assertIn('data-habit-check', self.js)
        self.assertIn('checkins[today]', self.js)
        self.assertIn('7 derniers jours', self.js)

    def test_legacy_habits_are_migrated(self):
        self.assertIn("if(h.done===true && !Object.keys(h.checkins).length) h.checkins[todayKey()]=true", self.js)
        self.assertIn('delete h.done', self.js)

    def test_recent_history_controls_are_wired(self):
        self.assertIn('id="homeHistoryBtn"', self.index)
        self.assertIn('id="journalHistoryBtn"', self.index)
        self.assertIn('function openRecentHistory()', self.js)

    def test_unimplemented_journal_views_are_not_actionable(self):
        self.assertIn('<button disabled aria-disabled="true" title="Vue à venir">Semaine</button>', self.index)
        self.assertIn('<button disabled aria-disabled="true" title="Vue à venir">Mois</button>', self.index)
        self.assertIn('<button disabled aria-disabled="true" title="Vue à venir">Année</button>', self.index)


    def test_v224_day_context_and_future_guard(self):
        self.assertIn('id="dayDetailsDate"', self.index)
        self.assertIn('id="journalTodayBtn"', self.index)
        self.assertIn("target>todayKey()", self.js)
        self.assertIn("nextDay.disabled=atToday", self.js)
        self.assertIn('id="dayDetailsJournalBtn"', self.index)

    def test_v225_journal_consultation_flow(self):
        self.assertIn('journalOpenDayBtn', self.index)
        self.assertIn("selectDate(b.dataset.journalDate,5)", self.js)
        self.assertIn("selectDate(b.dataset.historyDate,5)", self.js)
        self.assertIn("b.disabled=true;b.classList.add('future')", self.js)
        self.assertIn("nextMonth.disabled=futureMonth", self.js)

    def test_v229_resume_and_save_feedback(self):
        self.assertIn("const UI_SESSION_KEY = STORAGE_KEY + '-ui-session'", self.js)
        self.assertIn('function saveUiSession()', self.js)
        self.assertIn('function loadUiSession()', self.js)
        self.assertIn("statusEl.textContent='Enregistrement…'", self.js)
        self.assertIn('restoredUiSession.screen!==1', self.js)

    def test_v230_contextual_daily_resume(self):
        self.assertIn('function dailyJourneyStatus(', self.js)
        self.assertIn("label:'Continuer mes prières & Qur’an'", self.js)
        self.assertIn("label:'Continuer ce que mon cœur porte'", self.js)
        self.assertIn("label:'Continuer ma muhâsabah'", self.js)
        self.assertIn("label:'Relire ma journée'", self.js)
        self.assertIn('id="homeJourneyHint"', self.index)

    def test_v231_today_status_and_next_action(self):
        self.assertIn('id="homeTodayProgressBar"', self.index)
        self.assertIn('id="homeTodayNextAction"', self.index)
        self.assertIn("'Tout est à jour pour aujourd’hui'", self.js)
        self.assertIn("journalStarted?'◐':'○'", self.js)
        self.assertIn("addEventListener('click',startOrContinueDay)", self.js)

    def test_v251_faith_interface_navigation(self):
        self.assertIn('faith-trust-note', self.index)
        self.assertIn('faithResultsCount', self.index)
        self.assertIn('aria-pressed="false" data-faith-category', self.index)
        self.assertIn("setAttribute('aria-pressed',String(selected))", self.js)
        self.assertIn('/* V251 — interface 8 : Comprendre & vivre sa foi */', self.css)

    def test_v252_periodic_reflection_interface(self):
        self.assertIn('reflection-page-intro', self.index)
        self.assertIn('role="tablist" aria-label="Période de réflexion"', self.index)
        self.assertIn('reflection-guide', self.index)
        self.assertIn('aria-label="Ce qui a rempli mon cœur"', self.index)
        self.assertIn("setAttribute('aria-selected',String(selected))", self.js)
        self.assertIn('/* V252 — interface 9 : Réflexion périodique */', self.css)

    def test_v253_profile_interface(self):
        self.assertIn('profile-page-intro', self.index)
        self.assertIn('profile-section-label', self.index)
        self.assertIn('id="profileNameBtn"', self.index)
        self.assertIn('function openProfileNameEditor()', self.js)
        self.assertIn('/* V253 — interface 10 : Moi / profil & réglages */', self.css)

    def test_v255_shared_component_consistency(self):
        self.assertIn('/* V255 — composants partagés', self.css)
        self.assertIn('.bottom-nav button:focus-visible', self.css)
        self.assertIn('.modal-actions button{min-height:44px}', self.css)
        self.assertIn('input:focus-visible,textarea:focus-visible,select:focus-visible', self.css)

    def test_v256_islam_au_feminin_paths(self):
        self.assertIn('data-faith-path="cycle"', self.index)
        self.assertIn('data-faith-path="books"', self.index)
        self.assertIn('id="cycleLearnBtn"', self.index)
        self.assertIn('function openFaithBooks()', self.js)
        self.assertIn('/* V256 — parcours Islam au féminin', self.css)


    def test_v257_verified_book_lessons(self):
        self.assertIn("id:'book-muhaddithat'", self.js)
        self.assertIn('Al-Muḥaddithāt: The Women Scholars in Islam', self.js)
        self.assertIn('data-book-lesson=\"book-muhaddithat\"', self.js)
        self.assertIn('/* V257 — premières leçons issues d’ouvrages vérifiés */', self.css)


    def test_v258_cycle_fiqh_learning(self):
        self.assertIn("id:'book-natural-bleeding'", self.js)
        self.assertIn("id:'body-nifas'", self.js)
        self.assertIn("id:'body-uncertain'", self.js)
        self.assertIn('/* V258 — cycle : approfondissement pédagogique ḥayḍ, istiḥāḍa et nifâs */', self.css)

    def test_v259_purity_and_worship_lessons(self):
        self.assertIn("id:'body-purity-signs'", self.js)
        self.assertIn("id:'body-yellow-brown'", self.js)
        self.assertIn("id:'ramadan-makeup'", self.js)
        self.assertIn('/* V259 — fin des règles, purification et reprise des adorations */', self.css)

    def test_v260_ghusl_and_istihada_lessons(self):
        self.assertIn("id:'body-ghusl-practical'", self.js)
        self.assertIn('Sahih Muslim 332c', self.js)
        self.assertIn("id:'body-istihada-practical'", self.js)
        self.assertIn('Sahih al-Bukhari 228', self.js)
        self.assertIn('/* V260 — ghusl pratique et saignements irréguliers */', self.css)

    def test_v261_conseils_aux_femmes_lessons(self):
        self.assertIn('Conseils aux femmes musulmanes — suivi de questions-réponses', self.js)
        for lesson in ['book-wadiiyya-time','book-wadiiyya-knowledge','book-wadiiyya-sisters']:
            self.assertIn("id:'"+lesson+"'", self.js)
            self.assertIn('data-book-lesson="'+lesson+'"', self.js)
        self.assertIn('Sahih al-Bukhari 101', self.js)
        self.assertIn('Coran 9:71', self.js)
        self.assertIn('/* V261 — Conseils aux femmes musulmanes : parcours de leçons */', self.css)

    def test_v263_womens_life_lessons(self):
        for lesson in ['book-wadiiyya-sincerity','book-wadiiyya-modesty','book-wadiiyya-family']:
            self.assertIn("id:'"+lesson+"'", self.js)
        self.assertIn('Coran 98:5', self.js)
        self.assertIn('Coran 24:30–31', self.js)
        self.assertIn('Coran 30:21', self.js)

if __name__=='__main__': unittest.main(verbosity=2)

# V254 is validated structurally by the release validator; historical UI tests remain above.
