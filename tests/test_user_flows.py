#!/usr/bin/env python3
"""V228 smoke contracts for the main user journeys. Corpus intentionally excluded."""
from pathlib import Path
import re, unittest
R=Path(__file__).resolve().parents[1]
HTML=(R/'index.html').read_text('utf-8'); JS=(R/'app.js').read_text('utf-8')

def has_id(x): return bool(re.search(rf'\bid=["\']{re.escape(x)}["\']',HTML))
class UserFlows(unittest.TestCase):
 def test_today_to_day_to_muhasabah_to_journal(self):
  for x in ['homeMuhasabahBtn','dayToMuhasabahBtn','muhasabahBackBtn','muhasabahJournalBtn','finishDayBtn']:
   self.assertTrue(has_id(x),x); self.assertIn(x,JS)
  self.assertIn("selectedDate=todayKey()",JS)
 def test_journal_review_and_resume(self):
  for x in ['journalRecent','journalHistoryBtn','journalOpenDayBtn','journalTodayBtn']:
   self.assertTrue(has_id(x),x); self.assertIn(x,JS)
  self.assertIn('openRecentHistory',JS); self.assertIn('selectDate',JS)
 def test_habits_objectives_progress(self):
  for token in ['habitsPanel','objectivesPanel','progressPanel','data-progress-go','data-habit-check']:
   self.assertIn(token,JS)
 def test_backup_restore_guards(self):
  for token in ['saveRecoverySnapshot','normalizeImportedState','5*1024*1024','RECOVERY_KEY']:
   self.assertIn(token,JS)
 def test_pwa_update_and_offline(self):
  for token in ['showUpdateReady','controllerchange',"addEventListener('offline'","addEventListener('online'"]:
   self.assertIn(token,JS)
 def test_critical_static_targets_exist(self):
  ids=['homeHistoryBtn','homeMuhasabahBtn','journalHistoryBtn','journalRecent','journalOpenDayBtn','journalTodayBtn','dayDetailsDate','dayDetailsJournalBtn','dayDetailsTodayBtn','dayBackToBasicsBtn','dayToMuhasabahBtn','muhasabahDate','muhasabahBackBtn','muhasabahJournalBtn','finishDayBtn','toast','modalBackdrop','modalClose','modalBody']
  self.assertEqual([x for x in ids if not has_id(x)],[])
  self.assertEqual([x for x in ids if x not in JS],[])
if __name__=='__main__': unittest.main(verbosity=2)
