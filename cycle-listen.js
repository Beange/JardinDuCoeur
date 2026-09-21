/* V273 — espace Écouter de Mon cycle. */
function listenFaithReminder(){
const list=FAITH_ARTICLES.filter(a=>a.status==='verified');if(!list.length)return toast('Aucun rappel disponible');
const seed=[...todayKey()].reduce((n,c)=>n+c.charCodeAt(0),0),a=list[seed%list.length];
if(!('speechSynthesis'in window))return toast('Lecture vocale indisponible');
const speak=()=>{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(`${a.title}. ${a.summary}`);u.lang='fr-FR';u.rate=.9;speechSynthesis.speak(u)};speak();
openModal('Cours & rappel du jour',`<p><strong>${escapeHtml(a.title)}</strong></p><p class="subtle">${escapeHtml(a.summary)}</p><p class="subtle">Lecture vocale française produite par ton appareil. Consulte la fiche pour les explications et les sources.</p><div class="toolbar-row"><button class="mini-btn" id="stopFaithSpeech">Arrêter</button><button class="mini-btn" id="replayFaithSpeech">Réécouter</button><button class="mini-btn primary-mini" id="openFaithReminder">Lire la fiche</button></div>`);
document.getElementById('stopFaithSpeech').onclick=()=>speechSynthesis.cancel();document.getElementById('replayFaithSpeech').onclick=speak;document.getElementById('openFaithReminder').onclick=()=>{speechSynthesis.cancel();closeModal();go(8);setTimeout(()=>openFaithArticle(a.id),120)};
}
function openCycleListenHub(){
openModal('Écouter',`<p class="subtle">Choisis ce que tu souhaites écouter pendant cette période.</p><div class="faith-paths"><a class="faith-path" href="https://quran.com/fr" target="_blank" rel="noopener noreferrer"><span>🎧</span><span><strong>Récitations du Coran</strong><small>Ouvrir le lecteur Quran.com · connexion Internet requise</small></span><span aria-hidden="true">›</span></a><button class="faith-path" id="listenFaithReminder"><span>📚</span><span><strong>Cours & rappels</strong><small>Écouter un rappel vérifié de la bibliothèque</small></span><span aria-hidden="true">›</span></button></div>`);
document.getElementById('listenFaithReminder').onclick=()=>{window.speechSynthesis?.cancel();closeModal();setTimeout(listenFaithReminder,80)};
}
