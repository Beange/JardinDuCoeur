// noms accessibles de repli
function navMarkup(active){
const items=[
['today','home','Aujourd’hui',1],['journal','notebook','Journal',5],['duas','dua','Du‘â',6],['cycle','cycle','Mon cycle',7],['profile','user','Moi',10]
];
return '<nav class="bottom-nav" aria-label="Navigation principale">'+items.map(i=>`<button class="${active===i[0]?'active':''}" ${active===i[0]?'aria-current="page"':''} onclick="go(${i[3]})" aria-label="${i[2]}"><span class="svg-icon" data-icon="${i[1]}"></span><span>${i[2]}</span></button>`).join('')+'</nav>';
}
function renderIcons(){
document.querySelectorAll('.svg-icon[data-icon]').forEach(el=>{
const name=el.getAttribute('data-icon');
const body=ICONS[name]||ICONS.info;
el.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
});
}
document.querySelectorAll('Nav').forEach(n=>{
const active=n.getAttribute('active');
n.outerHTML=navMarkup(active);
});
function go(n,btn){
currentScreen=Number(n)||1;
let target=null;
document.querySelectorAll('.screen').forEach(s=>{
const active=s.dataset.screen===String(n);
s.classList.toggle('active',active);
s.setAttribute('aria-hidden',active?'false':'true');
if(active) target=s;
});
document.querySelectorAll('.screen-switcher button').forEach((b,i)=>b.classList.toggle('active',i===n-1));
const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});
saveUiSession();
if(target){
const heading=target.querySelector('h1,h2,.section-title,.salam');
if(heading){heading.setAttribute('tabindex','-1');requestAnimationFrame(()=>heading.focus({preventScroll:true}));}
}
}
document.querySelectorAll('.chips .chip').forEach(b=>b.addEventListener('click',()=>{b.parentElement.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
renderIcons();
document.querySelectorAll('.profile-action').forEach(el=>{
el.setAttribute('role','button');el.setAttribute('tabindex','0');
el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});
});
document.querySelectorAll('.screen').forEach(s=>s.setAttribute('aria-hidden',s.classList.contains('active')?'false':'true'));
document.querySelectorAll('textarea,input:not([type="hidden"]),select').forEach(el=>{
if(el.hasAttribute('aria-label')||el.hasAttribute('aria-labelledby')||el.labels?.length)return;
const hint=el.getAttribute('placeholder')||el.getAttribute('data-field')||el.getAttribute('data-period-field');
if(hint)el.setAttribute('aria-label',hint);
});
document.querySelectorAll('[data-field]').forEach(el=>{
el.addEventListener('focus',()=>{lastActiveField=el.dataset.field||'';saveUiSession();el.closest('.card,.prompt')?.classList.add('field-active');});
el.addEventListener('blur',()=>{el.closest('.card,.prompt')?.classList.remove('field-active');});
});
document.querySelectorAll('.screen[data-screen="4"] textarea[data-field]').forEach((el,i,all)=>{
el.addEventListener('keydown',e=>{
if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();const next=all[i+1];if(next){next.focus();next.scrollIntoView({block:'center',behavior:'smooth'});}else document.getElementById('finishDayBtn')?.focus();}
});
});
const DAILY_MOSQUE_BACKGROUNDS = [
'./assets/daily/daily-01.jpg',
'./assets/daily/daily-02.jpg',
'./assets/daily/daily-03.jpg',
'./assets/daily/daily-04.jpg',
'./assets/daily/daily-05.jpg',
'./assets/daily/daily-06.jpg',
'./assets/daily/daily-07.jpg',
'./assets/daily/daily-08.jpg',
'./assets/daily/daily-09.jpg',
'./assets/daily/daily-10.jpg',
'./assets/daily/daily-11.jpg',
'./assets/daily/daily-12.jpg',
'./assets/daily/daily-13.jpg',
'./assets/daily/daily-14.jpg',
'./assets/daily/daily-15.jpg',
'./assets/daily/daily-16.jpg',
'./assets/daily/daily-17.jpg',
'./assets/daily/daily-18.jpg',
'./assets/daily/daily-19.jpg',
'./assets/daily/daily-20.jpg'
];
const DAILY_SCENES=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const DAILY_BACKGROUNDS=[0,1,2,3,4,5,6].map(i=>DAILY_MOSQUE_BACKGROUNDS[i%DAILY_MOSQUE_BACKGROUNDS.length]);
function applyDailyMosqueBackground() {
const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const dayOfYear = Math.floor((now - start) / 86400000);
const index = dayOfYear % DAILY_MOSQUE_BACKGROUNDS.length;
document.documentElement.style.setProperty(
'--daily-mosque-bg',
`url("${DAILY_MOSQUE_BACKGROUNDS[index]}")`
);
}
applyDailyMosqueBackground();
const STORAGE_KEY = 'jardin-du-coeur-v1';
const APP_VERSION = '2.1.12';
const BUILD_VERSION = 268;
const UI_SESSION_KEY = STORAGE_KEY + '-ui-session';
const RECOVERY_KEY = STORAGE_KEY + '-recovery';
const DATA_SCHEMA_VERSION = 1;
const LEGACY_INTENTION_KEY = 'jardin-du-coeur-intention';
let storageWarningShown=false;
function reportStorageFailure(){
if(storageWarningShown)return;
storageWarningShown=true;
setTimeout(()=>toast('Stockage local indisponible — exporte tes données si possible'),0);
}
function safeStorageGet(key){
try{return localStorage.getItem(key)}catch(err){console.error('Jardin du Cœur — lecture locale impossible',err);reportStorageFailure();return null}
}
function safeStorageSet(key,value){
try{localStorage.setItem(key,value);return true}catch(err){console.error('Jardin du Cœur — écriture locale impossible',err);reportStorageFailure();return false}
}
function safeStorageRemove(key){
try{localStorage.removeItem(key);return true}catch(err){console.error('Jardin du Cœur — suppression locale impossible',err);reportStorageFailure();return false}
}
const state = loadState();
let selectedDate = todayKey();
let journalEditMode = true;
let calendarCursor = dateFromKey(selectedDate);
let currentScreen = 1;
let lastActiveField = '';
function saveUiSession(){
safeStorageSet(UI_SESSION_KEY,JSON.stringify({screen:currentScreen,selectedDate,lastActiveField,updatedAt:new Date().toISOString()}));
}
function loadUiSession(){
try{
const raw=safeStorageGet(UI_SESSION_KEY); if(!raw)return null;
const s=JSON.parse(raw);
if(!Number.isInteger(s.screen)||s.screen<1||s.screen>10)return null;
if(typeof s.selectedDate!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s.selectedDate)||s.selectedDate>todayKey())s.selectedDate=todayKey();
if(typeof s.lastActiveField!=='string'||!/^[A-Za-z0-9_-]{1,64}$/.test(s.lastActiveField))s.lastActiveField='';
return s;
}catch(_e){return null}
}
function emptyState(){return {days:{},duas:[],cycles:[],reflections:{},profile:{objectives:[],habits:[],garden:[]}}}
function normalizeState(parsed){
if(!parsed || typeof parsed!=='object' || Array.isArray(parsed)) parsed={};
if (!parsed.days || typeof parsed.days !== 'object' || Array.isArray(parsed.days)) parsed.days = {};
if (!Array.isArray(parsed.duas)) parsed.duas = [];
if (!Array.isArray(parsed.cycles)) parsed.cycles = [];
if (!parsed.reflections || typeof parsed.reflections !== 'object' || Array.isArray(parsed.reflections)) parsed.reflections = {};
if (!parsed.profile || typeof parsed.profile !== 'object' || Array.isArray(parsed.profile)) parsed.profile = {};
if (!Array.isArray(parsed.profile.objectives)) parsed.profile.objectives = [];
parsed.profile.objectives = parsed.profile.objectives.map(o=>{
if(!o || typeof o!=='object') return {id:uid(),text:String(o||''),done:false,createdAt:todayKey(),completedAt:null};
if(!o.id) o.id=uid();
if(!o.createdAt) o.createdAt=todayKey();
if(o.done && !o.completedAt) o.completedAt=todayKey();
if(!o.done) o.completedAt=null;
return o;
});
if (!Array.isArray(parsed.profile.habits)) parsed.profile.habits = [];
parsed.profile.habits = parsed.profile.habits.map(h=>{
if(!h || typeof h!=='object') return {id:uid(),text:String(h||''),checkins:{}};
if(!h.checkins || typeof h.checkins!=='object' || Array.isArray(h.checkins)) h.checkins={};
if(h.done===true && !Object.keys(h.checkins).length) h.checkins[todayKey()]=true;
delete h.done;
return h;
});
if (!Array.isArray(parsed.profile.garden)) parsed.profile.garden = [];
return parsed;
}
function loadState(){
const raw=safeStorageGet(STORAGE_KEY);
if(!raw) return emptyState();
try { return normalizeState(JSON.parse(raw)); }
catch(e){
try{
const recovery=safeStorageGet(RECOVERY_KEY);
if(recovery) return normalizeState(JSON.parse(recovery));
}catch(_e){}
return emptyState();
}
}
function saveState(){
const statusEl=document.querySelector('.save-state');
if(statusEl){statusEl.textContent='Enregistrement…';statusEl.classList.remove('save-error');statusEl.classList.add('show');}
try{
const serialized=JSON.stringify(state);
if(!safeStorageSet(STORAGE_KEY, serialized)) throw new Error('storage');
safeStorageSet(RECOVERY_KEY, serialized);
const el=document.querySelector('.save-state');
if(el){
el.textContent=`✓ Enregistré à ${new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})} sur cet appareil`;
el.classList.remove('save-error');
el.classList.add('show');
clearTimeout(saveState._t);
saveState._t=setTimeout(()=>el.classList.remove('show'),2200);
}
return true;
}catch(err){
console.error('Jardin du Cœur — échec de sauvegarde', err);
const el=document.querySelector('.save-state');
if(el){
el.textContent='Impossible d’enregistrer cette modification';
el.classList.add('show','save-error');
}
toast('Impossible d’enregistrer cette modification');
return false;
}
}
function todayKey(){ return keyFromDate(new Date()); }
function keyFromDate(d){
const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0');
return `${y}-${m}-${day}`;
}
function dateFromKey(k){ const [y,m,d]=k.split('-').map(Number); return new Date(y,m-1,d,12); }
function dayData(k=selectedDate){
if(!state.days[k]) state.days[k]={prayers:{fajr:'Non renseignée',dhuhr:'Non renseignée',asr:'Non renseignée',maghrib:'Non renseignée',isha:'Non renseignée'}};
if(!state.days[k].prayers) state.days[k].prayers={};
return state.days[k];
}
function hasContent(d){
if(!d) return false;
const textFields=['intention','quranSurah','quranFrom','quranTo','quranReflection','dhikr','gratitude','dua','heartNotes','dayWord','eveningDua','mood','muhasabahCloser','muhasabahAway','muhasabahLearned','muhasabahGrateful','muhasabahRepair','muhasabahEntrust','sadaqah','selfCare'];
return textFields.some(k=>String(d[k]||'').trim()) || Object.values(d.prayers||{}).some(v=>v && v!=='Non renseignée');
}
function hasStartedDay(d){
return !!(d && (d.startedAt || hasContent(d)));
}
function dailyJourneyStatus(d=dayData(todayKey())){
const prayers=Object.values(d.prayers||{}).filter(v=>v&&v!=='Non renseignée').length;
const quran=Boolean(String(d.quranSurah||'').trim()||String(d.quranFrom||'').trim()||String(d.quranTo||'').trim()||String(d.quranReflection||'').trim());
const dayFields=['dhikr','gratitude','dua','heartNotes','dayWord'];
const dayDetails=dayFields.filter(k=>String(d[k]||'').trim()).length;
const reflectionFields=['muhasabahCloser','muhasabahAway','muhasabahLearned','muhasabahGrateful','muhasabahRepair','muhasabahEntrust','eveningDua'];
const reflection=reflectionFields.filter(k=>String(d[k]||'').trim()).length;
if(d.finishedAt) return {screen:5,label:'Relire ma journée',hint:'Ta journée est clôturée et disponible dans le Journal.'};
if(!hasStartedDay(d)) return {screen:2,label:'Commencer ma journée',hint:'Commence par tes prières et ta lecture du jour.'};
if(prayers<5 && !quran) return {screen:2,label:'Continuer mes prières & Qur’an',hint:`${prayers}/5 prières renseignées · lecture à compléter`};
if(dayDetails<5) return {screen:3,label:'Continuer ce que mon cœur porte',hint:`${dayDetails}/5 repères renseignés dans ta journée`};
if(reflection<7) return {screen:4,label:'Continuer ma muhâsabah',hint:`${reflection}/7 éléments renseignés dans ta muhâsabah`};
return {screen:5,label:'Relire ma journée',hint:'Ta journée est renseignée. Tu peux la relire dans le Journal.'};
}
function startOrContinueDay(){
const d=dayData(todayKey());
if(!d.startedAt){ d.startedAt=new Date().toISOString(); saveState(); }
selectedDate=todayKey();
calendarCursor=dateFromKey(selectedDate);
const next=dailyJourneyStatus(d);
renderSelectedDay();
renderCalendar();
renderHomeDaily();
go(next.screen);
}
function frDate(d, withYear=true){
return new Intl.DateTimeFormat('fr-FR',{weekday:'long',day:'numeric',month:'long',...(withYear?{year:'numeric'}:{})}).format(d).replace(/^./,c=>c.toUpperCase());
}
function hijriDate(d){
try {
return new Intl.DateTimeFormat('fr-FR-u-ca-islamic-umalqura',{day:'numeric',month:'long',year:'numeric'}).format(d) + ' · indicatif';
} catch(e){ return 'Date hégirienne indicative indisponible'; }
}
function setPrayerVisual(select){
const dot=select.closest('.prayer-row').querySelector('.status-dot');
dot.className='status-dot'; dot.textContent='';
if(select.value==='À l’heure'){dot.classList.add('done');dot.textContent='✓'}
else if(select.value==='En retard'){dot.classList.add('late');dot.textContent='◁'}
else dot.classList.add('empty');
}
function renderSelectedDay(){
const d=dayData(), date=dateFromKey(selectedDate);
document.getElementById('homeDate').textContent=frDate(new Date());
document.getElementById('homeHijri').textContent=hijriDate(new Date());
document.getElementById('journalDate').textContent=frDate(date,false);
document.getElementById('journalHijri').textContent=hijriDate(date);
const detailsDate=document.getElementById('dayDetailsDate'); if(detailsDate) detailsDate.textContent=frDate(date,true);
const dayProgress=document.getElementById('daySectionProgress'); if(dayProgress){const fields=['dhikr','gratitude','dua','heartNotes','dayWord'];const filled=fields.filter(k=>String(d[k]||'').trim()).length;dayProgress.textContent=`${filled}/5 repères renseignés${selectedDate===todayKey()?' aujourd’hui':''}`;}
const nextDay=document.getElementById('nextDay'); if(nextDay){const atToday=selectedDate>=todayKey();nextDay.disabled=atToday;nextDay.setAttribute('aria-disabled',String(atToday));nextDay.title=atToday?'Aucune journée future':'';}
const summaryContext=document.getElementById('summaryContext'); if(summaryContext){const meta=journalDayMeta(d);summaryContext.textContent=(selectedDate===todayKey()?'Aujourd’hui':'Journée passée')+(hasContent(d)?` · ${meta.label}`:'');}
const openDayBtn=document.getElementById('journalOpenDayBtn'); if(openDayBtn) openDayBtn.textContent=selectedDate===todayKey()?'Ouvrir aujourd’hui':'Consulter cette journée';
const editDayBtn=document.getElementById('journalEditDayBtn'); if(editDayBtn){editDayBtn.hidden=selectedDate===todayKey();editDayBtn.textContent='Modifier cette journée';}
const basicsBack=document.getElementById('dayBasicsBackBtn'); if(basicsBack){const past=selectedDate!==todayKey();basicsBack.setAttribute('aria-label',past?'Retour au Journal':'Retour à l’accueil');basicsBack.title=past?'Retour au Journal':'Retour à l’accueil';}
const basicsContinue=document.getElementById('dayBasicsContinueBtn'); if(basicsContinue) basicsContinue.textContent=selectedDate===todayKey()?'Continuer ma journée':'Voir ce que mon cœur porte';
const detailsContinue=document.getElementById('dayToMuhasabahBtn'); if(detailsContinue) detailsContinue.textContent=selectedDate===todayKey()?'Continuer vers ma muhâsabah':'Voir la muhâsabah';
const journalNext=document.getElementById('journalNextDay'); if(journalNext){const atToday=selectedDate>=todayKey();journalNext.disabled=atToday;journalNext.setAttribute('aria-disabled',String(atToday));}
const journalToday=document.getElementById('journalSelectedTodayBtn'); if(journalToday){const atToday=selectedDate===todayKey();journalToday.disabled=atToday;journalToday.setAttribute('aria-disabled',String(atToday));journalToday.textContent=atToday?'Aujourd’hui':'Revenir à aujourd’hui';}
const muhasabahDate=document.getElementById('muhasabahDate'); if(muhasabahDate) muhasabahDate.textContent=frDate(date,true);
renderEveningSummary();
document.querySelectorAll('[data-field]').forEach(el=>{ el.value=d[el.dataset.field]||''; });
document.querySelectorAll('[data-prayer]').forEach(el=>{ el.value=(d.prayers&&d.prayers[el.dataset.prayer])||'Non renseignée'; setPrayerVisual(el); });
document.querySelectorAll('.mood').forEach(b=>{const selected=b.dataset.mood===d.mood;b.classList.toggle('sel',selected);b.setAttribute('aria-pressed',String(selected));});
document.querySelectorAll('.word-chips .chip').forEach(b=>b.classList.toggle('active',b.dataset.word===d.dayWord));
renderSummary();
updatePrayerVisibility();
renderHomeDaily();
applyJournalViewMode();
}
function selectDate(k, openScreen){
selectedDate=k; journalEditMode=(k===todayKey()); calendarCursor=dateFromKey(k); renderSelectedDay(); renderCalendar(); if(openScreen) go(openScreen);
}
function setJournalEditMode(enabled){ journalEditMode=selectedDate===todayKey()||Boolean(enabled); renderSelectedDay(); }
function applyJournalViewMode(){
const past=selectedDate!==todayKey(), readOnly=past&&!journalEditMode;
document.querySelectorAll('[data-field]').forEach(el=>{el.readOnly=readOnly;el.setAttribute('aria-readonly',String(readOnly));});
document.querySelectorAll('[data-prayer]').forEach(el=>{el.disabled=readOnly;});
document.querySelectorAll('.mood,.word-chips .chip').forEach(el=>{el.disabled=readOnly;});
const finish=document.getElementById('finishDayBtn'); if(finish) finish.disabled=readOnly;
document.querySelectorAll('[data-journal-mode-notice]').forEach(el=>{el.hidden=!past;el.innerHTML=readOnly?'Mode consultation · <button type="button" data-enable-journal-edit>Modifier cette journée</button>':'Mode modification · <button type="button" data-disable-journal-edit>Revenir à la consultation</button>';});
document.querySelectorAll('[data-enable-journal-edit]').forEach(b=>b.onclick=()=>setJournalEditMode(true));
document.querySelectorAll('[data-disable-journal-edit]').forEach(b=>b.onclick=()=>setJournalEditMode(false));
}
function shiftSelectedDay(delta){
const d=dateFromKey(selectedDate); d.setDate(d.getDate()+delta); const target=keyFromDate(d);
if(target>todayKey()){toast('Les journées futures ne sont pas ouvertes dans le journal');return;}
selectDate(target);
}
function selectToday(openScreen){ selectDate(todayKey(),openScreen); }
function renderCalendar(){
const y=calendarCursor.getFullYear(), m=calendarCursor.getMonth();
document.getElementById('calendarMonth').textContent=new Intl.DateTimeFormat('fr-FR',{month:'long',year:'numeric'}).format(new Date(y,m,1)).replace(/^./,c=>c.toUpperCase());
const grid=document.getElementById('calendarGrid'); grid.innerHTML='';
['L','M','M','J','V','S','D'].forEach(x=>{const e=document.createElement('div');e.className='dow';e.textContent=x;grid.appendChild(e)});
let start=(new Date(y,m,1).getDay()+6)%7;
for(let i=0;i<start;i++){const e=document.createElement('div');e.className='day empty';grid.appendChild(e)}
const count=new Date(y,m+1,0).getDate();
for(let n=1;n<=count;n++){
const date=new Date(y,m,n,12), k=keyFromDate(date), b=document.createElement('button');
b.className='day'; b.textContent=n; b.type='button';
const future=k>todayKey();
if(hasContent(state.days[k])){ b.classList.add('has'); b.classList.add(state.days[k]?.finishedAt?'closed':'started'); }
if(k===selectedDate) b.classList.add('sel');
if(k===todayKey()) b.classList.add('today');
const dayMeta=journalDayMeta(state.days[k]||{}); b.setAttribute('aria-label',frDate(date,true)+(hasContent(state.days[k])?` — ${dayMeta.label.toLowerCase()}`:''));
if(future){b.disabled=true;b.classList.add('future');b.setAttribute('aria-disabled','true');}
else b.addEventListener('click',()=>selectDate(k));
grid.appendChild(b);
}
const nextMonth=document.getElementById('nextMonth');
if(nextMonth){const now=new Date(), futureMonth=y>now.getFullYear() || (y===now.getFullYear() && m>=now.getMonth());nextMonth.disabled=futureMonth;nextMonth.setAttribute('aria-disabled',String(futureMonth));nextMonth.title=futureMonth?'Aucun mois futur':'';}
renderSummary();
renderJournalRecent();
}
function truncate(t,n=40){t=String(t||'').trim();return t.length>n?t.slice(0,n-1)+'…':t}
function journalDayMeta(d={}){
const closed=Boolean(d.finishedAt);
const prayerCount=Object.values(d.prayers||{}).filter(v=>v&&v!=='Non renseignée').length;
const reflectionFields=['muhasabahCloser','muhasabahAway','muhasabahLearned','muhasabahGrateful','muhasabahRepair','muhasabahEntrust','eveningDua'];
const reflectionCount=reflectionFields.filter(k=>String(d[k]||'').trim()).length;
return {closed,prayerCount,reflectionCount,label:closed?'Clôturée':'En cours',symbol:closed?'✓':'◐'};
}
function renderJournalReview(d={}){
const root=document.getElementById('journalReview'); if(!root)return;
const meta=journalDayMeta(d), prayerCount=meta.prayerCount;
const quran=Boolean(String(d.quranSurah||'').trim()||String(d.quranFrom||'').trim()||String(d.quranTo||'').trim()||String(d.quranReflection||'').trim());
const dayFields=['dhikr','gratitude','dua','heartNotes','dayWord'], dayCount=dayFields.filter(k=>String(d[k]||'').trim()).length;
const highlights=[];
if((d.intention||'').trim()) highlights.push(`<div><strong>Intention</strong><span>${escapeHtml(truncate(d.intention,90))}</span></div>`);
if((d.gratitude||'').trim()) highlights.push(`<div><strong>Gratitude</strong><span>${escapeHtml(truncate(d.gratitude,90))}</span></div>`);
if((d.dayWord||'').trim()) highlights.push(`<div><strong>Mot du jour</strong><span>${escapeHtml(d.dayWord)}</span></div>`);
root.innerHTML=`<div class="journal-review-top"><span class="journal-day-status ${meta.closed?'closed':'started'}"><b>${meta.symbol}</b>${meta.label}</span>${d.mood?`<span class="journal-review-mood">${escapeHtml(d.mood)}</span>`:''}</div><div class="journal-review-stats"><div><strong>${prayerCount}/5</strong><span>prières</span></div><div><strong>${quran?'✓':'—'}</strong><span>Qur’an</span></div><div><strong>${dayCount}/5</strong><span>repères</span></div><div><strong>${meta.reflectionCount}/7</strong><span>muhâsabah</span></div></div>${highlights.length?`<div class="journal-review-highlights">${highlights.join('')}</div>`:'<p class="subtle journal-review-empty">Aucun repère textuel à mettre en avant pour cette journée.</p>'}`;
}
function renderSummary(){
const d=state.days[selectedDate]||{}, date=dateFromKey(selectedDate);
document.getElementById('summaryDate').textContent=frDate(date,true);
renderJournalReview(d);
const prayerCount=Object.values(d.prayers||{}).filter(v=>v&&v!=='Non renseignée').length;
const bits=[]; if((d.intention||'').trim()) bits.push('1 intention'); if(prayerCount) bits.push(`${prayerCount} prière${prayerCount>1?'s':''}`); if((d.dua||'').trim()) bits.push('1 du‘â');
document.getElementById('summaryDay').textContent=bits.length?bits.join(' · '):'Aucune entrée';
document.getElementById('summaryHeart').textContent=truncate(d.heartNotes)|| (d.mood?`Humeur : ${d.mood}`:'Aucune note');
const q=[d.quranSurah, d.quranFrom&&d.quranTo?`${d.quranFrom}–${d.quranTo}`:d.quranFrom||d.quranTo].filter(Boolean).join(' ');
document.getElementById('summaryQuran').textContent=q||'Non renseignée';
document.getElementById('summaryGratitude').textContent=truncate(d.gratitude)||'Non renseignée';
const reflectionFields=['muhasabahCloser','muhasabahAway','muhasabahLearned','muhasabahGrateful','muhasabahRepair','muhasabahEntrust','eveningDua'];
const reflectionCount=reflectionFields.filter(k=>(d[k]||'').trim()).length;
const summaryMuhasabah=document.getElementById('summaryMuhasabah'); if(summaryMuhasabah) summaryMuhasabah.textContent=reflectionCount?`${reflectionCount}/7 éléments renseignés`:'Non renseignée';
}
function renderEveningSummary(){
const root=document.getElementById('dayCloseSummary'), status=document.getElementById('dayCloseStatus'), btn=document.getElementById('finishDayBtn'); if(!root)return;
const d=dayData(), prayers=Object.values(d.prayers||{}).filter(v=>v&&v!=='Non renseignée').length;
const quran=Boolean(String(d.quranSurah||'').trim()||String(d.quranFrom||'').trim()||String(d.quranTo||'').trim()||String(d.quranReflection||'').trim());
const dayFields=['dhikr','gratitude','dua','heartNotes','dayWord'], dayCount=dayFields.filter(k=>String(d[k]||'').trim()).length;
const reflectionFields=['muhasabahCloser','muhasabahAway','muhasabahLearned','muhasabahGrateful','muhasabahRepair','muhasabahEntrust','eveningDua'], reflectionCount=reflectionFields.filter(k=>String(d[k]||'').trim()).length;
root.innerHTML=`<div><strong>${prayers}/5</strong><span>prières</span></div><div><strong>${quran?'✓':'—'}</strong><span>Qur’an</span></div><div><strong>${dayCount}/5</strong><span>repères</span></div><div><strong>${reflectionCount}/7</strong><span>muhâsabah</span></div>`;
if(status) status.textContent=d.finishedAt?'Cette journée a déjà été clôturée. Tu peux encore modifier son contenu.':'La clôture enregistre un repère local ; tes notes restent modifiables ensuite.';
if(btn) btn.textContent=d.finishedAt?'Mettre à jour et retourner au Journal':'Terminer ma journée';
}
function renderJournalRecent(){
const root=document.getElementById('journalRecent'); if(!root)return;
const entries=Object.entries(state.days).filter(([,d])=>hasContent(d)).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,5);
root.innerHTML=entries.map(([k,d])=>{const bits=[];if(d.mood)bits.push(d.mood);if((d.intention||'').trim())bits.push(truncate(d.intention,34));const meta=journalDayMeta(d);return `<button class="journal-recent-row" type="button" data-journal-date="${k}"><span><strong>${frDate(dateFromKey(k),false)}</strong><small>${escapeHtml(bits.join(' · ')||'Entrée enregistrée')}</small></span><span class="journal-day-status ${meta.closed?'closed':'started'}"><b>${meta.symbol}</b>${meta.label}</span></button>`}).join('')||'<div class="empty-state">Tes dernières journées apparaîtront ici.</div>';
}
function journalSearchText(k,d={}){
return [k,frDate(dateFromKey(k),true),d.mood,d.intention,d.dhikr,d.gratitude,d.dua,d.heartNotes,d.dayWord,d.quranSurah,d.quranReflection,d.muhasabahCloser,d.muhasabahAway,d.muhasabahLearned,d.muhasabahGrateful,d.muhasabahRepair,d.muhasabahEntrust,d.eveningDua].filter(Boolean).join(' ').toLocaleLowerCase('fr-FR');
}
function openRecentHistory(){
const entries=Object.entries(state.days).filter(([,d])=>hasContent(d)).sort((a,b)=>b[0].localeCompare(a[0]));
const rowHtml=([k,d])=>{const bits=[];if(d.mood)bits.push(d.mood);if((d.intention||'').trim())bits.push(truncate(d.intention,42));const meta=journalDayMeta(d);return `<button class="journal-recent-row" type="button" data-history-date="${k}"><span><strong>${frDate(dateFromKey(k),false)}</strong><small>${escapeHtml(bits.join(' · ')||'Entrée enregistrée')}</small></span><span class="journal-day-status ${meta.closed?'closed':'started'}"><b>${meta.symbol}</b>${meta.label}</span></button>`};
openModal('Historique du Journal',`<p class="subtle">Recherche dans les journées enregistrées sur cet appareil. Le statut reste descriptif et tes notes restent modifiables.</p><div class="journal-history-tools"><label for="journalHistorySearch">Rechercher</label><input id="journalHistorySearch" type="search" placeholder="Date, intention, gratitude, note…" autocomplete="off"><div class="journal-history-filters" role="group" aria-label="Filtrer les journées"><button type="button" class="active" data-history-filter="all">Toutes</button><button type="button" data-history-filter="closed">Clôturées</button><button type="button" data-history-filter="started">En cours</button></div><small id="journalHistoryCount" class="subtle"></small></div><div id="recentHistoryModal"></div>`);
const root=document.getElementById('recentHistoryModal'), search=document.getElementById('journalHistorySearch'), count=document.getElementById('journalHistoryCount'); let filter='all';
const render=()=>{const q=(search?.value||'').trim().toLocaleLowerCase('fr-FR');const visible=entries.filter(([k,d])=>{const closed=Boolean(d.finishedAt);if(filter==='closed'&&!closed)return false;if(filter==='started'&&closed)return false;return !q||journalSearchText(k,d).includes(q)});root.innerHTML=visible.map(rowHtml).join('')||'<div class="empty-state"><strong>Aucune journée trouvée.</strong><br><span>Essaie un autre mot ou enlève un filtre.</span></div>';if(count)count.textContent=`${visible.length} journée${visible.length>1?'s':''} affichée${visible.length>1?'s':''}`;};
search?.addEventListener('input',render);
document.querySelector('.journal-history-filters')?.addEventListener('click',e=>{const b=e.target.closest('[data-history-filter]');if(!b)return;filter=b.dataset.historyFilter;document.querySelectorAll('[data-history-filter]').forEach(x=>x.classList.toggle('active',x===b));render()});
root?.addEventListener('click',e=>{const b=e.target.closest('[data-history-date]');if(!b)return;closeModal();selectDate(b.dataset.historyDate,5)});
render();
}
function saveField(el){ const d=dayData(); d[el.dataset.field]=el.value; saveState(); renderCalendar(); renderJournalRecent(); renderEveningSummary(); if(['dhikr','gratitude','dua','heartNotes'].includes(el.dataset.field)) renderDaySectionProgress(); }
function renderDaySectionProgress(){const d=dayData(),el=document.getElementById('daySectionProgress');if(!el)return;const fields=['dhikr','gratitude','dua','heartNotes','dayWord'];const filled=fields.filter(k=>String(d[k]||'').trim()).length;el.textContent=`${filled}/5 repères renseignés${selectedDate===todayKey()?' aujourd’hui':''}`;}
document.querySelectorAll('[data-field]').forEach(el=>el.addEventListener('input',()=>saveField(el)));
document.querySelectorAll('[data-prayer]').forEach(el=>el.addEventListener('change',()=>{dayData().prayers[el.dataset.prayer]=el.value;setPrayerVisual(el);saveState();renderCalendar()}));
document.querySelectorAll('.mood').forEach(b=>b.addEventListener('click',()=>{dayData().mood=b.dataset.mood;saveState();renderSelectedDay();renderCalendar()}));
document.querySelectorAll('.word-chips .chip').forEach(b=>b.addEventListener('click',()=>{dayData().dayWord=b.dataset.word;saveState();renderSelectedDay();renderCalendar();renderDaySectionProgress()}));
document.querySelectorAll('.summary-item[data-open-screen]').forEach(x=>x.addEventListener('click',()=>go(Number(x.dataset.openScreen))));
document.getElementById('dayBasicsBackBtn')?.addEventListener('click',()=>go(selectedDate===todayKey()?1:5));
document.getElementById('dayBasicsContinueBtn')?.addEventListener('click',()=>go(3));
document.getElementById('journalRecent')?.addEventListener('click',e=>{const b=e.target.closest('[data-journal-date]');if(b)selectDate(b.dataset.journalDate,5)});
document.getElementById('homeHistoryBtn')?.addEventListener('click',openRecentHistory);
document.getElementById('journalHistoryBtn')?.addEventListener('click',openRecentHistory);
document.getElementById('homeMuhasabahBtn')?.addEventListener('click',()=>{selectedDate=todayKey();calendarCursor=dateFromKey(selectedDate);renderSelectedDay();renderCalendar();go(4)});
document.getElementById('muhasabahBackBtn')?.addEventListener('click',()=>go(3));
document.getElementById('muhasabahJournalBtn')?.addEventListener('click',()=>go(5));
document.getElementById('finishDayBtn')?.addEventListener('click',()=>{const d=dayData();d.finishedAt=d.finishedAt||new Date().toISOString();saveState();renderEveningSummary();renderCalendar();renderSummary();renderHomeDaily();go(5);toast('Journée clôturée et disponible dans le Journal')});
document.getElementById('prevDay').addEventListener('click',()=>shiftSelectedDay(-1));
document.getElementById('nextDay').addEventListener('click',()=>shiftSelectedDay(1));
document.getElementById('journalTodayBtn')?.addEventListener('click',()=>selectToday(2));
document.getElementById('journalPrevDay')?.addEventListener('click',()=>shiftSelectedDay(-1));
document.getElementById('journalNextDay')?.addEventListener('click',()=>shiftSelectedDay(1));
document.getElementById('journalSelectedTodayBtn')?.addEventListener('click',()=>selectToday());
document.getElementById('journalOpenDayBtn')?.addEventListener('click',()=>{journalEditMode=selectedDate===todayKey();renderSelectedDay();go(2)});
document.getElementById('journalEditDayBtn')?.addEventListener('click',()=>{setJournalEditMode(true);go(2)});
document.getElementById('dayDetailsJournalBtn')?.addEventListener('click',()=>go(5));
document.getElementById('dayDetailsTodayBtn')?.addEventListener('click',()=>selectToday(3));
document.getElementById('dayBackToBasicsBtn')?.addEventListener('click',()=>go(2));
document.getElementById('dayToMuhasabahBtn')?.addEventListener('click',()=>go(4));
document.getElementById('prevMonth').addEventListener('click',()=>{calendarCursor=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()-1,1,12);renderCalendar()});
document.getElementById('nextMonth').addEventListener('click',()=>{calendarCursor=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()+1,1,12);renderCalendar()});
const legacyIntent=safeStorageGet(LEGACY_INTENTION_KEY);
if(legacyIntent && !state.days[todayKey()]?.intention){ dayData(todayKey()).intention=legacyIntent; safeStorageRemove(LEGACY_INTENTION_KEY); saveState(); }
const DAILY_QUOTES = [
{ref:'94:5',surah:'Ach-Charh',ar:'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',fr:'À côté de la difficulté est, certes, une facilité !',url:'https://quran.com/fr/ach-charh/5'},
{ref:'94:6',surah:'Ach-Charh',ar:'إِنَّ مَعَ الْعُسْرِ يُسْرًا',fr:'À côté de la difficulté est, certes, une facilité !',url:'https://quran.com/fr/ach-charh/6'},
{ref:'13:28',surah:'Ar-Raʿd',ar:'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',fr:'N’est-ce point par l’évocation d’Allah que se tranquillisent les cœurs ?',url:'https://quran.com/fr/le-tonnerre/28'},
{ref:'39:53',surah:'Az-Zumar',ar:'لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',fr:'Ne désespérez pas de la miséricorde d’Allah.',url:'https://quran.com/fr/les-groupes/53',excerpt:true},
{ref:'2:286',surah:'Al-Baqarah',ar:'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',fr:'Allah n’impose à aucune âme une charge supérieure à sa capacité.',url:'https://quran.com/fr/la-vache/286',excerpt:true},
{ref:'2:186',surah:'Al-Baqarah',ar:'فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',fr:'Je suis tout proche : Je réponds à l’appel de celui qui M’invoque quand il M’invoque.',url:'https://quran.com/fr/la-vache/186',excerpt:true},
{ref:'2:152',surah:'Al-Baqarah',ar:'فَاذْكُرُونِي أَذْكُرْكُمْ',fr:'Souvenez-vous de Moi donc, Je Me souviendrai de vous.',url:'https://quran.com/fr/la-vache/152',excerpt:true},
{ref:'3:159',surah:'Âl ʿImrân',ar:'فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ',fr:'Puis, une fois que tu t’es décidé, confie-toi donc à Allah.',url:'https://quran.com/fr/la-famille-de-imran/159',excerpt:true},
{ref:'3:173',surah:'Âl ʿImrân',ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',fr:'Allah nous suffit ; et Il est notre meilleur garant !',url:'https://quran.com/fr/la-famille-de-imran/173',excerpt:true},
{ref:'29:69',surah:'Al-ʿAnkabût',ar:'وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا',fr:'Et quant à ceux qui luttent pour Notre cause, Nous les guiderons certes sur Nos sentiers.',url:'https://quran.com/fr/laragnee/69',excerpt:true},
{ref:'40:60',surah:'Ghâfir',ar:'ادْعُونِي أَسْتَجِبْ لَكُمْ',fr:'Appelez-Moi, Je vous répondrai.',url:'https://quran.com/fr/le-pardonneur/60',excerpt:true},
{ref:'57:4',surah:'Al-Hadîd',ar:'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ',fr:'Et Il est avec vous où que vous soyez.',url:'https://quran.com/fr/le-fer/4',excerpt:true},
{ref:'65:3',surah:'At-Talâq',ar:'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',fr:'Et quiconque place sa confiance en Allah, Il lui suffit.',url:'https://quran.com/fr/le-divorce/3',excerpt:true},
{ref:'93:3',surah:'Ad-Duhâ',ar:'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ',fr:'Ton Seigneur ne t’a ni abandonné, ni détesté.',url:'https://quran.com/fr/le-jour-montant/3'},
{ref:'93:5',surah:'Ad-Duhâ',ar:'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',fr:'Ton Seigneur t’accordera certes Ses faveurs, et alors tu seras satisfait.',url:'https://quran.com/fr/le-jour-montant/5'},
{ref:'12:87',surah:'Yûsuf',ar:'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ',fr:'Et ne désespérez pas de la miséricorde d’Allah.',url:'https://quran.com/fr/joseph/87',excerpt:true},
{ref:'16:128',surah:'An-Nahl',ar:'إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوا وَّالَّذِينَ هُم مُّحْسِنُونَ',fr:'Certes, Allah est avec ceux qui L’ont craint avec piété et ceux qui sont bienfaisants.',url:'https://quran.com/fr/les-abeilles/128'},
{ref:'8:46',surah:'Al-Anfâl',ar:'وَاصْبِرُوا إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',fr:'Et soyez endurants, car Allah est avec les endurants.',url:'https://quran.com/fr/le-butin/46',excerpt:true},
{ref:'20:46',surah:'Tâ-Hâ',ar:'لَا تَخَافَا إِنَّنِي مَعَكُمَا أَسْمَعُ وَأَرَىٰ',fr:'Ne craignez rien. Je suis avec vous : J’entends et Je vois.',url:'https://quran.com/fr/ta-ha/46'},
{ref:'20:114',surah:'Tâ-Hâ',ar:'وَقُل رَّبِّ زِدْنِي عِلْمًا',fr:'Et dis : « Ô mon Seigneur, accrois mes connaissances ! »',url:'https://quran.com/fr/ta-ha/114',excerpt:true},
{ref:'33:3',surah:'Al-Ahzâb',ar:'وَتَوَكَّلْ عَلَى اللَّهِ وَكَفَىٰ بِاللَّهِ وَكِيلًا',fr:'Et place ta confiance en Allah. Allah te suffit comme protecteur.',url:'https://quran.com/fr/les-coalises/3'},
{ref:'39:36',surah:'Az-Zumar',ar:'أَلَيْسَ اللَّهُ بِكَافٍ عَبْدَهُ',fr:'Allah ne suffit-Il pas à Son serviteur ?',url:'https://quran.com/fr/les-groupes/36',excerpt:true},
{ref:'9:51',surah:'At-Tawbah',ar:'قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا',fr:'Dis : « Rien ne nous atteindra, en dehors de ce qu’Allah a prescrit pour nous. »',url:'https://quran.com/fr/le-repentir/51',excerpt:true},
{ref:'14:7',surah:'Ibrâhîm',ar:'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',fr:'Si vous êtes reconnaissants, très certainement J’augmenterai Mes bienfaits pour vous.',url:'https://quran.com/fr/abraham/7',excerpt:true},
{ref:'7:56',surah:'Al-Aʿrâf',ar:'إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ',fr:'La miséricorde d’Allah est proche des bienfaisants.',url:'https://quran.com/fr/al-araf/56',excerpt:true},
{ref:'18:10',surah:'Al-Kahf',ar:'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',fr:'Ô notre Seigneur, donne-nous de Ta part une miséricorde ; et assure-nous la droiture dans tout ce qui nous concerne.',url:'https://quran.com/fr/la-caverne/10',excerpt:true},
{ref:'25:74',surah:'Al-Furqân',ar:'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',fr:'Seigneur, donne-nous, en nos épouses et nos descendants, la joie des yeux.',url:'https://quran.com/fr/le-discernement/74',excerpt:true},
{ref:'28:24',surah:'Al-Qasas',ar:'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',fr:'Seigneur, j’ai grand besoin du bien que Tu feras descendre vers moi.',url:'https://quran.com/fr/le-recit/24',excerpt:true},
{ref:'3:8',surah:'Âl ʿImrân',ar:'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً',fr:'Seigneur ! Ne laisse pas dévier nos cœurs après que Tu nous aies guidés ; et accorde-nous Ta miséricorde.',url:'https://quran.com/fr/la-famille-de-imran/8',excerpt:true},
{ref:'89:27-28',surah:'Al-Fajr',ar:'يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً',fr:'Ô toi, âme apaisée, retourne vers ton Seigneur, satisfaite et agréée.',url:'https://quran.com/fr/laube/27-28',excerpt:true}
];
function dayNumberUTC(k){const d=dateFromKey(k);return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000)}
function dailyQuoteFor(k=todayKey()){return DAILY_QUOTES[((dayNumberUTC(k)%DAILY_QUOTES.length)+DAILY_QUOTES.length)%DAILY_QUOTES.length]}
function dailySceneFor(k=todayKey()){return dateFromKey(k).getDay()}
function renderHomeDaily(){
const q=dailyQuoteFor(todayKey()), scene=dailySceneFor(todayKey());
const landscape=document.getElementById('dailyLandscape'); if(!landscape)return;
landscape.dataset.scene=String(scene);landscape.style.setProperty('--weekday-bg',`url("${DAILY_BACKGROUNDS[scene]}")`);landscape.setAttribute('aria-label',`Paysage du ${DAILY_SCENES[scene].toLowerCase()}`);
document.getElementById('dailyQuoteText').textContent=`« ${q.fr} »`;
document.getElementById('dailyQuoteRef').textContent=`Coran · ${q.surah} ${q.ref}${q.excerpt?' · extrait':''}`;
const d=dayData(todayKey());
const hasStarted=hasStartedDay(d), journey=dailyJourneyStatus(d);
document.getElementById('startDayBtn').textContent=journey.label;
const journeyHint=document.getElementById('homeJourneyHint'); if(journeyHint)journeyHint.textContent=journey.hint;
document.getElementById('homeMuhasabahBtn').classList.toggle('hidden',!hasStarted);
renderHomeTodayDashboard();
}
function renderHomeTodayDashboard(){
const root=document.getElementById('homeTodayItems'), progress=document.getElementById('homeTodayProgress');
if(!root||!progress)return;
const today=todayKey(), habits=state.profile.habits||[], objectives=state.profile.objectives||[];
const activeObjectives=objectives.filter(o=>!o.done), doneHabits=habits.filter(h=>(h.checkins||{})[today]).length;
const d=state.days[today]||{}, journalStarted=hasStartedDay(d), journey=dailyJourneyStatus(d);
const journalComplete=journey.screen===5;
const total=habits.length+activeObjectives.length+1;
const done=doneHabits+(journalComplete?1:0);
const remaining=Math.max(0,total-done), pct=total?Math.round(done/total*100):0;
progress.textContent=remaining===0?'Tout est à jour pour aujourd’hui':`${done}/${total} faits · ${remaining} à poursuivre`;
const bar=document.getElementById('homeTodayProgressBar'); if(bar)bar.style.width=`${pct}%`;
const nextLabel=document.getElementById('homeTodayNextLabel'), nextHint=document.getElementById('homeTodayNextHint');
if(nextLabel)nextLabel.textContent=journey.label;
if(nextHint)nextHint.textContent=journey.hint;
const rows=[];
rows.push(`<button class="today-dashboard-row ${journalComplete?'done':journalStarted?'in-progress':''}" type="button" data-home-action="journal"><span>${journalComplete?'✓':journalStarted?'◐':'○'}</span><span><strong>Journal du jour</strong><small>${journalComplete?'Terminé':journalStarted?'En cours':'À commencer'} · ${escapeHtml(journey.label)}</small></span></button>`);
habits.slice(0,3).forEach((h,i)=>{const checked=Boolean((h.checkins||{})[today]);rows.push(`<label class="today-dashboard-row ${checked?'done':'todo'}"><input type="checkbox" data-home-habit="${i}" ${checked?'checked':''}><span><strong>${escapeHtml(h.text)}</strong><small>${checked?'Fait aujourd’hui':'À faire aujourd’hui'}</small></span></label>`)});
activeObjectives.slice(0,2).forEach(o=>rows.push(`<button class="today-dashboard-row todo" type="button" data-home-action="objectives"><span>○</span><span><strong>${escapeHtml(o.text)}</strong><small>Objectif en cours</small></span></button>`));
root.innerHTML=rows.join('')||'<div class="empty-state">Aucun repère personnel pour le moment. Ajoute une habitude ou un objectif depuis ton espace Moi.</div>';
}
document.getElementById('homeTodayItems').addEventListener('change',e=>{
const input=e.target.closest('[data-home-habit]'); if(!input)return;
const h=(state.profile.habits||[])[Number(input.dataset.homeHabit)]; if(!h)return;
h.checkins=h.checkins||{}; if(input.checked)h.checkins[todayKey()]=true;else delete h.checkins[todayKey()];
saveState();renderHomeTodayDashboard();
});
document.getElementById('homeTodayItems').addEventListener('click',e=>{
const action=e.target.closest('[data-home-action]')?.dataset.homeAction;
if(action==='journal'){startOrContinueDay()}
if(action==='objectives')openProfilePanel('objectives');
});
document.getElementById('homeTodayNextAction')?.addEventListener('click',startOrContinueDay);
document.getElementById('homeTodayManageBtn').addEventListener('click',()=>go(10));
function openDailyQuote(){
const q=dailyQuoteFor(todayKey());
openModal(`Coran · ${q.surah} ${q.ref}`,`<div class="quote-arabic">${q.ar}</div><div class="quote-fr">« ${escapeHtml(q.fr)} »</div><div class="quote-source">Traduction française : Muhammad Hamidullah (référence affichée via Quran.com).${q.excerpt?' L’accueil affiche un extrait clairement signalé.':''}</div><a class="primary quote-context-link" href="${q.url}" target="_blank" rel="noopener noreferrer">Lire dans son contexte</a>`);
}
document.getElementById('dailyQuoteCard').addEventListener('click',openDailyQuote);
document.getElementById('intentionHelpBtn').addEventListener('click',()=>openModal('Besoin d’inspiration ?',`<p class="subtle" style="font-size:10px;line-height:1.6">Ces pistes sont volontairement neutres : elles ne prescrivent aucune intention religieuse.</p><div class="card" style="margin:8px 0">Quel comportement aimerais-tu particulièrement soigner aujourd’hui ?</div><div class="card" style="margin:8px 0">À quoi aimerais-tu accorder plus d’attention ?</div><div class="card" style="margin:8px 0">Quelle qualité aimerais-tu cultiver aujourd’hui ?</div>`));
let duaCategory='Toutes', duaTab='library', editingDuaId=null;
const DUA_LIBRARY=[
{id:'q17-24',title:'Pour mes parents',category:'Parents',tags:['parents','famille','miséricorde'],arabic:'رَبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِى صَغِيرًا',translit:'Rabbi-rḥamhumā kamā rabbayānī ṣaghīrā.',fr:'Seigneur, fais-leur miséricorde comme ils m’ont élevé lorsque j’étais petit.',source:'Coran 17:24',grade:'📖 Coran'},
{id:'q14-41',title:'Pour mes parents et les croyants',category:'Parents',tags:['parents','pardon','au-delà'],arabic:'رَبَّنَا ٱغْفِرْ لِى وَلِوَٰلِدَىَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ ٱلْحِسَابُ',translit:'Rabbanā-ghfir lī wa li-wālidayya wa lil-mu’minīna yawma yaqūmu-l-ḥisāb.',fr:'Notre Seigneur, pardonne-moi, ainsi qu’à mes parents et aux croyants, le Jour où aura lieu le Jugement.',source:'Coran 14:41',grade:'📖 Coran'},
{id:'q25-74',title:'Pour mon couple et ma famille',category:'Famille',tags:['couple','enfants','famille'],arabic:'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَٰجِنَا وَذُرِّيَّـٰتِنَا قُرَّةَ أَعْيُنٍ وَٱجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',translit:'Rabbanā hab lanā min azwājinā wa dhurriyyātinā qurrata a‘yunin wa-j‘alnā lil-muttaqīna imāmā.',fr:'Notre Seigneur, accorde-nous en nos époux et nos descendants la joie de nos yeux et fais de nous des modèles pour les pieux.',source:'Coran 25:74',grade:'📖 Coran'},
{id:'q23-118',title:'Pardon et miséricorde',category:'Pardon',tags:['pardon','repentir','miséricorde'],arabic:'رَّبِّ ٱغْفِرْ وَٱرْحَمْ وَأَنتَ خَيْرُ ٱلرَّٰحِمِينَ',translit:'Rabbi-ghfir warḥam wa anta khayru-r-rāḥimīn.',fr:'Seigneur, pardonne et fais miséricorde. Tu es le meilleur de ceux qui font miséricorde.',source:'Coran 23:118',grade:'📖 Coran'},
{id:'hisn79',title:'Sayyid al-Istighfār',category:'Matin & soir',tags:['matin','soir','pardon'],arabic:'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',translit:'Allāhumma anta Rabbī lā ilāha illā ant, khalaqtanī wa anā ‘abduk…',fr:'Ô Allah, Tu es mon Seigneur, nul n’est digne d’adoration en dehors de Toi… Je reconnais Tes bienfaits envers moi et je reconnais mes fautes. Pardonne-moi, car nul autre que Toi ne pardonne les péchés.',source:'Hisn al-Muslim 79 · al-Bukhari',grade:'✓ Sahih'},
{id:'hisn81',title:'Reconnaissance du matin et du soir',category:'Matin & soir',tags:['matin','soir','gratitude'],arabic:'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',translit:'Allāhumma mā aṣbaḥa bī min ni‘matin aw bi-aḥadin min khalqik, fa-minka waḥdaka lā sharīka lak, fa-laka-l-ḥamdu wa laka-sh-shukr.',fr:'Ô Allah, tout bienfait reçu ce matin par moi ou par l’une de Tes créatures vient de Toi seul, sans associé. À Toi la louange et la gratitude.',source:'Hisn al-Muslim 81 · Abū Dāwūd',grade:'✓ Hasan',note:'Le soir, remplacer aṣbaḥa par amsā.'},
{id:'hisn82',title:'Pour la santé du corps, de l’ouïe et de la vue',category:'Santé',tags:['santé','matin','soir','protection'],arabic:'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ',translit:'Allāhumma ‘āfinī fī badanī, Allāhumma ‘āfinī fī sam‘ī, Allāhumma ‘āfinī fī baṣarī, lā ilāha illā ant.',fr:'Ô Allah, préserve mon corps, mon ouïe et ma vue. Nul n’est digne d’adoration en dehors de Toi.',source:'Hisn al-Muslim 82 · Abū Dāwūd',grade:'✓ Hasan',note:'À réciter 3 fois, matin et soir.'},
{id:'hisn85',title:'Protection contre le mal de soi et de Shayṭān',category:'Protection',tags:['protection','shaitan','matin','soir'],arabic:'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ',translit:'Allāhumma ‘ālima-l-ghaybi wash-shahādah, fāṭira-s-samāwāti wa-l-arḍ…',fr:'Ô Allah, Connaisseur de l’invisible et du visible, Créateur des cieux et de la terre… je cherche refuge auprès de Toi contre le mal de mon âme et contre le mal de Shayṭān.',source:'Hisn al-Muslim 85 · at-Tirmidhī / Abū Dāwūd',grade:'✓ Sahih'},
{id:'hisn88',title:'Confier toutes mes affaires à Allah',category:'Matin & soir',tags:['matin','soir','difficulté','aide'],arabic:'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',translit:'Yā Ḥayyu yā Qayyūmu bi-raḥmatika astaghīth, aṣliḥ lī sha’nī kullah, wa lā takilnī ilā nafsī ṭarfata ‘ayn.',fr:'Ô Vivant, Ô Subsistant, par Ta miséricorde je demande secours. Améliore pour moi toutes mes affaires et ne me laisse pas livré à moi-même, même le temps d’un clin d’œil.',source:'Hisn al-Muslim 88 · al-Ḥākim',grade:'✓ Sahih'}
];
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),2200)}
let modalReturnFocus=null;
function modalFocusable(){return [...document.querySelectorAll('#modalBackdrop button:not([disabled]),#modalBackdrop [href],#modalBackdrop input:not([disabled]),#modalBackdrop select:not([disabled]),#modalBackdrop textarea:not([disabled]),#modalBackdrop [tabindex]:not([tabindex="-1"])')].filter(el=>el.offsetParent!==null)}
function openModal(title, body){
modalReturnFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;
document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=body;
const backdrop=document.getElementById('modalBackdrop');backdrop.classList.add('show');backdrop.setAttribute('aria-hidden','false');
requestAnimationFrame(()=>{(modalFocusable()[0]||document.getElementById('modalClose')).focus()});
}
function closeModal(){
const backdrop=document.getElementById('modalBackdrop');backdrop.classList.remove('show');backdrop.setAttribute('aria-hidden','true');
if(modalReturnFocus&&document.contains(modalReturnFocus)) modalReturnFocus.focus(); modalReturnFocus=null;
}
document.addEventListener('keydown',e=>{
const backdrop=document.getElementById('modalBackdrop'); if(!backdrop.classList.contains('show'))return;
if(e.key==='Escape'){e.preventDefault();closeModal();return}
if(e.key==='Tab'){const f=modalFocusable();if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
});
document.getElementById('modalClose').addEventListener('click',closeModal);
document.getElementById('modalBackdrop').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});
function openCycleNote(kind){
const d=dayData(todayKey());
if(kind==='sadaqah'){
openModal('Ma sadaqah',`<p class="subtle">Note une action de bien que tu souhaites faire ou que tu as faite aujourd’hui.</p><textarea id="cycleActionNote" style="min-height:120px" placeholder="Mon action aujourd’hui…">${escapeHtml(d.sadaqah||'')}</textarea><div class="modal-actions"><button class="primary" id="saveCycleAction">Enregistrer</button></div>`);
document.getElementById('saveCycleAction').onclick=()=>{d.sadaqah=document.getElementById('cycleActionNote').value;saveState();closeModal();toast('Sadaqah enregistrée')};
return;
}
openModal('Prendre soin de moi',`<p class="subtle">Choisis un petit geste réaliste pour prendre soin de toi aujourd’hui.</p><textarea id="cycleActionNote" style="min-height:120px" placeholder="Ex. me reposer, marcher un peu, boire de l’eau…">${escapeHtml(d.selfCare||'')}</textarea><div class="modal-actions"><button class="primary" id="saveCycleAction">Enregistrer</button></div>`);
document.getElementById('saveCycleAction').onclick=()=>{d.selfCare=document.getElementById('cycleActionNote').value;saveState();closeModal();toast('Geste enregistré')};
}
function listenDailyQuote(){
const q=dailyQuoteFor(todayKey());
if(!('speechSynthesis' in window)){toast('Lecture audio non disponible sur cet appareil');return;}
window.speechSynthesis.cancel();
const u=new SpeechSynthesisUtterance(q.fr);u.lang='fr-FR';u.rate=.9;
window.speechSynthesis.speak(u);
openModal('Écouter la parole du jour',`<p class="quote-fr">« ${escapeHtml(q.fr)} »</p><p class="subtle">Lecture vocale de la traduction française par ton appareil.</p><div class="modal-actions"><button class="secondary" id="stopDailySpeech">Arrêter</button><button class="primary" id="replayDailySpeech">Réécouter</button></div>`);
document.getElementById('stopDailySpeech').onclick=()=>window.speechSynthesis.cancel();
document.getElementById('replayDailySpeech').onclick=()=>{window.speechSynthesis.cancel();const x=new SpeechSynthesisUtterance(q.fr);x.lang='fr-FR';x.rate=.9;window.speechSynthesis.speak(x)};
}
document.querySelector('.screen[data-screen="7"] .action-grid').addEventListener('click',e=>{
const b=e.target.closest('[data-cycle-action]');if(!b)return;
const action=b.dataset.cycleAction;
if(action==='dua'){go(6);return;}
if(action==='dhikr'){go(3);setTimeout(()=>document.querySelector('[data-field="dhikr"]')?.focus(),250);return;}
if(action==='listen'){listenDailyQuote();return;}
if(action==='study'){go(8);return;}
if(action==='sadaqah'){openCycleNote('sadaqah');return;}
if(action==='journal'){go(5);return;}
if(action==='care'){openCycleNote('care');return;}
});
function duaLibraryFavorites(){if(!Array.isArray(state.profile.duaLibraryFavorites))state.profile.duaLibraryFavorites=[];return state.profile.duaLibraryFavorites}
function isLibraryFav(id){return duaLibraryFavorites().includes(id)}
function toggleLibraryFav(id){const a=duaLibraryFavorites(),i=a.indexOf(id);if(i>=0)a.splice(i,1);else a.push(id);saveState();renderDuas()}
function renderDuas(){
const q=(document.getElementById('duaSearch').value||'').toLowerCase().trim();
const root=document.getElementById('duaList'),count=document.getElementById('duaResultsCount'),title=document.getElementById('duaResultsTitle'),hint=document.getElementById('duaViewHint');
document.querySelectorAll('#duaTabs [data-dua-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.duaTab===duaTab)));
document.querySelectorAll('#duaCategories [data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===duaCategory)));
if(duaTab==='mine'){
if(title)title.textContent='Mes du‘â';if(hint)hint.textContent='Tes invocations personnelles';
const list=state.duas.filter(d=>{const hay=(d.title+' '+d.text+' '+d.category).toLowerCase();return (!q||hay.includes(q))&&(duaCategory==='Toutes'||d.category===duaCategory)});
if(count)count.textContent=`${list.length} ${list.length>1?'du‘â':'du‘â'}`;
if(!list.length){root.innerHTML='<div class="empty-state dua-empty-state"><strong>Rien à afficher ici</strong><span>Écris une nouvelle du‘â avec le bouton +, ou change de filtre.</span></div>';return}
root.innerHTML=list.sort((a,b)=>(b.updatedAt||b.createdAt||'').localeCompare(a.updatedAt||a.createdAt||'')).map(d=>`<div class="dua-item" data-dua-id="${d.id}" tabindex="0"><div class="dua-ico"><span class="svg-icon" data-icon="dua"></span></div><div class="dua-item-copy"><strong>${escapeHtml(d.title||'Sans titre')}</strong><p><span class="dua-category-label">${escapeHtml(d.category||'Autre')}</span>${escapeHtml(truncate(d.text,62))}</p></div><div class="dua-actions"><button class="heart" data-fav="${d.id}" aria-label="${d.favorite?'Retirer des favoris':'Ajouter aux favoris'}">${d.favorite?'♥':'♡'}</button><button class="edit-small" data-edit="${d.id}" aria-label="Modifier ${escapeHtml(d.title||'cette du‘â')}">✎</button></div></div>`).join('');renderIcons();return;
}
if(title)title.textContent=duaTab==='favorites'?'Favoris':'Bibliothèque';if(hint)hint.textContent=duaTab==='favorites'?'Les invocations que tu as gardées':'Invocations de la bibliothèque';
const list=DUA_LIBRARY.filter(d=>{const hay=(d.title+' '+d.category+' '+d.tags.join(' ')+' '+d.fr+' '+d.translit).toLowerCase();const cat=duaCategory==='Toutes'||d.category===duaCategory||d.tags.some(t=>t.toLowerCase()===duaCategory.toLowerCase());const fav=duaTab!=='favorites'||isLibraryFav(d.id);return cat&&fav&&(!q||hay.includes(q))});
if(count)count.textContent=`${list.length} ${list.length>1?'résultats':'résultat'}`;
if(!list.length){root.innerHTML='<div class="empty-state dua-empty-state"><strong>Aucune du‘â trouvée</strong><span>Essaie un autre mot ou un autre thème.</span></div>';return}
root.innerHTML=list.map(d=>`<div class="dua-item" data-library-dua="${d.id}" tabindex="0"><div class="dua-ico"><span class="svg-icon" data-icon="dua"></span></div><div class="dua-item-copy"><strong>${escapeHtml(d.title)}</strong><p><span class="dua-category-label">${escapeHtml(d.category)}</span>${escapeHtml(d.grade)}<br>${escapeHtml(d.source)}</p></div><div class="dua-actions"><button class="heart" data-library-fav="${d.id}" aria-label="${isLibraryFav(d.id)?'Retirer des favoris':'Ajouter aux favoris'}">${isLibraryFav(d.id)?'♥':'♡'}</button></div></div>`).join('');renderIcons();
}
function openLibraryDua(id){const d=DUA_LIBRARY.find(x=>x.id===id);if(!d)return;openModal(d.title,`<div dir="rtl" style="font-size:23px;line-height:1.9;text-align:right;margin:8px 0 14px">${escapeHtml(d.arabic)}</div><p style="font-size:11px;line-height:1.65"><em>${escapeHtml(d.translit)}</em></p><p style="font-size:11px;line-height:1.65">${escapeHtml(d.fr)}</p>${d.note?`<p class="subtle"><strong>Quand / répétition :</strong> ${escapeHtml(d.note)}</p>`:''}<p class="subtle"><strong>${escapeHtml(d.grade)}</strong><br>${escapeHtml(d.source)}</p><div class="toolbar-row"><button class="mini-btn primary-mini" id="listenLibraryDua">🔊 Écouter</button><button class="mini-btn" id="copyLibraryDua">Copier</button><button class="mini-btn" id="favLibraryDua">${isLibraryFav(d.id)?'♥ Favori':'♡ Favori'}</button></div>`);document.getElementById('listenLibraryDua').onclick=()=>{if(!('speechSynthesis'in window))return toast('Lecture vocale indisponible');speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(d.arabic);u.lang='ar';speechSynthesis.speak(u)};document.getElementById('copyLibraryDua').onclick=async()=>{try{await navigator.clipboard.writeText(`${d.arabic}\n${d.translit}\n${d.fr}\n${d.source}`);toast('Du‘â copiée')}catch(e){toast('Copie indisponible')}};document.getElementById('favLibraryDua').onclick=()=>{toggleLibraryFav(d.id);closeModal()}}
function openDuaEditor(id=null){editingDuaId=id;const d=id?state.duas.find(x=>x.id===id):{title:'',text:'',category:'Moi',favorite:false};openModal(id?'Modifier ma du‘â':'Nouvelle du‘â',`<label>Titre</label><input id="duaTitleInput" value="${escapeHtml(d?.title||'')}" placeholder="Ex : Pour ma famille"><label>Catégorie</label><select id="duaCategoryInput">${['Moi','Famille','Santé','Études','Travail','Mariage','Autre'].map(c=>`<option ${d?.category===c?'selected':''}>${c}</option>`).join('')}</select><label>Ma du‘â</label><textarea id="duaTextInput" style="min-height:130px" placeholder="Écris ici…">${escapeHtml(d?.text||'')}</textarea><label style="display:flex;gap:8px;align-items:center"><input id="duaFavInput" type="checkbox" style="width:auto" ${d?.favorite?'checked':''}> Ajouter aux favoris</label><div class="modal-actions">${id?'<button class="mini-btn danger-btn" id="deleteDuaBtn">Supprimer</button>':''}<button class="primary" id="saveDuaBtn">Enregistrer</button></div>`);document.getElementById('saveDuaBtn').onclick=()=>{const title=document.getElementById('duaTitleInput').value.trim(),text=document.getElementById('duaTextInput').value.trim();if(!title&&!text){toast('Écris au moins un titre ou une du‘â');return}if(id)Object.assign(d,{title:title||'Sans titre',text,category:document.getElementById('duaCategoryInput').value,favorite:document.getElementById('duaFavInput').checked,updatedAt:new Date().toISOString()});else state.duas.push({id:uid(),title:title||'Sans titre',text,category:document.getElementById('duaCategoryInput').value,favorite:document.getElementById('duaFavInput').checked,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});saveState();renderDuas();closeModal();toast('Du‘â enregistrée')};if(id)document.getElementById('deleteDuaBtn').onclick=()=>{if(confirm('Supprimer cette du‘â ?')){state.duas=state.duas.filter(x=>x.id!==id);saveState();renderDuas();closeModal();toast('Du‘â supprimée')}}}
document.getElementById('addDuaBtn').addEventListener('click',()=>openDuaEditor());
document.getElementById('duaSearch').addEventListener('input',renderDuas);
document.getElementById('duaCategories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;duaCategory=b.dataset.category;document.querySelectorAll('#duaCategories .chip').forEach(x=>x.classList.toggle('active',x===b));renderDuas()});
document.getElementById('duaTabs').addEventListener('click',e=>{const b=e.target.closest('[data-dua-tab]');if(!b)return;duaTab=b.dataset.duaTab;document.querySelectorAll('#duaTabs button').forEach(x=>x.classList.toggle('active',x===b));renderDuas()});
document.getElementById('duaList').addEventListener('click',e=>{const lf=e.target.closest('[data-library-fav]'),li=e.target.closest('[data-library-dua]'),fav=e.target.closest('[data-fav]'),edit=e.target.closest('[data-edit]'),item=e.target.closest('[data-dua-id]');if(lf){e.stopPropagation();toggleLibraryFav(lf.dataset.libraryFav);return}if(li){openLibraryDua(li.dataset.libraryDua);return}if(fav){e.stopPropagation();const d=state.duas.find(x=>x.id===fav.dataset.fav);d.favorite=!d.favorite;saveState();renderDuas();return}if(edit){e.stopPropagation();openDuaEditor(edit.dataset.edit);return}if(item)openDuaEditor(item.dataset.duaId)});
let cycleCursor=new Date(new Date().getFullYear(),new Date().getMonth(),1,12);
function activeCycleOn(k){
const t=dateFromKey(k).getTime();
return state.cycles.find(c=>{const s=dateFromKey(c.start).getTime(),e=c.end?dateFromKey(c.end).getTime():Infinity;return Number.isFinite(s)&&Number.isFinite(e)&&t>=s&&t<=e});
}
function currentOpenCycle(){return state.cycles.find(c=>!c.end)}
function cycleDays(c){if(!c?.start||!c?.end)return null;return Math.floor((dateFromKey(c.end)-dateFromKey(c.start))/86400000)+1}
function sortedCompletedCycles(){return state.cycles.filter(c=>c.start&&c.end).slice().sort((a,b)=>a.start.localeCompare(b.start))}
function cycleEstimate(){
const list=sortedCompletedCycles(); if(list.length<3)return null;
const recent=list.slice(-7), gaps=[];
for(let i=1;i<recent.length;i++){const n=Math.round((dateFromKey(recent[i].start)-dateFromKey(recent[i-1].start))/86400000);if(n>=15&&n<=60)gaps.push(n)}
if(gaps.length<2)return null;
const avg=Math.round(gaps.reduce((a,b)=>a+b,0)/gaps.length), spread=Math.max(2,Math.ceil((Math.max(...gaps)-Math.min(...gaps))/2));
const last=dateFromKey(recent[recent.length-1].start), center=new Date(last);center.setDate(center.getDate()+avg);
const from=new Date(center),to=new Date(center);from.setDate(from.getDate()-spread);to.setDate(to.getDate()+spread);
return {avg,from:keyFromDate(from),to:keyFromDate(to),center:keyFromDate(center),count:gaps.length+1};
}
function validateCycleRange(start,end,ignoreId=null){
if(!start)return 'Choisis une date de début.';
const sd=dateFromKey(start);if(!Number.isFinite(sd.getTime()))return 'Date de début invalide.';
if(end){const ed=dateFromKey(end);if(!Number.isFinite(ed.getTime()))return 'Date de fin invalide.';if(ed<sd)return 'La date de fin doit être après la date de début.'}
const a=sd.getTime(),b=end?dateFromKey(end).getTime():Infinity;
const overlap=state.cycles.some(c=>c.id!==ignoreId&&c.start&&a<=(c.end?dateFromKey(c.end).getTime():Infinity)&&b>=dateFromKey(c.start).getTime());
if(overlap)return 'Cette période chevauche une période déjà enregistrée.';
if(!end&&state.cycles.some(c=>c.id!==ignoreId&&!c.end))return 'Une période est déjà en cours.';
return '';
}
function openCycleEditor(id=null,presetStart=''){
const c=id?state.cycles.find(x=>x.id===id):null;
const start=c?.start||presetStart||'',end=c?.end||'';
openModal(c?'Modifier ma période':'Ajouter une période',`<p class="subtle">Renseigne les dates que tu as réellement observées. Tu peux ajouter une période d’un mois précédent.</p><label>Date de début</label><input id="cycleEditStart" type="date" value="${escapeHtml(start)}"><label>Date de fin</label><input id="cycleEditEnd" type="date" value="${escapeHtml(end)}"><div class="modal-actions">${c?'<button class="mini-btn danger-btn" id="deleteCyclePeriod">Supprimer</button>':''}<button class="primary" id="saveCyclePeriod">Enregistrer</button></div>`);
document.getElementById('saveCyclePeriod').onclick=()=>{const a=document.getElementById('cycleEditStart').value,b=document.getElementById('cycleEditEnd').value;const err=validateCycleRange(a,b,id);if(err){toast(err);return}if(c){c.start=a;c.end=b||null;c.updatedAt=new Date().toISOString()}else state.cycles.push({id:uid(),start:a,end:b||null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});saveState();closeModal();renderCycle();toast('Période enregistrée')};
if(c)document.getElementById('deleteCyclePeriod').onclick=()=>{if(confirm('Supprimer cette période ?')){state.cycles=state.cycles.filter(x=>x.id!==id);saveState();closeModal();renderCycle();toast('Période supprimée')}};
}
function updatePrayerVisibility(){const card=document.getElementById('prayerCard');if(!card)return;card.classList.remove('hidden');card.classList.toggle('cycle-context',!!activeCycleOn(selectedDate))}
function renderCycleHistory(){
const root=document.getElementById('cycleHistory');if(!root)return;
const list=state.cycles.filter(c=>c.start).slice().sort((a,b)=>b.start.localeCompare(a.start));
if(!list.length){root.innerHTML='<div class="empty-state">Aucune période enregistrée pour le moment.</div>';return}
root.innerHTML=list.map(c=>{const days=cycleDays(c);return `<div class="cycle-history-item"><div><strong>${escapeHtml(frDate(dateFromKey(c.start),true))}${c.end?' → '+escapeHtml(frDate(dateFromKey(c.end),true)):' → en cours'}</strong><div class="subtle">${days?days+' jour'+(days>1?'s':''):'Période en cours'}</div></div><button class="mini-btn" data-edit-cycle="${escapeHtml(c.id)}">Modifier</button></div>`}).join('');
}
function renderCycle(){
const today=todayKey(),c=activeCycleOn(today),open=currentOpenCycle();
const headline=document.getElementById('cycleHeadline'),sub=document.getElementById('cycleSubline'),status=document.getElementById('cycleStatusText');
if(c){const n=Math.floor((dateFromKey(today)-dateFromKey(c.start))/86400000)+1;headline.innerHTML=`Période renseignée<br>Jour ${n}`;sub.innerHTML='Prends soin de ton corps.<br>Ta spiritualité continue autrement ♡'}else{headline.textContent='Mon cycle';sub.textContent='Enregistre tes périodes, même après coup, pour construire ton historique.'}
status.textContent=open?`Période en cours depuis le ${frDate(dateFromKey(open.start),true)}.`:'Aucune période en cours.';
document.getElementById('cycleEndBtn').disabled=!open;document.getElementById('cycleStartBtn').disabled=!!open;
const completed=sortedCompletedCycles(),last=completed.at(-1);document.getElementById('cycleLastPeriod').textContent=last?`${frDate(dateFromKey(last.start),true)} → ${frDate(dateFromKey(last.end),true)}`:'Aucune';document.getElementById('cycleLastDuration').textContent=last?`${cycleDays(last)} jours enregistrés`:'Ajoute une période passée si tu la connais.';
const est=cycleEstimate();document.getElementById('cycleNextEstimate').textContent=est?`Autour du ${frDate(dateFromKey(est.center),true)}`:'Pas assez de données';document.getElementById('cycleEstimateBasis').textContent=est?`Fenêtre ${frDate(dateFromKey(est.from),true)} → ${frDate(dateFromKey(est.to),true)} · basée sur ${est.count} périodes`:'3 périodes complètes minimum pour une première estimation.';
document.getElementById('ramadanMakeupText').textContent=`Jeûnes à rattraper : ${Number(state.profile.ramadanMakeup||0)} jour${Number(state.profile.ramadanMakeup||0)>1?'s':''}`;
renderCycleCalendar();renderCycleHistory();updatePrayerVisibility();
}
document.getElementById('cycleStartBtn').onclick=()=>{if(currentOpenCycle())return;const a=todayKey(),err=validateCycleRange(a,'');if(err){toast(err);return}state.cycles.push({id:uid(),start:a,end:null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});saveState();renderCycle();toast('Début de période enregistré')};
document.getElementById('cycleEndBtn').onclick=()=>{const c=currentOpenCycle();if(!c)return;c.end=todayKey();c.updatedAt=new Date().toISOString();saveState();renderCycle();toast('Fin de période enregistrée')};
document.getElementById('cycleAddPastBtn').onclick=()=>openCycleEditor();document.getElementById('cycleAddPastBtnCalendar').onclick=()=>openCycleEditor();
document.getElementById('cycleHistory').addEventListener('click',e=>{const b=e.target.closest('[data-edit-cycle]');if(b)openCycleEditor(b.dataset.editCycle)});
document.getElementById('cycleTabs').addEventListener('click',e=>{const b=e.target.closest('[data-cycle-tab]');if(!b)return;document.querySelectorAll('#cycleTabs [data-cycle-tab]').forEach(x=>{const selected=x===b;x.classList.toggle('active',selected);x.setAttribute('aria-selected',String(selected))});document.getElementById('cycleTodayPanel').classList.toggle('hidden',b.dataset.cycleTab!=='today');document.getElementById('cycleCalendarPanel').classList.toggle('hidden',b.dataset.cycleTab!=='calendar')});
function renderCycleCalendar(){
const y=cycleCursor.getFullYear(),m=cycleCursor.getMonth(),est=cycleEstimate();document.getElementById('cycleCalendarMonth').textContent=new Intl.DateTimeFormat('fr-FR',{month:'long',year:'numeric'}).format(new Date(y,m,1)).replace(/^./,c=>c.toUpperCase());
const g=document.getElementById('cycleCalendarGrid');g.innerHTML='';['L','M','M','J','V','S','D'].forEach(x=>{const d=document.createElement('div');d.className='dow';d.textContent=x;g.appendChild(d)});const first=(new Date(y,m,1).getDay()+6)%7;for(let i=0;i<first;i++)g.appendChild(document.createElement('div'));const count=new Date(y,m+1,0).getDate();
for(let n=1;n<=count;n++){const d=new Date(y,m,n,12),k=keyFromDate(d),b=document.createElement('button');b.className='cycle-day';b.textContent=n;const saved=activeCycleOn(k);if(saved)b.classList.add('in-cycle');else if(est&&k>=est.from&&k<=est.to)b.classList.add('estimated');if(k===todayKey())b.classList.add('today');b.setAttribute('aria-label',`${frDate(d,true)}${saved?', période enregistrée':est&&k>=est.from&&k<=est.to?', période estimée':''}`);b.onclick=()=>{if(saved)openCycleEditor(saved.id);else openCycleEditor(null,k)};g.appendChild(b)}
}
document.getElementById('cyclePrevMonth').onclick=()=>{cycleCursor=new Date(cycleCursor.getFullYear(),cycleCursor.getMonth()-1,1,12);renderCycleCalendar()};document.getElementById('cycleNextMonth').onclick=()=>{cycleCursor=new Date(cycleCursor.getFullYear(),cycleCursor.getMonth()+1,1,12);renderCycleCalendar()};
document.getElementById('ramadanMakeupCard').onclick=()=>{openModal('Jeûnes à rattraper',`<p class="subtle">Ce compteur est manuel.</p><label>Nombre de jours</label><input id="makeupCount" type="number" min="0" step="1" value="${Number(state.profile.ramadanMakeup||0)}"><div class="modal-actions"><button class="primary" id="saveMakeup">Enregistrer</button></div>`);document.getElementById('saveMakeup').onclick=()=>{state.profile.ramadanMakeup=Math.max(0,Number(document.getElementById('makeupCount').value||0));saveState();renderCycle();closeModal();toast('Compteur mis à jour')}};
const FAITH_PATHS={
cycle:{title:'Cycle & purification',categories:['body','ramadan'],query:''},
daily:{title:'Adoration au quotidien',categories:['spiritual'],query:''},
life:{title:'Vie de femme musulmane',categories:['woman','life','women'],query:''}
};
function openFaithPath(key){
if(key==='books'){openFaithBooks();return;}
const path=FAITH_PATHS[key];if(!path)return;
go(8);faithCategory='all';
const search=document.getElementById('faithSearch');if(search)search.value='';
document.querySelectorAll('[data-faith-category]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});
renderFaithArticles(path.categories);
document.getElementById('faithArticleList')?.scrollIntoView({block:'start',behavior:'smooth'});
toast(`Parcours : ${path.title}`);
}
function openFaithBooks(){
openModal('Ouvrages & enseignements',`<div class="faith-reader faith-books-reader"><div class="faith-status faith-verified" style="display:inline-block">Bibliographie contrôlée · étape 1</div><p><strong>Les ouvrages complètent l’étude : ils ne remplacent ni le Coran ni la Sunna.</strong></p><p>Chaque leçon issue d’un livre distingue ce que l’auteur documente, les sources primaires utilisées et les éventuelles questions de fiqh.</p><div class="faith-book-list"><article class="faith-book-card"><span class="faith-book-tag">Histoire du savoir</span><strong>Al-Muḥaddithāt: The Women Scholars in Islam</strong><small>Muḥammad Akram Nadwī · Interface Publications · 2007 (éd. révisée 2013)</small><p>Étude consacrée aux femmes savantes et transmettrices du hadith dans l’histoire islamique.</p><button class="mini-btn" type="button" data-book-lesson="book-muhaddithat">Lire la première leçon</button></article><article class="faith-book-card"><span class="faith-book-tag">Fiqh du cycle</span><strong>A Treatise on Women’s Natural Types of Bleeding</strong><small>Muḥammad ibn Ṣāliḥ al-‘Uthaymīn · traité sur ḥayḍ, istiḥāḍa et nifās</small><p>Ouvrage de fiqh retenu comme ressource d’étude comparative. Ses conclusions juridiques seront attribuées à l’auteur et comparées aux sources et, si nécessaire, à d’autres avis avant d’être transformées en leçons.</p><button class="mini-btn" type="button" data-book-lesson="book-natural-bleeding">Lire la leçon de méthode</button></article><article class="faith-book-card faith-book-featured"><span class="faith-book-tag">Vie quotidienne & science</span><strong>Conseils aux femmes musulmanes — suivi de questions-réponses</strong><small>Umm ‘Abdillah Al-Wâdi‘iyya · préface de Cheikh Muqbil · édition française Dar Al Muslim</small><p>Thèmes vérifiés dans les notices françaises : prière, pudeur, enfants, vie conjugale, science, temps et sincérité. Sources vérifiées séparément.</p><div class="faith-book-actions"><button class="mini-btn" type="button" data-book-lesson="book-wadiiyya-time">Temps</button><button class="mini-btn" type="button" data-book-lesson="book-wadiiyya-knowledge">Science</button><button class="mini-btn" type="button" data-book-lesson="book-wadiiyya-sisters">Conseil</button><button class="mini-btn" type="button" data-book-lesson="book-wadiiyya-children">Enfants & transmission</button><button class="mini-btn" type="button" data-book-lesson="book-wadiiyya-sincerity">Intention</button><button class="mini-btn" type="button" data-book-lesson="book-wadiiyya-modesty">Pudeur</button><button class="mini-btn" type="button" data-book-lesson="book-wadiiyya-family">Vie familiale</button></div></article></div><div class="faith-book-method"><strong>Méthode</strong><span>Identifier l’édition → vérifier les références → reformuler sans copier → attribuer les avis → signaler les divergences → relier à une situation concrète.</span></div></div>`);
document.getElementById('modalBody')?.addEventListener('click',e=>{const b=e.target.closest('[data-book-lesson]');if(!b)return;const id=b.dataset.bookLesson;closeModal();setTimeout(()=>openFaithArticle(id),0)});
}
const FAITH_ARTICLES=[
{id:'woman-value',cat:'woman',title:'Ma valeur & ma foi',sub:'La valeur spirituelle devant Allah',status:'verified',
summary:'Le Coran associe explicitement hommes et femmes dans la foi, les œuvres, le rappel d’Allah, le pardon et la récompense.',
sections:[
['En quelques mots','La valeur spirituelle n’est pas présentée comme réservée à un sexe. Le Coran mentionne côte à côte les croyants et les croyantes et promet la récompense à la personne croyante qui accomplit le bien.'],
['Repères','Le verset 33:35 énumère parallèlement hommes et femmes dans plusieurs qualités spirituelles. Le verset 16:97 promet une « bonne vie » et une récompense à quiconque accomplit une œuvre bonne en étant croyant, homme ou femme.'],
['À méditer','Quelles qualités de foi ai-je envie de cultiver aujourd’hui, sans me comparer aux autres ?']
],
sources:[['Coran 33:35','https://quran.com/33/35'],['Coran 16:97','https://quran.com/fr/les-abeilles/97?translations=31%2C20']]},
{id:'woman-knowledge',cat:'woman',title:'Apprendre & transmettre',sub:'Les femmes aussi questionnent et apprennent leur religion',status:'verified',
summary:'Les recueils de hadith montrent des femmes demandant un temps d’enseignement et posant directement leurs questions religieuses.',
sections:[
['Un temps pour apprendre','Sahih al-Bukhari consacre un chapitre à la question d’un jour réservé à l’enseignement des femmes. Le récit associé rapporte leur demande d’un temps d’enseignement auprès du Prophète.'],
['Poser des questions','Les récits transmis par ‘Â’isha montrent aussi des femmes venant demander des explications sur des questions concrètes de pratique.'],
['Pour mon Jardin','Apprendre peut commencer simplement : noter une question, chercher sa source et distinguer ce que le texte dit de l’interprétation qu’on en donne.']
],
sources:[['Sahih al-Bukhari 101–102','https://sunnah.com/bukhari/3/43-44'],['Sahih Muslim — Livre des menstruations','https://sunnah.com/muslim/3']]},
{id:'woman-rights',cat:'woman',title:'Mes droits : mahr, biens & héritage',sub:'Quelques principes explicitement mentionnés dans le Coran',status:'verified',
summary:'Le Coran ordonne de remettre aux épouses leur mahr, reconnaît aux femmes une part de ce qu’elles acquièrent et établit pour elles des parts successorales.',
sections:[
['Le mahr','Le Coran 4:4 demande de donner aux épouses leur dot (mahr). Le texte précise également le cas où l’épouse en abandonne volontairement une partie.'],
['Biens et acquisition','En 4:32, le Coran mentionne une part de ce que les hommes acquièrent et une part de ce que les femmes acquièrent.'],
['Héritage','Le Coran 4:7 affirme qu’aux femmes, comme aux hommes, revient une part de ce que laissent parents et proches. Les parts concrètes dépendent ensuite de la configuration successorale : cette fiche ne remplace donc pas l’étude du cas précis.']
],
sources:[['Coran 4:4 — mahr','https://quran.com/fr/les-femmes/4'],['Coran 4:32 — acquisition','https://quran.com/fr/les-femmes/32'],['Coran 4:7 — héritage','https://quran.com/fr/les-femmes/7']]},
{id:'woman-family',cat:'woman',title:'Consentement au mariage',sub:'Le consentement doit être recherché',status:'verified',
summary:'Des hadiths authentiques rapportent qu’une femme précédemment mariée doit être consultée et qu’une vierge doit également être sollicitée pour son accord.',
sections:[
['Le repère','Dans Sahih Muslim 1419–1421, plusieurs formulations rapportent la nécessité de consulter la femme concernant son mariage. Pour la vierge, les récits évoquent son silence comme forme d’accord dans le contexte décrit.'],
['À ne pas transformer en raccourci','Ces textes ne doivent pas être utilisés pour présenter l’absence de parole comme un consentement lorsqu’une personne refuse, subit une contrainte ou n’est pas libre de décider. La fiche expose ici le texte de référence ; les questions de validité juridique détaillées demandent une étude plus complète.']
],
sources:[['Sahih Muslim 1419–1421','https://sunnah.com/muslim/16/74-85']]},
{id:'book-muhaddithat',cat:'women',title:'Les femmes ont aussi porté et transmis le savoir',sub:'Leçon tirée d’Al-Muḥaddithāt de Muḥammad Akram Nadwī',status:'verified',origin:'book',
summary:'Al-Muḥaddithāt documente la présence de femmes dans l’étude et la transmission du hadith à travers l’histoire islamique. La leçon à en tirer n’est pas qu’« apprendre est permis » : rechercher, préserver et transmettre un savoir fiable peut faire partie d’une vie musulmane active.',
sections:[
['Ce que documente l’ouvrage','L’ouvrage est une introduction anglaise au vaste travail biographique de l’auteur sur les femmes savantes du hadith. Sa présentation décrit des femmes qui étudiaient, voyageaient pour le savoir, enseignaient et accordaient des autorisations de transmission.'],
['À relier aux sources primaires','Cette histoire du savoir rejoint des hadiths où des femmes demandent directement un temps d’enseignement et interrogent sur leur pratique. L’ouvrage sert ici de source historique secondaire ; les hadiths restent affichés séparément comme sources primaires.'],
['Pour ma vie','Je peux traiter mes questions religieuses comme de vraies questions de connaissance : les noter, chercher des références, demander quand je ne sais pas et transmettre seulement ce que j’ai vérifié.'],
['Prudence éditoriale','Cette fiche résume une idée documentée par l’ouvrage et sa présentation bibliographique ; elle ne reproduit pas ses pages ni ne transforme toutes les analyses de l’auteur en règles religieuses.']
],
sources:[['Al-Muḥaddithāt — présentation de l’auteur','https://akramnadwi.com/books/al-muhaddithat-the-women-scholars-in-islam/'],['Al-Muḥaddithāt — notice bibliographique','https://books.google.com/books?id=vJoQAQAAIAAJ'],['Sahih al-Bukhari 101–102 — demande d’enseignement','https://sunnah.com/bukhari/3/43-44']]},
{id:'book-wadiiyya-time',cat:'women',title:'Préserver mon temps',sub:'Conseils aux femmes',status:'verified',origin:'book',summary:'L’ouvrage valorise l’usage utile du temps. Al-‘Aṣr le relie à la foi, aux bonnes œuvres, à la vérité et à la patience.',sections:[['Pour ma vie','Protéger un temps réaliste pour adoration, apprentissage, proches et repos. Une journée imparfaite compte.']],sources:[['Notice de l’ouvrage','https://www.alhidayah.fr/edition-dar-al-muslim/618-conseils-aux-femmes-musulmanes-edition-dar-al-muslim-9782356353863.html'],['Coran 103:1–3','https://quran.com/103']]},
{id:'book-wadiiyya-knowledge',cat:'women',title:'Chercher une science bénéfique',sub:'Apprendre avec soin',status:'verified',origin:'book',summary:'L’ouvrage encourage la science religieuse. Sahih al-Bukhari 101 rapporte que des femmes demandèrent au Prophète ﷺ un temps d’enseignement.',sections:[['Ma méthode','Question → source → distinguer texte et avis → demander à une personne qualifiée si nécessaire.']],sources:[['Thèmes de l’ouvrage','https://maktaba-al-wasatiyya.com/produit/conseils-aux-femmes-musulmanes-suivi-de-questions-reponses/'],['Sahih al-Bukhari 101','https://sunnah.com/bukhari:101']]},
{id:'book-wadiiyya-sisters',cat:'women',title:'Se conseiller entre sœurs',sub:'Conseiller avec douceur',status:'verified',origin:'book',summary:'La préface met en avant le conseil entre femmes. Le Coran 9:71 décrit croyants et croyantes comme alliés et mentionne l’encouragement au convenable.',sections:[['Conseil responsable','Vérifier, distinguer règle et avis, écouter l’autre et orienter vers plus qualifié quand il le faut.']],sources:[['Présentation de l’ouvrage','https://lamaktaba.fr/index.php/produit/conseils-aux-femmes-musulmanes-suivi-de-questions-reponses-umm-abdillah-al-wadiiyya'],['Coran 9:71','https://quran.com/fr/le-repentir/71']]},
{id:'book-wadiiyya-sincerity',cat:'women',title:'Renouveler mon intention',sub:'Sincérité et adoration',status:'verified',origin:'book',summary:'La sincérité figure parmi les thèmes présentés pour Conseils aux femmes musulmanes. Cette leçon originale relie ce thème au Coran 98:5 ; elle ne prétend pas citer une page du livre.',sections:[['Dans ma journée','Avant une action, je peux prendre un instant pour examiner mon intention sans transformer chaque geste en source d’inquiétude.'],['D’où vient cette leçon ?','Thème signalé dans la présentation bibliographique ; application quotidienne rédigée par Jardin du Cœur, non attribuée mot pour mot à l’auteure.']],sources:[['Présentation bibliographique de l’ouvrage','https://maktaba-al-wasatiyya.com/produit/conseils-aux-femmes-musulmanes-suivi-de-questions-reponses/'],['Coran 98:5','https://quran.com/98/5']]},
{id:'book-wadiiyya-modesty',cat:'women',title:'La pudeur avec connaissance et dignité',sub:'Pudeur et respect',status:'verified',origin:'book',summary:'La pudeur est un thème annoncé de l’ouvrage. Le Coran 24:30–31 s’adresse aux croyants et aux croyantes ; les détails d’application peuvent faire l’objet d’interprétations juridiques.',sections:[['Pour ma vie','Étudier les textes et leurs interprétations avec sérieux, sans utiliser la pudeur pour humilier autrui ou minimiser sa dignité.'],['Prudence','Cette fiche n’énonce pas une règle vestimentaire exhaustive et ne présente pas un avis particulier comme consensus.']],sources:[['Présentation bibliographique de l’ouvrage','https://maktaba-al-wasatiyya.com/produit/conseils-aux-femmes-musulmanes-suivi-de-questions-reponses/'],['Coran 24:30–31','https://quran.com/24/30-31']]},
{id:'book-wadiiyya-family',cat:'women',title:'Bienveillance dans la vie familiale',sub:'Époux et enfants',status:'verified',origin:'book',summary:'Vie conjugale et éducation des enfants sont des thèmes annoncés de l’ouvrage. Le Coran 30:21 mentionne affection et miséricorde entre époux ; cette leçon propose une réflexion, pas une décision juridique individuelle.',sections:[['Dans la relation','Privilégier une parole respectueuse, une écoute réciproque et une répartition discutée des responsabilités.'],['Pour les enfants','Accompagner l’apprentissage avec patience et continuer soi-même à apprendre.'],['Sécurité','Aucun conseil sur la patience ou la vie familiale ne justifie la violence ni l’abandon d’une personne en danger. Pour une question juridique personnelle, consulter une personne qualifiée.']],sources:[['Présentation bibliographique de l’ouvrage','https://maktaba-al-wasatiyya.com/produit/conseils-aux-femmes-musulmanes-suivi-de-questions-reponses/'],['Coran 30:21','https://quran.com/30/21']]},
{id:'book-wadiiyya-children',cat:'women',title:'Accompagner les enfants dans l’apprentissage',sub:'Transmission, patience et exemple',status:'verified',origin:'book',summary:'L’éducation des enfants fait partie des thèmes annoncés de Conseils aux femmes musulmanes. Cette leçon originale propose des repères de transmission et distingue la notice du livre des textes religieux cités séparément.',sections:[['Une responsabilité partagée','Le Coran 66:6 appelle les croyants à veiller sur eux-mêmes et leur famille. La transmission et les soins ne doivent pas être présentés comme la seule responsabilité de la mère.'],['Enseigner avec bienveillance','Le Coran 31:13–19 présente les conseils de Luqmân à son enfant : foi, prière, conduite envers autrui et modération. Le passage est un support de réflexion, non une méthode éducative exhaustive.'],['Une petite pratique','Choisir ensemble une question, lire une source adaptée à l’âge, accueillir les questions et reconnaître quand une réponse demande une vérification.'],['Respect et sécurité','Adapter l’apprentissage à l’âge et aux besoins de chaque enfant ; ne pas confondre éducation religieuse et intimidation ou violence.'],['Attribution','Le thème général est attesté dans la notice bibliographique ; les conseils pratiques sont une rédaction originale de Jardin du Cœur, sans citation ni pagination inventée du livre.']],sources:[['Notice de Conseils aux femmes musulmanes','https://maktaba-al-wasatiyya.com/produit/conseils-aux-femmes-musulmanes-suivi-de-questions-reponses/'],['Coran 66:6','https://quran.com/66/6'],['Coran 31:13–19','https://quran.com/31/13-19']]},
{id:'book-natural-bleeding',cat:'body',title:'Cycle : apprendre à distinguer avant de conclure',sub:'Leçon de méthode tirée du traité de Muḥammad ibn Ṣāliḥ al-‘Uthaymīn',status:'verified',origin:'book',
summary:'Le traité A Treatise on Women’s Natural Types of Bleeding organise son étude autour de trois catégories — ḥayḍ, istiḥāḍa et nifās — et de leurs conséquences juridiques. Jardin du Cœur en retient d’abord une méthode : identifier la situation avant d’appliquer une règle.',
sections:[
['Ce que fait l’ouvrage','L’ouvrage étudie séparément les menstruations, les saignements hors menstruation et les saignements post-partum, puis leurs effets sur différentes pratiques. Il s’agit d’un ouvrage de fiqh : ses conclusions sont donc attribuées à son auteur et ne sont pas présentées comme si toute divergence juridique disparaissait.'],
['Le repère dans la Sunna','Le récit de Fâtimah bint Abî Hubaysh distingue explicitement l’istiḥāḍa des menstruations : un saignement continu n’est pas automatiquement traité comme une menstruation.'],
['Pour utiliser Mon cycle','Une date, une couleur dans le calendrier ou une estimation ne suffit pas à déterminer un statut religieux. L’application garde donc la saisie déclarative et renvoie vers des leçons plutôt que de produire elle-même une conclusion de fiqh.'],
['Quand demander de l’aide','Une situation inhabituelle peut nécessiter deux démarches différentes : une question de fiqh auprès d’une personne qualifiée et, si le saignement ou l’état de santé inquiète, un avis médical.']
],
sources:[['A Treatise on Women’s Natural Types of Bleeding — Islamic Encyclopedia','https://islamenc.com/en/books/130'],['Sunan Abi Dawud 280 — istiḥāḍa','https://sunnah.com/abudawud/1/280']]},
{id:'body-period',cat:'body',title:'Comprendre les menstruations',sub:'Menstruations et pratique : premiers repères',status:'verified',
summary:'Les menstruations sont traitées explicitement dans les sources. Elles modifient certaines pratiques, mais ne signifient pas que toute vie spirituelle s’arrête.',
sections:[
['Un phénomène reconnu','Dans le récit de ‘Â’isha pendant le Hajj, le Prophète lui indique que les menstruations sont une réalité qui concerne les filles d’Adam et lui demande de poursuivre les rites du pèlerin, à l’exception du tawaf jusqu’à la fin de ses règles.'],
['Prière','Des récits de ‘Â’isha rapportent que les prières non accomplies pendant les menstruations n’étaient pas ensuite rattrapées.'],
['Important','Le calendrier de Jardin du Cœur enregistre ce que tu déclares. Une estimation de date ne détermine jamais à elle seule ton état religieux ou médical.']
],
sources:[['Sahih al-Bukhari 305','https://sunnah.com/bukhari/6/10'],['Sahih al-Bukhari 321','https://sunnah.com/bukhari/6/26'],['Sahih Muslim 335a','https://sunnah.com/muslim/3/83']]},
{id:'body-end',cat:'body',title:'Fin de période & ghusl',sub:'Se purifier après la fin des menstruations',status:'verified',
summary:'Les sources distinguent la fin des menstruations du saignement qui continue hors menstruation et mentionnent le ghusl avant la reprise de la prière.',
sections:[
['Après la fin des menstruations','Dans le récit de Fâtimah bint Abî Hubaysh, le Prophète distingue le saignement continu de la menstruation et indique qu’après la fin de la période, elle se purifie puis reprend la prière.'],
['Le ghusl','Sahih Muslim rapporte également une question posée au Prophète sur la manière de faire le ghusl après les menstruations. Le récit mentionne le lavage et l’attention portée à la trace du sang.'],
['Dans l’application','Jardin du Cœur ne décide pas automatiquement que tes règles sont terminées. La date de fin reste une information que tu renseignes toi-même.']
],
sources:[['Sunan Abi Dawud 280','https://sunnah.com/abudawud/1/280'],['Sahih Muslim 332a','https://sunnah.com/muslim/3/70']]},
{id:'body-ghusl-practical',cat:'body',title:'Ghusl après les règles : les repères du hadith',sub:'Une fiche pratique sans transformer les détails de fiqh en automatisme',status:'verified',
summary:'Dans le récit d’Asmâ’ bint Shakal, le Prophète enseigne un lavage soigneux après les menstruations : se purifier avec l’eau, faire parvenir l’eau jusqu’aux racines des cheveux et nettoyer la trace du sang.',
sections:[
['Le cœur du geste','Sahih Muslim 332c rapporte qu’Asmâ’ interrogea le Prophète sur le ghusl après les menstruations. Le récit mentionne une purification soigneuse, l’eau versée sur la tête avec friction jusqu’aux racines des cheveux, puis le lavage.'],
['Après le lavage','Le même récit mentionne l’usage d’un morceau de tissu/coton parfumé au musc sur la trace du sang. Cette mention est présentée comme un détail du hadith, pas comme une condition que l’application impose pour valider un ghusl.'],
['Ce que l’application ne fait pas','Jardin du Cœur ne possède pas de bouton « ghusl validé » et ne juge pas la validité d’une purification. La fiche sert à apprendre ; les conditions juridiques détaillées et les situations particulières peuvent nécessiter l’avis d’une personne qualifiée.'],
['À retenir','La fin des règles est constatée avant le ghusl. Le calendrier peut mémoriser tes observations, mais il ne décide ni de la fin du ḥayḍ ni de la validité de ta purification.']
],
sources:[['Sahih Muslim 332c — ghusl après les menstruations','https://sunnah.com/muslim:332c'],['Sahih Muslim 332a — trace du sang','https://sunnah.com/muslim/3/70']]},
{id:'body-istihada-practical',cat:'body',title:'Saignement irrégulier : que retenir sur l’istiḥâḍa ?',sub:'Ne pas confondre automatiquement saignement persistant et menstruations',status:'verified',
summary:'Le récit de Fâtimah bint Abî Hubaysh distingue explicitement un saignement persistant de la menstruation. Il montre pourquoi une situation irrégulière demande d’identifier les faits avant d’en tirer une conséquence religieuse.',
sections:[
['Le repère principal','Dans Sahih al-Bukhari 228, Fâtimah bint Abî Hubaysh explique qu’elle saigne de façon persistante. Le Prophète lui répond que ce saignement n’est pas la menstruation et lui indique de délaisser la prière pendant sa véritable période menstruelle puis de se purifier et de prier lorsqu’elle est terminée.'],
['Pourquoi les dates restent utiles','Noter les jours réellement observés, l’apparition et la fin du saignement et les changements inhabituels peut aider à décrire correctement la situation. Mais ces données ne permettent pas à Jardin du Cœur de rendre une décision de fiqh.'],
['Deux questions différentes','Une classification religieuse difficile relève du fiqh. Un saignement inhabituel, abondant, prolongé ou inquiétant peut aussi relever de la santé. L’application garde volontairement ces deux démarches distinctes.'],
['En cas de doute','Conserve tes observations et expose le cas complet à une personne qualifiée pour la question religieuse. Si le saignement t’inquiète sur le plan physique, demande aussi un avis médical plutôt que d’attendre une conclusion de l’application.']
],
sources:[['Sahih al-Bukhari 228 — istiḥâḍa','https://sunnah.com/bukhari/4/94'],['Sahih Muslim — Livre des menstruations','https://sunnah.com/muslim/3']]},
{id:'body-quran',cat:'body',title:'Coran pendant les menstruations',sub:'Une question sur laquelle existent plusieurs avis',status:'verified',
summary:'La récitation du Coran pendant les menstruations fait l’objet de divergences juridiques. Jardin du Cœur ne présente donc pas une position unique comme si elle était unanimement admise.',
sections:[
['Pourquoi la fiche signale une divergence','Des présentations juridiques contemporaines rapportant les écoles classiques exposent une position restrictive chez des juristes hanafites et shaféites, avec des nuances concernant les versets récités comme invocation ou rappel. D’autres avis autorisent la récitation dans certaines conditions.'],
['Ce que l’application fait','Cette fiche sert à signaler honnêtement l’existence de plusieurs avis. Elle ne choisit pas à ta place l’avis juridique que tu dois suivre. Pour une application pratique détaillée à ta situation, tu peux te référer à une personne qualifiée de confiance.'],
['À distinguer','Réciter, écouter, lire une traduction et toucher un exemplaire physique du muṣḥaf sont des questions qui ne doivent pas être confondues : elles peuvent recevoir des traitements juridiques distincts.']
],
sources:[['Présentation d’un avis shaféite — IslamQA.org','https://islamqa.org/shafii/qibla-shafii/33355/reciting-quran-during-menstruation/'],['Présentation d’avis hanafites — IslamQA.org','https://islamqa.org/hanafi/fatwacentre/179159/reciting-quran-and-manzil-during-menstruation/'],['Présentation d’avis divergents (arabe) — IslamQA.info','https://islamqa.info/ar/answers/2564']]},
{id:'body-istihada',cat:'body',title:'Comprendre l’istihâda',sub:'Distinguer menstruations et saignement hors menstruation',status:'verified',
summary:'Des hadiths distinguent explicitement l’istihâda des menstruations. Dans le cas rapporté de Fâtimah bint Abî Hubaysh, le saignement continu n’entraîne pas l’arrêt permanent de la prière.',
sections:[
['Le récit de Fâtimah bint Abî Hubaysh','Elle rapporte un saignement continu et demande si elle doit abandonner la prière. Le Prophète répond que ce saignement n’est pas la menstruation et lui indique de laisser la prière pendant sa période menstruelle puis de reprendre ensuite.'],
['Pourquoi cette distinction compte','Un saignement ne peut donc pas être classé automatiquement comme menstruation uniquement parce qu’il apparaît dans un calendrier. Les situations individuelles peuvent nécessiter des repères juridiques plus détaillés et, lorsqu’il y a un problème de santé ou un saignement inhabituel, un avis médical adapté.'],
['Dans Jardin du Cœur','Le suivi du cycle reste déclaratif : l’application n’essaie pas de diagnostiquer une istihâda à partir de tes dates.']
],
sources:[['Sunan an-Nasa’i 359','https://sunnah.com/nasai/3/11'],['Sunan Abi Dawud 280','https://sunnah.com/abudawud/1/280']]},
{id:'body-nifas',cat:'body',title:'Comprendre le nifâs',sub:'Le saignement post-partum et la reprise de la pratique',status:'verified',
summary:'Le nifâs désigne le saignement lié à l’accouchement. Un récit d’Umm Salama rapporte que les femmes en nifâs, à l’époque du Prophète, restaient jusqu’à quarante jours sans reprendre la prière.',
sections:[
['Le texte de référence','Umm Salama rapporte qu’au temps du Messager d’Allah, les femmes en saignement post-partum attendaient quarante jours. Le hadith est rapporté notamment dans Sunan Ibn Majah 648.'],
['Ce que cette fiche ne simplifie pas','Les cas de fin du saignement avant cette durée, de reprise, ou de saignements prolongés demandent des distinctions de fiqh. La mention de quarante jours ne doit donc pas être transformée par l’application en diagnostic ou en compteur automatique.'],
['Dans Jardin du Cœur','Le suivi du cycle ne classe pas automatiquement un saignement post-partum. Une future extension dédiée au post-partum devra rester séparée du calendrier menstruel ordinaire.'],
['Santé et fiqh','Après un accouchement, une question religieuse et une question médicale peuvent coexister. L’application ne remplace ni une consultation médicale ni un avis religieux qualifié pour une situation particulière.']
],
sources:[['Sunan Ibn Majah 648 — nifâs','https://sunnah.com/ibnmajah:648']]},
{id:'body-uncertain',cat:'body',title:'Quand je ne sais pas comment classer un saignement',sub:'Ne pas laisser une estimation décider à ma place',status:'verified',
summary:'Les sources distinguent menstruation et istiḥāḍa. Lorsqu’une situation ne correspond pas clairement à l’habitude, Jardin du Cœur doit aider à conserver les faits sans fabriquer une conclusion religieuse.',
sections:[
['Commencer par les faits','Note les dates que tu observes et, si cela t’aide, les informations que tu souhaites garder pour expliquer la situation. Le calendrier est un journal : ce n’est pas un moteur de fatwa.'],
['Pourquoi la distinction est importante','Dans plusieurs versions du récit de Fâtimah bint Abî Hubaysh, le Prophète distingue le saignement hors menstruation de la menstruation et indique la reprise de la prière en dehors de la période menstruelle.'],
['Si le cas reste incertain','Les détails permettant de déterminer le statut d’un saignement peuvent dépendre de la situation et de l’approche juridique suivie. Il est plus sûr d’exposer précisément les faits à une personne qualifiée que de déduire une règle d’une estimation de l’application.'],
['Si le saignement inquiète','Un saignement inhabituel, important ou préoccupant relève aussi de la santé. Cette fiche donne un repère religieux général et ne cherche pas à expliquer médicalement la cause du saignement.']
],
sources:[['Sunan an-Nasa’i 359 — distinction menstruation/istiḥāḍa','https://sunnah.com/nasai/3/11'],['Sunan Abi Dawud 280 — reprise de la prière','https://sunnah.com/abudawud/1/280']]},
{id:'body-purity-signs',cat:'body',title:'Reconnaître la fin des règles',sub:'Pureté constatée, ghusl et reprise de la prière',status:'verified',
summary:'La reprise de la prière est liée à la fin des menstruations et à la purification. L’application ne déduit jamais cette fin d’une estimation de calendrier.',
sections:[
['Le principe établi','Dans Sahih al-Bukhari, le Prophète indique de délaisser la prière pendant les menstruations puis, lorsqu’elles prennent fin, de se laver et de reprendre la prière. Sahih Muslim rapporte également cette reprise après le bain dans des cas de saignement hors menstruation.'],
['Observer plutôt que prédire','Une date prévue n’est pas une preuve de fin de règles. Jardin du Cœur te laisse enregistrer ce que tu as réellement observé et ne transforme jamais une estimation en décision religieuse.'],
['Quand la situation est inhabituelle','Un saignement persistant ou difficile à classer peut relever d’une question de fiqh plus précise et, s’il est inhabituel ou préoccupant, mérite aussi un avis médical.']
],
sources:[['Sahih al-Bukhari 331','https://sunnah.com/bukhari/6/35'],['Sahih Muslim 334e','https://sunnah.com/muslim/3']]},
{id:'body-yellow-brown',cat:'body',title:'Pertes jaunes ou brunes',sub:'Pourquoi le moment où elles apparaissent compte',status:'verified',
summary:'Les sources distinguent les pertes observées dans le contexte menstruel de celles observées après la pureté. Une couleur isolée ne doit donc pas être interprétée automatiquement par le calendrier.',
sections:[
['Après la pureté','Umm ‘Atiyya rapporte que les pertes jaunâtres ou brunâtres après la pureté n’étaient pas considérées comme menstruations.'],
['Avant d’en tirer une règle','Le contexte compte : continuité avec les règles, constat préalable de pureté et détails propres à la situation. L’application ne classe donc pas une perte à partir de sa couleur seule.'],
['Réflexe utile','Note ce que tu observes avec la date. Si le cas devient récurrent ou difficile à distinguer, conserve cet historique pour pouvoir expliquer précisément la situation à une personne qualifiée et, si nécessaire, à un professionnel de santé.']
],
sources:[['Sunan Abi Dawud 307','https://sunnah.com/abudawud:307'],['Sahih al-Bukhari 326','https://sunnah.com/bukhari/6']]},
{id:'ramadan-makeup',cat:'ramadan',title:'Règles : faut-il rattraper prière et jeûne ?',sub:'Une distinction explicitement rapportée par ‘Â’isha',status:'verified',
summary:'‘Â’isha rapporte que les jeûnes manqués pendant les menstruations étaient rattrapés, contrairement aux prières manquées pendant cette période.',
sections:[
['Le récit','Dans Sahih Muslim, ‘Â’isha explique qu’elles recevaient l’ordre de rattraper les jours de jeûne, mais pas les prières laissées pendant les menstruations.'],
['Dans Mon cycle','Le compteur « Jeûnes à rattraper » reste volontairement manuel : l’application ne calcule pas tes obligations à partir des dates du cycle.'],
['À retenir','Prière et jeûne ne reçoivent donc pas le même traitement concernant le rattrapage. Pour un cas particulier — grossesse, allaitement, maladie ou situation complexe — il faut examiner les règles propres à ce cas.']
],
sources:[['Sahih Muslim 335c','https://sunnah.com/muslim/3/85']]},
{id:'spiritual-distance',cat:'spiritual',title:'Quand je me sens loin d’Allah',sub:'Espérance, retour et proximité',status:'verified',
summary:'Le Coran associe l’éloignement ressenti à une invitation à revenir sans désespérer de la miséricorde d’Allah.',
sections:[
['Ne pas désespérer','En 39:53, le Coran s’adresse à ceux qui ont commis des excès contre eux-mêmes et leur demande de ne pas désespérer de la miséricorde d’Allah. Le verset suivant appelle à revenir vers Lui.'],
['Allah est proche','En 2:186, Allah affirme Sa proximité et qu’Il répond à l’appel de celui qui L’invoque.'],
['Pour mon Jardin','Au lieu de mesurer ta foi par un score, tu peux simplement noter : « Quel petit pas de retour puis-je faire aujourd’hui ? »']
],
sources:[['Coran 39:53–54','https://quran.com/fr/39/53-54'],['Coran 2:186','https://quran.com/fr/la-vache/186']]},
{id:'spiritual-dua',cat:'spiritual',title:'Du‘â & espérance',sub:'Invoquer Allah et garder l’espérance',status:'verified',
summary:'Le Coran présente l’invocation comme une relation directe avec Allah : « Je suis tout proche » et « Je réponds à l’appel de celui qui M’invoque ».',
sections:[
['L’invocation','Le verset 2:186 relie proximité, invocation, réponse à l’appel, foi et orientation.'],
['L’espérance','Le verset 39:53 interdit de désespérer de la miséricorde d’Allah, même après avoir commis des fautes.'],
['Dans Jardin du Cœur','Tes du‘â personnelles restent privées et ne sont pas analysées pour te recommander des contenus. Tu peux simplement les écrire, les relire et les confier à Allah.']
],
sources:[['Coran 2:186','https://quran.com/fr/la-vache/186'],['Coran 39:53','https://quran.com/fr/les-groupes/53']]},
{id:'ramadan-period',cat:'ramadan',title:'Règles, prière & jeûne : le rattrapage',sub:'Distinguer la prière du jeûne à rattraper',status:'verified',
summary:'Le récit de ‘Â’isha transmis dans Sahih Muslim distingue les prières manquées pendant les menstruations, qui ne sont pas rattrapées, du jeûne qui fait l’objet d’un rattrapage dans la tradition rapportée.',
sections:[
['Prière','Les prières laissées pendant les menstruations ne sont pas à refaire après la période, selon le récit de ‘Â’isha.'],
['Jeûne','Le chapitre de Sahih Muslim 335 est explicitement consacré au rattrapage du jeûne et non de la prière pour la femme menstruée.'],
['Dans Jardin du Cœur','Le compteur de jeûnes à rattraper reste volontairement manuel : l’application ne déduit pas automatiquement une obligation à partir de ton calendrier.']
],
sources:[['Sahih Muslim 335a','https://sunnah.com/muslim/3/83'],['Sahih Muslim 335b','https://sunnah.com/muslim/3/84']]},
{id:'ramadan-spirit',cat:'ramadan',title:'Ramadan pendant mes règles',sub:'Le jeûne s’interrompt, la relation avec Allah ne disparaît pas',status:'verified',
summary:'Le récit de ‘Â’isha établit le rattrapage des jours de jeûne manqués pendant les menstruations, contrairement aux prières. L’application garde donc ce suivi séparé et manuel.',
sections:[
['Ce qui est explicitement rapporté','Dans Sahih Muslim 335c, ‘Â’isha explique qu’elles recevaient l’ordre de rattraper les jours de jeûne, mais pas les prières manquées pendant les menstruations.'],
['Ne pas réduire Ramadan à un compteur','Cette règle ne signifie pas que la relation avec Allah s’arrête. Jardin du Cœur conserve pendant cette période les espaces de du‘â, journal, gratitude et réflexion.'],
['Dans l’application','Aucun jour n’est ajouté automatiquement à « Jeûnes à rattraper ». Tu renseignes toi-même ton suivi : une date de cycle ne suffit pas à déduire toutes les circonstances d’un jour de jeûne.']
],
sources:[['Sahih Muslim 335c','https://sunnah.com/muslim/3/85']]},
{id:'life-single',cat:'life',title:'Célibat & cheminement',sub:'Foi · projets · pression sociale',status:'verified',
summary:'Le célibat n’empêche pas de construire une vie de foi, de savoir, de projets et de service. Cette fiche évite de réduire la valeur d’une femme à son statut matrimonial.',
sections:[
['Ma valeur ne dépend pas d’un statut matrimonial','Le Coran 33:35 associe hommes et femmes dans les qualités de foi et dans la promesse de pardon et de récompense. Le texte ne conditionne pas cette valeur spirituelle au mariage.'],
['Construire pendant l’attente','Apprendre, travailler sur son caractère, prendre soin de ses liens, développer ses compétences et nourrir sa relation avec Allah sont des chemins qui ont leur valeur propre. Cette partie est une proposition de réflexion de Jardin du Cœur, pas une règle juridique.'],
['Face à la pression','Une pression familiale ou sociale ne remplace pas ton consentement. Les récits de Sahih Muslim sur le mariage indiquent que la femme doit être consultée.'],
['Pour mon Jardin','Qu’est-ce que je veux cultiver dans ma vie maintenant, indépendamment de la date d’un éventuel mariage ?']
],
sources:[['Coran 33:35','https://quran.com/33/35'],['Sahih Muslim 1421b','https://sunnah.com/muslim/16/79']]},
{id:'life-marriage',cat:'life',title:'Je me prépare au mariage',sub:'Consentement · mahr · affection · miséricorde',status:'verified',
summary:'Les sources présentent plusieurs repères utiles avant le mariage : le consentement de la femme doit être recherché, le mahr lui est remis, et le Coran décrit la vie conjugale par la tranquillité, l’affection et la miséricorde.',
sections:[
['Le consentement','Sahih Muslim rapporte qu’une femme précédemment mariée doit être consultée et qu’une vierge doit également être sollicitée pour son accord. Le récit décrit son silence comme une forme d’accord dans le contexte mentionné. Un refus ou une contrainte ne doit pas être transformé en consentement.'],
['Le mahr','Le Coran 4:4 ordonne de remettre aux femmes leur dot. Il s’agit donc d’un élément qui leur est destiné, et non d’un paiement remis à leur famille à leur place.'],
['Une relation de tranquillité et de miséricorde','Le Coran 30:21 présente parmi les signes d’Allah la création des époux, la tranquillité recherchée auprès de l’autre, ainsi que l’affection et la miséricorde entre eux.'],
['Se comporter convenablement','Le Coran 4:19 interdit notamment d’hériter des femmes contre leur gré et demande de se comporter convenablement envers elles.'],
['Questions à réfléchir avant de s’engager','Comment parlons-nous de la foi, de l’argent, du travail, de la famille, des enfants, des responsabilités et des désaccords ? Puis-je exprimer un désaccord ou un refus librement ? Ces questions sont proposées comme réflexion personnelle, pas comme critères automatiques de validité religieuse.']
],
sources:[['Coran 4:4 — mahr','https://quran.com/fr/4/4'],['Coran 30:21 — affection et miséricorde','https://quran.com/fr/les-romains/21'],['Coran 4:19 — vie commune','https://quran.com/fr/les-femmes/19'],['Sahih Muslim 1421b — consentement','https://sunnah.com/muslim/16/79']]},
{id:'life-mother',cat:'life',title:'Grossesse, maternité & post-partum',sub:'Des contenus distincts du suivi médical',status:'prep'},
{id:'life-menopause',cat:'life',title:'Ménopause & nouvelle étape',sub:'Cycle · pratique · spiritualité',status:'prep'},
{id:'women-khadija',cat:'women',title:'Khadîja',sub:'Présence, confiance et soutien aux débuts de la révélation',status:'verified',
summary:'Le récit du début de la révélation place Khadîja au cœur de ce moment : le Prophète revient auprès d’elle bouleversé, elle le rassure puis l’accompagne chez Waraqa ibn Nawfal.',
sections:[
['Au début de la révélation','Sahih al-Bukhari 3 rapporte le retour du Prophète auprès de Khadîja après l’expérience dans la grotte de Hirâ. Elle le rassure en rappelant plusieurs qualités de son comportement, puis l’accompagne chez son cousin Waraqa.'],
['Une mémoire durable','Des récits de ‘Â’isha rapportent que le Prophète mentionnait souvent Khadîja. Sahih al-Bukhari 3817 rapporte également l’annonce qui lui est faite d’une demeure au Paradis.'],
['Ce que la source permet de retenir','Ces récits documentent sa présence et son soutien dans un moment fondateur. Cette fiche évite d’ajouter des détails biographiques populaires qui ne sont pas établis par les références affichées.']
],
sources:[['Sahih al-Bukhari 3','https://sunnah.com/bukhari:3'],['Sahih al-Bukhari 3817','https://sunnah.com/bukhari:3817'],['Sahih al-Bukhari 3818','https://sunnah.com/bukhari:3818']]},
{id:'women-aisha',cat:'women',title:'‘Â’isha',sub:'Transmission, questions et enseignement',status:'verified',
summary:'De nombreux récits religieux nous sont transmis par ‘Â’isha. Les sources la montrent aussi répondant directement à des questions de pratique.',
sections:[
['Transmettre','Le récit du commencement de la révélation dans Sahih al-Bukhari 3 est transmis par ‘Â’isha. De nombreux autres récits des recueils canoniques portent également sa transmission.'],
['Répondre aux questions','Dans Sahih Muslim 335c, Mu‘âdha interroge ‘Â’isha sur la différence entre le rattrapage du jeûne et celui de la prière pendant les menstruations. ‘Â’isha répond en se référant à la pratique vécue à l’époque du Prophète.'],
['Pourquoi ce portrait est utile','Son exemple permet de montrer une femme présente dans la transmission et l’explication du savoir religieux, sans transformer son histoire en récit idéalisé ou inventé.']
],
sources:[['Sahih al-Bukhari 3','https://sunnah.com/bukhari:3'],['Sahih Muslim 335c','https://sunnah.com/muslim/3/85']]},
{id:'women-maryam',cat:'women',title:'Maryam',sub:'Une femme nommée et honorée dans le Coran',status:'verified',
summary:'Maryam occupe une place singulière dans le Coran. En 3:42, les anges lui annoncent qu’Allah l’a choisie et purifiée.',
sections:[
['Ce que dit le texte','Le Coran 3:42 rapporte l’annonce des anges à Maryam : Allah l’a choisie, purifiée et distinguée parmi les femmes.'],
['Son récit','Les passages qui suivent racontent l’annonce concernant ‘Îsâ. La sourate 19, qui porte le nom de Maryam, développe également son récit.'],
['Ce que je peux méditer','Cette fiche ne cherche pas à inventer des détails biographiques. Elle part des textes eux-mêmes : foi, épreuve, confiance et place donnée à Maryam dans le récit coranique.']
],
sources:[['Coran 3:42','https://quran.com/3/42'],['Sourate Maryam (19)','https://quran.com/fr/maryam']]}
];
let faithCategory='all';
function faithFavs(){state.profile=state.profile||{};state.profile.faithFavorites=Array.isArray(state.profile.faithFavorites)?state.profile.faithFavorites:[];return state.profile.faithFavorites}
function renderFaithArticles(categorySet=null){
const root=document.getElementById('faithArticleList');if(!root)return;
const q=(document.getElementById('faithSearch')?.value||'').trim().toLowerCase();
const items=FAITH_ARTICLES.filter(a=>(categorySet?categorySet.includes(a.cat):(faithCategory==='all'||a.cat===faithCategory))&&(!q||`${a.title} ${a.sub} ${a.summary||''}`.toLowerCase().includes(q)));
const count=document.getElementById('faithResultsCount');if(count)count.textContent=`${items.length} ${items.length>1?'fiches':'fiche'}`;
root.innerHTML=items.length?items.map(a=>`<button class="faith-row" data-faith-id="${a.id}"><span class="faith-row-copy"><strong>${escapeHtml(a.title)}</strong><small>${escapeHtml(a.sub)}</small></span><span class="faith-row-meta"><span class="faith-status ${a.status==='verified'?'faith-verified':''}">${a.status==='verified'?'✓ Sourcée':'En préparation'}</span><span class="faith-row-arrow" aria-hidden="true">›</span></span></button>`).join(''):`<div class="learn-empty"><strong>Aucune fiche trouvée</strong><span>Essaie un autre mot ou choisis un thème ci-dessus.</span></div>`;
}
function openFaithArticle(id){
const a=FAITH_ARTICLES.find(x=>x.id===id);if(!a)return;
const fav=faithFavs().includes(id);
if(a.status!=='verified'){
openModal(a.title,`<div class="faith-reader"><div class="faith-status" style="display:inline-block;margin-bottom:10px">🕊️ Contenu en préparation</div><p><strong>${escapeHtml(a.sub)}</strong></p><p>Cette fiche n’est pas encore publiée comme contenu religieux. Elle sera rédigée après vérification de ses références et, lorsqu’il existe plusieurs avis reconnus, ceux-ci seront présentés clairement.</p></div>`);
return;
}
const sections=(a.sections||[]).map(s=>`<section class="faith-reader-section"><h4>${escapeHtml(s[0])}</h4><p>${escapeHtml(s[1])}</p></section>`).join('');
const sources=(a.sources||[]).map(s=>`<a class="faith-source" href="${s[1]}" target="_blank" rel="noopener noreferrer">${escapeHtml(s[0])} ↗</a>`).join('');
openModal(a.title,`<article class="faith-reader"><div class="faith-status faith-verified" style="display:inline-block">✓ Sources vérifiées</div><p class="faith-summary">${escapeHtml(a.summary||'')}</p>${sections}<section class="faith-reader-section"><h4>Sources & références</h4><div class="faith-sources">${sources}</div><small>Révision éditoriale : septembre 2026</small></section><div class="modal-actions"><button class="primary" id="faithFavToggle">${fav?'Retirer de mes lectures':'♡ Garder dans mes lectures'}</button></div></article>`);
document.getElementById('faithFavToggle').onclick=()=>{const f=faithFavs(),i=f.indexOf(id);if(i>=0)f.splice(i,1);else f.push(id);saveState();closeModal();toast(i>=0?'Lecture retirée':'Lecture gardée')};
}
document.getElementById('faithArticleList')?.addEventListener('click',e=>{const b=e.target.closest('[data-faith-id]');if(b)openFaithArticle(b.dataset.faithId)});
document.getElementById('faithSearch')?.addEventListener('input',()=>{faithCategory='all';document.querySelectorAll('[data-faith-category]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});renderFaithArticles()});
document.querySelectorAll('[data-faith-category]').forEach(b=>b.addEventListener('click',()=>{faithCategory=b.dataset.faithCategory;document.querySelectorAll('[data-faith-category]').forEach(x=>{const selected=x===b;x.classList.toggle('active',selected);x.setAttribute('aria-pressed',String(selected))});renderFaithArticles()}));
document.getElementById('faithFavoritesBtn')?.addEventListener('click',()=>{const fav=faithFavs();const items=FAITH_ARTICLES.filter(a=>fav.includes(a.id));openModal('Mes lectures',items.length?items.map(a=>`<button class="faith-row" data-modal-faith="${a.id}"><span><strong>${escapeHtml(a.title)}</strong><small>${escapeHtml(a.sub)}</small></span><span>›</span></button>`).join(''):'<p class="subtle">Aucune lecture gardée pour le moment.</p>');document.getElementById('modalBody')?.addEventListener('click',e=>{const b=e.target.closest('[data-modal-faith]');if(b){closeModal();setTimeout(()=>openFaithArticle(b.dataset.modalFaith),0)}})});
document.getElementById('faithBooksBtn')?.addEventListener('click',openFaithBooks);
document.querySelectorAll('[data-faith-path]').forEach(b=>b.addEventListener('click',()=>openFaithPath(b.dataset.faithPath)));
document.getElementById('cycleLearnBtn')?.addEventListener('click',()=>openFaithPath('cycle'));
document.getElementById('faithMethodBtn')?.addEventListener('click',()=>openModal('Sources & méthodologie','<div class="faith-reader"><p>Les fiches marquées <strong>✓ Sourcée</strong> ont été rédigées à partir des références affichées dans la fiche. Les autres restent en préparation.</p><p>Lorsqu’une question comporte des divergences juridiques reconnues, la fiche doit les présenter explicitement avant d’être publiée.</p><p class="subtle">Jardin du Cœur est un outil de journal et d’information. Son calendrier et ses estimations ne déterminent pas à eux seuls un statut médical ou juridique religieux.</p></div>'));
renderFaithArticles();
let reflectionPeriod='week', reflectionCursor=new Date();
function startOfWeek(d){const x=new Date(d);const day=(x.getDay()+6)%7;x.setDate(x.getDate()-day);x.setHours(12,0,0,0);return x}
function reflectionKey(){
const d=new Date(reflectionCursor);
if(reflectionPeriod==='year') return `year:${d.getFullYear()}`;
if(reflectionPeriod==='month') return `month:${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
const s=startOfWeek(d);return `week:${keyFromDate(s)}`;
}
function renderReflection(){
const d=new Date(reflectionCursor), title=document.getElementById('reflectionTitle'), label=document.getElementById('reflectionPeriodLabel');
if(reflectionPeriod==='week'){const s=startOfWeek(d),e=new Date(s);e.setDate(e.getDate()+6);label.textContent=`${s.getDate()} – ${e.getDate()} ${new Intl.DateTimeFormat('fr-FR',{month:'long',year:'numeric'}).format(e)}`;title.textContent='Cette semaine…'}
else if(reflectionPeriod==='month'){label.textContent=new Intl.DateTimeFormat('fr-FR',{month:'long',year:'numeric'}).format(d).replace(/^./,c=>c.toUpperCase());title.textContent='Ce mois-ci…'}
else {label.textContent=String(d.getFullYear());title.textContent='Cette année…'}
const data=state.reflections[reflectionKey()]||{};
document.querySelectorAll('[data-period-field]').forEach(t=>t.value=data[t.dataset.periodField]||'');
}
document.getElementById('reflectionTabs').addEventListener('click',e=>{const b=e.target.closest('[data-period]');if(!b)return;reflectionPeriod=b.dataset.period;document.querySelectorAll('#reflectionTabs button').forEach(x=>{const selected=x===b;x.classList.toggle('active',selected);x.setAttribute('aria-selected',String(selected))});renderReflection()});
document.querySelectorAll('[data-period-field]').forEach(t=>t.addEventListener('input',()=>{const k=reflectionKey();if(!state.reflections[k])state.reflections[k]={};state.reflections[k][t.dataset.periodField]=t.value;saveState()}));
document.getElementById('periodPrev').onclick=()=>{if(reflectionPeriod==='week')reflectionCursor.setDate(reflectionCursor.getDate()-7);else if(reflectionPeriod==='month')reflectionCursor.setMonth(reflectionCursor.getMonth()-1);else reflectionCursor.setFullYear(reflectionCursor.getFullYear()-1);renderReflection()};
document.getElementById('periodNext').onclick=()=>{if(reflectionPeriod==='week')reflectionCursor.setDate(reflectionCursor.getDate()+7);else if(reflectionPeriod==='month')reflectionCursor.setMonth(reflectionCursor.getMonth()+1);else reflectionCursor.setFullYear(reflectionCursor.getFullYear()+1);renderReflection()};
function renderProfileName(){document.getElementById('profileDisplayName').textContent=state.profile.displayName||'Mon espace personnel'}
function listPanel(title,key,placeholder){
const arr=state.profile[key]||[];
openModal(title,`<div id="profileList">${arr.map((x,i)=>`<div class="list-editor-item"><input type="checkbox" data-check="${i}" ${x.done?'checked':''} aria-label="${x.done?'Réactiver':'Terminer'} : ${escapeHtml(x.text)}"><div class="grow">${escapeHtml(x.text)}</div><button data-del="${i}" aria-label="Supprimer ${escapeHtml(x.text)}">×</button></div>`).join('')||'<div class="empty-state">Rien ici pour le moment.</div>'}</div><div class="toolbar-row"><input id="newListItem" placeholder="${escapeHtml(placeholder)}"><button class="mini-btn primary-mini" id="addListItem">Ajouter</button></div>`);
document.getElementById('addListItem').onclick=()=>{const v=document.getElementById('newListItem').value.trim();if(!v)return;state.profile[key].push({id:uid(),text:v,done:false});saveState();renderHomeTodayDashboard();listPanel(title,key,placeholder)};
document.getElementById('profileList').onclick=e=>{const del=e.target.closest('[data-del]');if(del){state.profile[key].splice(Number(del.dataset.del),1);saveState();renderHomeTodayDashboard();listPanel(title,key,placeholder)}};
document.getElementById('profileList').onchange=e=>{if(e.target.matches('[data-check]')){state.profile[key][Number(e.target.dataset.check)].done=e.target.checked;saveState();renderHomeTodayDashboard()}};
}
function objectivesPanel(){
const arr=state.profile.objectives||[], active=arr.filter(o=>!o.done), completed=arr.filter(o=>o.done).sort((a,b)=>(b.completedAt||'').localeCompare(a.completedAt||''));
const row=o=>`<div class="list-editor-item objective-item"><input type="checkbox" data-objective-check="${escapeHtml(o.id)}" ${o.done?'checked':''} aria-label="${o.done?'Réactiver':'Terminer'} : ${escapeHtml(o.text)}"><div class="grow"><strong>${escapeHtml(o.text)}</strong><small>${o.done&&o.completedAt?'Terminé le '+new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'short',year:'numeric'}).format(dateFromKey(o.completedAt)):'En cours'}</small></div><button data-objective-del="${escapeHtml(o.id)}" aria-label="Supprimer ${escapeHtml(o.text)}">×</button></div>`;
openModal('Mes objectifs',`<p class="subtle">${active.length} objectif${active.length>1?'s':''} en cours · ${completed.length} terminé${completed.length>1?'s':''}</p><div id="objectiveList">${active.map(row).join('')||'<div class="empty-state"><strong>Aucun objectif en cours.</strong><br><span>Ajoute ci-dessous un objectif qui compte pour toi.</span></div>'}${completed.length?'<div class="objective-history-title">Terminés</div>'+completed.map(row).join(''):''}</div><div class="toolbar-row"><input id="newObjectiveItem" placeholder="Ajouter un objectif…"><button class="mini-btn primary-mini" id="addObjectiveItem">Ajouter</button></div>`);
document.getElementById('addObjectiveItem').onclick=()=>{const v=document.getElementById('newObjectiveItem').value.trim();if(!v)return;state.profile.objectives.push({id:uid(),text:v,done:false,createdAt:todayKey(),completedAt:null});saveState();renderHomeTodayDashboard();toast('Objectif ajouté');objectivesPanel()};
document.getElementById('newObjectiveItem').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();document.getElementById('addObjectiveItem').click()}});
document.getElementById('objectiveList').onchange=e=>{if(e.target.matches('[data-objective-check]')){const o=state.profile.objectives.find(x=>x.id===e.target.dataset.objectiveCheck);if(!o)return;o.done=e.target.checked;o.completedAt=o.done?todayKey():null;saveState();renderHomeTodayDashboard();toast(o.done?'Objectif terminé':'Objectif réactivé');objectivesPanel()}};
document.getElementById('objectiveList').onclick=e=>{const b=e.target.closest('[data-objective-del]');if(!b)return;const i=state.profile.objectives.findIndex(x=>x.id===b.dataset.objectiveDel);if(i>=0&&confirm('Supprimer cet objectif ?')){state.profile.objectives.splice(i,1);saveState();renderHomeTodayDashboard();toast(o.done?'Objectif terminé':'Objectif réactivé');objectivesPanel()}};
}
function habitStats(habit){
const checkins=habit.checkins||{}; let streak=0; const d=new Date();
while(checkins[keyFromDate(d)]){streak++;d.setDate(d.getDate()-1)}
let last7=0; const cursor=new Date();
for(let i=0;i<7;i++){if(checkins[keyFromDate(cursor)])last7++;cursor.setDate(cursor.getDate()-1)}
return {streak,last7};
}
function habitsPanel(){
const arr=state.profile.habits||[], today=todayKey();
openModal('Mes habitudes',`<p class="subtle">Coche uniquement ce que tu as fait aujourd’hui. Le suivi est conservé jour après jour.</p><div id="habitList">${arr.map((h,i)=>{const st=habitStats(h);return `<div class="list-editor-item habit-item"><input type="checkbox" aria-label="Fait aujourd’hui : ${escapeHtml(h.text)}" data-habit-check="${i}" ${(h.checkins||{})[today]?'checked':''}><div class="grow"><strong>${escapeHtml(h.text)}</strong><small class="habit-stats">${st.streak} jour${st.streak>1?'s':''} de suite · ${st.last7}/7 derniers jours</small></div><button data-habit-del="${i}" aria-label="Supprimer ${escapeHtml(h.text)}">×</button></div>`}).join('')||'<div class="empty-state"><strong>Aucune habitude pour le moment.</strong><br><span>Commence par une habitude simple et réaliste.</span></div>'}</div><div class="toolbar-row"><input id="newHabitItem" placeholder="Ajouter une habitude…"><button class="mini-btn primary-mini" id="addHabitItem">Ajouter</button></div>`);
document.getElementById('addHabitItem').onclick=()=>{const v=document.getElementById('newHabitItem').value.trim();if(!v)return;state.profile.habits.push({id:uid(),text:v,checkins:{}});saveState();renderHomeTodayDashboard();toast('Habitude ajoutée');habitsPanel()};
document.getElementById('newHabitItem').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();document.getElementById('addHabitItem').click()}});
document.getElementById('habitList').onchange=e=>{if(e.target.matches('[data-habit-check]')){const h=state.profile.habits[Number(e.target.dataset.habitCheck)];h.checkins=h.checkins||{};if(e.target.checked)h.checkins[today]=true;else delete h.checkins[today];saveState();renderHomeTodayDashboard();toast(e.target.checked?'Habitude cochée pour aujourd’hui':'Validation retirée');habitsPanel()}};
document.getElementById('habitList').onclick=e=>{const del=e.target.closest('[data-habit-del]');if(del&&confirm('Supprimer cette habitude et son historique ?')){state.profile.habits.splice(Number(del.dataset.habitDel),1);saveState();renderHomeTodayDashboard();toast(e.target.checked?'Habitude cochée pour aujourd’hui':'Validation retirée');habitsPanel()}};
}
function progressSnapshot(daysCount=7){
const end=new Date(), start=new Date(); start.setDate(end.getDate()-daysCount+1);
const keys=[]; for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1))keys.push(keyFromDate(d));
const journalDays=keys.filter(k=>hasStartedDay(state.days[k])).length;
const habits=state.profile.habits||[];
let habitChecks=0; habits.forEach(h=>keys.forEach(k=>{if((h.checkins||{})[k])habitChecks++}));
const habitPossible=habits.length*keys.length;
const objectives=state.profile.objectives||[], completed=objectives.filter(o=>o.done).length;
return {daysCount,journalDays,habitChecks,habitPossible,habitRate:habitPossible?Math.round(habitChecks/habitPossible*100):0,objectives:objectives.length,completed,active:objectives.length-completed};
}
function progressSnapshotRange(daysCount=7, offsetDays=0){
const end=new Date(); end.setDate(end.getDate()-offsetDays); const start=new Date(end); start.setDate(end.getDate()-daysCount+1);
const keys=[]; for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1))keys.push(keyFromDate(d));
const journalDays=keys.filter(k=>hasStartedDay(state.days[k])).length;
const habits=state.profile.habits||[]; let habitChecks=0; habits.forEach(h=>keys.forEach(k=>{if((h.checkins||{})[k])habitChecks++}));
const habitPossible=habits.length*keys.length;
return {journalDays,habitChecks,habitPossible,habitRate:habitPossible?Math.round(habitChecks/habitPossible*100):0};
}
function trendLabel(current,previous,suffix=''){
const delta=current-previous; if(delta===0)return `Stable par rapport aux 7 jours précédents`;
return `${delta>0?'↑':'↓'} ${Math.abs(delta)}${suffix} par rapport aux 7 jours précédents`;
}
function progressPanel(){
const week=progressSnapshot(7), previousWeek=progressSnapshotRange(7,7), month=progressSnapshot(30);
const pct=(n,d)=>d?Math.round(n/d*100):0;
const metric=(label,value,detail,percent,trend='')=>`<div class="progress-metric"><div class="progress-metric-head"><strong>${label}</strong><span>${value}</span></div><div class="progress-track" aria-hidden="true"><i style="width:${Math.max(0,Math.min(100,percent))}%"></i></div><small>${detail}</small>${trend?`<small class="progress-trend">${trend}</small>`:''}</div>`;
const journalTrend=trendLabel(week.journalDays,previousWeek.journalDays);
const habitTrend=week.habitPossible&&previousWeek.habitPossible?trendLabel(week.habitRate,previousWeek.habitRate,' pts'):'';
openModal('Ma progression',`<p class="subtle">Un aperçu simple de ta régularité, sans score global ni classement.</p><div class="progress-period-title">7 derniers jours</div>${metric('Journal',week.journalDays+'/7',week.journalDays+' jour'+(week.journalDays>1?'s':'')+' commencé'+(week.journalDays>1?'s':''),pct(week.journalDays,7),journalTrend)}${metric('Habitudes',week.habitPossible?week.habitRate+' %':'—',week.habitPossible?week.habitChecks+' validations sur '+week.habitPossible:'Aucune habitude à suivre',week.habitRate,habitTrend)}<div class="progress-period-title">30 derniers jours</div>${metric('Journal',month.journalDays+'/30',month.journalDays+' jour'+(month.journalDays>1?'s':'')+' commencé'+(month.journalDays>1?'s':''),pct(month.journalDays,30))}${metric('Habitudes',month.habitPossible?month.habitRate+' %':'—',month.habitPossible?month.habitChecks+' validations sur '+month.habitPossible:'Aucune habitude à suivre',month.habitRate)}<div class="progress-objectives"><strong>Objectifs</strong><span>${month.active} en cours · ${month.completed} terminé${month.completed>1?'s':''}</span></div><div class="progress-actions"><button class="mini-btn" data-progress-go="journal">Ouvrir le journal</button><button class="mini-btn" data-progress-go="habits">Mes habitudes</button><button class="mini-btn" data-progress-go="objectives">Mes objectifs</button></div><p class="subtle progress-note">Ces tendances comparent uniquement tes données locales récentes. Elles ne constituent ni un score ni une évaluation.</p>`);
document.querySelector('.modal [data-progress-go="journal"]')?.addEventListener('click',()=>{closeModal();selectedDate=todayKey();renderSelectedDay();go(2)});
document.querySelector('.modal [data-progress-go="habits"]')?.addEventListener('click',()=>habitsPanel());
document.querySelector('.modal [data-progress-go="objectives"]')?.addEventListener('click',()=>objectivesPanel());
}
function openProfilePanel(name){
if(name==='progress') return progressPanel();
if(name==='objectives') return objectivesPanel();
if(name==='habits') return habitsPanel();
if(name==='garden') return listPanel('Mon jardin','garden','Ce que je veux cultiver…');
if(name==='notes'){
openModal('Mes notes',`<textarea id="profileNotes" style="min-height:220px" placeholder="Écris librement…">${escapeHtml(state.profile.notes||'')}</textarea><div class="modal-actions"><button class="primary" id="saveProfileNotes">Enregistrer</button></div>`);
document.getElementById('saveProfileNotes').onclick=()=>{state.profile.notes=document.getElementById('profileNotes').value;saveState();closeModal();toast('Notes enregistrées')};return;
}
if(name==='appearance'){
openModal('Thème et apparence',`<label>Thème</label><select id="themeSelect"><option value="light">Clair</option><option value="dark" ${state.profile.theme==='dark'?'selected':''}>Sombre</option></select><div class="modal-actions"><button class="primary" id="saveTheme">Appliquer</button></div>`);
document.getElementById('saveTheme').onclick=()=>{state.profile.theme=document.getElementById('themeSelect').value;saveState();applyTheme();closeModal()};return;
}
if(name==='privacy') return openModal('Confidentialité',`<p style="font-size:11px;line-height:1.6">Les données de cette version sont enregistrées localement dans le navigateur de cet appareil. Elles ne sont pas synchronisées vers un compte distant.</p><p class="subtle">Pense à exporter une sauvegarde avant d’effacer les données du navigateur ou de changer d’appareil.</p>`);
if(name==='install') {
if(deferredInstallPrompt){deferredInstallPrompt.prompt();deferredInstallPrompt.userChoice.finally(()=>{deferredInstallPrompt=null;closeModal()});return;}
const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
const help=isIOS?'Sur iPhone/iPad : ouvre le menu Partager de Safari puis choisis « Sur l’écran d’accueil ».':'Si aucun bouton d’installation n’apparaît, ouvre le menu de ton navigateur puis choisis « Installer l’application » ou « Ajouter à l’écran d’accueil ».';
return openModal('Installer Jardin du Cœur',`<p style="font-size:11px;line-height:1.6">${help}</p><p class="subtle">L’installation fonctionne lorsque l’application est servie en HTTPS, par exemple via GitHub Pages.</p>`);
}
if(name==='backup'){
const hasRecovery=Boolean(safeStorageGet(RECOVERY_KEY));
openModal('Sauvegarde / Export',`<p class="subtle">Exporte une copie JSON de toutes tes données ou restaure une sauvegarde. Avant tout import, une copie de récupération des données actuelles est conservée sur cet appareil jusqu’au prochain import ou effacement volontaire.</p><div class="toolbar-row"><button class="mini-btn primary-mini" id="exportDataBtn">Exporter</button><button class="mini-btn" id="importDataBtn">Importer</button></div>${hasRecovery?'<button class="mini-btn" style="width:100%;margin-top:8px" id="restoreRecoveryBtn">Restaurer la copie de récupération</button>':''}<button class="mini-btn danger-btn" style="width:100%;margin-top:8px" id="clearDataBtn">Effacer toutes mes données</button>`);
document.getElementById('exportDataBtn').onclick=exportData;
document.getElementById('importDataBtn').onclick=()=>document.getElementById('importFile').click();
document.getElementById('restoreRecoveryBtn')?.addEventListener('click',restoreRecoveryData);
document.getElementById('clearDataBtn').onclick=()=>{if(confirm('Effacer définitivement toutes les données locales de Jardin du Cœur sur cet appareil ?')){safeStorageRemove(STORAGE_KEY);safeStorageRemove(RECOVERY_KEY);safeStorageRemove(UI_SESSION_KEY);location.reload()}};return;
}
if(name==='about') return openModal('À propos',`<p style="font-size:11px;line-height:1.6"><strong>Jardin du Cœur</strong><br>Version ${APP_VERSION} PWA · build ${BUILD_VERSION}</p><p class="subtle">Journal personnel, local-first. Les contenus religieux détaillés doivent être vérifiés et sourcés avant publication.</p>`);
}
document.querySelectorAll('[data-profile-panel]').forEach(r=>r.addEventListener('click',()=>openProfilePanel(r.dataset.profilePanel)));
function openProfileNameEditor(){
openModal('Mon profil',`<label for="displayNameInput">Nom affiché dans mon espace</label><input id="displayNameInput" value="${escapeHtml(state.profile.displayName||'')}" placeholder="Mon espace personnel"><p class="subtle">Ce nom reste enregistré localement sur cet appareil.</p><div class="modal-actions"><button class="primary" id="saveDisplayName">Enregistrer</button></div>`);
document.getElementById('saveDisplayName').onclick=()=>{state.profile.displayName=document.getElementById('displayNameInput').value.trim();saveState();renderProfileName();closeModal()};
}
document.getElementById('profileSettingsBtn').onclick=openProfileNameEditor;
document.getElementById('profileNameBtn')?.addEventListener('click',openProfileNameEditor);
function applyTheme(){const dark=state.profile.theme==='dark';document.documentElement.classList.toggle('theme-dark',dark);const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',dark?'#111916':'#174f45')}
function exportData(){
const payload={app:'Jardin du Cœur',appVersion:APP_VERSION,build:BUILD_VERSION,schemaVersion:DATA_SCHEMA_VERSION,exportedAt:new Date().toISOString(),data:state};
const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`jardin-du-coeur-sauvegarde-${todayKey()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('Sauvegarde exportée');
}
function normalizeImportedState(incoming){
if(!incoming || typeof incoming!=='object' || Array.isArray(incoming)) throw new Error('format');
if(!incoming.days || typeof incoming.days!=='object' || Array.isArray(incoming.days)) throw new Error('days');
return normalizeState({days:incoming.days,duas:incoming.duas,cycles:incoming.cycles,reflections:incoming.reflections,profile:incoming.profile});
}
function saveRecoverySnapshot(){
const current=safeStorageGet(STORAGE_KEY);
if(current && !safeStorageSet(RECOVERY_KEY,current)) throw new Error('recovery');
}
function restoreRecoveryData(){
const raw=safeStorageGet(RECOVERY_KEY);
if(!raw){toast('Aucune copie de récupération disponible');return}
try{
const recovered=normalizeImportedState(JSON.parse(raw));
if(!confirm('Restaurer la copie de récupération et remplacer les données actuelles ?'))return;
if(!safeStorageSet(STORAGE_KEY,JSON.stringify(recovered))) throw new Error('storage');
safeStorageRemove(UI_SESSION_KEY);
location.reload();
}catch(_err){toast('Copie de récupération invalide')}
}
document.getElementById('importFile').addEventListener('change',async e=>{
const f=e.target.files[0];if(!f)return;
try{
if(f.size>5*1024*1024) throw new Error('size');
const parsed=JSON.parse(await f.text());
if(parsed.schemaVersion&&parsed.schemaVersion>DATA_SCHEMA_VERSION) throw new Error('future-schema');
const incoming=normalizeImportedState(parsed.data||parsed);
if(!confirm('Remplacer les données actuelles par cette sauvegarde ?'))return;
saveRecoverySnapshot();
const serialized=JSON.stringify(incoming);
if(!safeStorageSet(STORAGE_KEY,serialized)) throw new Error('storage');
location.reload();
}catch(err){toast(err.message==='future-schema'?'Sauvegarde créée par une version plus récente':'Fichier de sauvegarde invalide')}
finally{e.target.value=''}
});
const originalGo=go;
go=function(n,btn){originalGo(n,btn);if(n===6)renderDuas();if(n===7)renderCycle();if(n===9)renderReflection();if(n===10)renderProfileName()};
function persistBeforeLeave(){
saveUiSession();
try{
const serialized=JSON.stringify(state);
safeStorageSet(STORAGE_KEY,serialized);
}catch(err){console.error('Jardin du Cœur — sauvegarde de sortie impossible',err)}
}
window.addEventListener('pagehide',persistBeforeLeave);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')persistBeforeLeave()});
function restoreLastActiveField(session){
if(!session?.lastActiveField)return;
const el=document.querySelector(`[data-field="${session.lastActiveField}"]`);
if(!el||el.disabled||el.readOnly||!el.closest('.screen.active'))return;
requestAnimationFrame(()=>{el.focus({preventScroll:true});el.scrollIntoView({block:'center',behavior:'auto'});});
}
let deferredInstallPrompt=null;
let refreshingFromServiceWorker=false;
function showUpdateReady(registration){
if(!registration.waiting)return;
openModal('Mise à jour disponible',`<p style="font-size:11px;line-height:1.6">Une nouvelle version de Jardin du Cœur est prête. Tes données locales sont conservées.</p><div class="modal-actions"><button class="primary" id="applyAppUpdate">Mettre à jour</button></div>`);
document.getElementById('applyAppUpdate').onclick=()=>registration.waiting.postMessage({type:'SKIP_WAITING'});
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e});
window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;toast('Jardin du Cœur est installé')});
window.addEventListener('offline',()=>toast('Mode hors ligne — tes données locales restent disponibles'));
window.addEventListener('online',()=>toast('Connexion rétablie'));
if('serviceWorker' in navigator){
navigator.serviceWorker.addEventListener('controllerchange',()=>{if(refreshingFromServiceWorker)return;refreshingFromServiceWorker=true;location.reload()});
window.addEventListener('load',async()=>{
try{
const registration=await navigator.serviceWorker.register('./sw.js');
if(registration.waiting)showUpdateReady(registration);
registration.addEventListener('updatefound',()=>{
const worker=registration.installing;if(!worker)return;
worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)showUpdateReady(registration)});
});
registration.update().catch(()=>{});
}catch(err){console.error('Service worker non enregistré',err)}
});
}
window.addEventListener('error',event=>{
console.error('Jardin du Cœur — erreur inattendue',event.error||event.message);
toast('Une erreur inattendue est survenue. Tes données locales sont conservées.');
});
window.addEventListener('unhandledrejection',event=>{
console.error('Jardin du Cœur — promesse rejetée',event.reason);
toast('Une opération n’a pas pu aboutir. Réessaie dans un instant.');
});
renderDuas();renderCycle();renderReflection();renderProfileName();applyTheme();renderHomeDaily();
const restoredUiSession=loadUiSession();
if(restoredUiSession){
selectedDate=restoredUiSession.selectedDate;
lastActiveField=restoredUiSession.lastActiveField||'';
journalEditMode=(selectedDate===todayKey());
calendarCursor=dateFromKey(selectedDate);
}
renderSelectedDay();
renderCalendar();
if(restoredUiSession && restoredUiSession.screen!==1) go(restoredUiSession.screen);
if(restoredUiSession) restoreLastActiveField(restoredUiSession);
