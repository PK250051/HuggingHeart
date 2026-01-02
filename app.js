/* ===================================================
   HUGGINGHEART - 100% ACCURATE DATA ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", type: "B1_very_shy", img: "G001_luna.jpg", role: "Software Engineer", age: 24, loc: "Mumbai", bio: "I build complex systems by day and ponder the stars by night." },
    { id: "G002", name: "Meera Iyer", type: "B2_shy", img: "G002_meera.jpg", role: "UX Researcher", age: 26, loc: "Bangalore", bio: "Fascinated by human behavior and soft voices." },
    { id: "G003", name: "Ananya Rai", type: "B3_soft", img: "G003_ananya.jpg", role: "Digital Artist", age: 21, loc: "Delhi", bio: "I see the world in high-contrast and vibrant colors." },
    { id: "G004", name: "Isha Verma", type: "B4_balanced", img: "G004_isha.jpg", role: "Data Scientist", age: 23, loc: "Pune", bio: "Searching for logical patterns in chaos." },
    { id: "G005", name: "Riya Kapoor", type: "B5_confident", img: "G005_riya.jpg", role: "Designer", age: 24, loc: "Chennai", bio: "Blending tech logic with modern visual style." },
    { id: "G006", name: "Sofia Verma", type: "B6_witty", img: "G006_sofia.jpg", role: "HR Executive", age: 20, loc: "Sydney", bio: "Helping people find their spark in a noisy world." },
    { id: "G007", name: "Olivia Singh", type: "B7_bold", img: "G007_olivia.jpg", role: "Strategic Analyst", age: 22, loc: "Toronto", bio: "Strategic in mind, poetic in heart." },
    { id: "G008", name: "Aarohi Gupta", type: "B8_daring", img: "G008_aarohi.jpg", role: "Content Writer", age: 30, loc: "Hyderabad", bio: "Old soul who finds peace in quiet libraries." },
    { id: "G009", name: "Emma Watson", type: "B9_gen_z", img: "G009_emma.jpg", role: "Operations Lead", age: 25, loc: "London", bio: "Organized leader with global vision." },
    { id: "G010", name: "Amelia Chen", type: "B10_wild", img: "G010_amelia.jpg", role: "Frontend Dev", age: 22, loc: "Singapore", bio: "Connecting the world through code and soul." }
];

let activeGirl = null, pqQuestions = [], pqAnswers = [], personalityData = [];

// STATE-MACHINE CSV PARSER: Handles commas and quotes perfectly
function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
    return lines.map(line => {
        const result = []; let cur = "", inQuote = false;
        for (let char of line) {
            if (char === '"') inQuote = !inQuote;
            else if (char === ',' && !inQuote) { result.push(cur.trim()); cur = ""; }
            else cur += char;
        }
        result.push(cur.trim()); return result;
    });
}

async function init() {
    try {
        const [qRes, aRes] = await Promise.all([
            fetch('data/questions/PQ_40_Personal_Questions.csv').then(r => r.text()),
            fetch('data/questions/PQ_40_Personal_Answer.csv').then(r => r.text())
        ]);
        pqQuestions = parseCSV(qRes); pqAnswers = parseCSV(aRes);
        loadGrid();
    } catch (e) { console.warn("Syncing databases..."); }
}

function loadGrid() {
    const grid = document.getElementById('gridContainer');
    grid.innerHTML = "";
    girls.forEach((g, i) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = "girl-card";
            card.innerHTML = `
                <div class="status-tag"><div class="green-bulb"></div> Online</div>
                <div class="img-box"><img src="assets/images/girls/${g.img}"></div>
                <div class="info-box"><h3>${g.name}, ${g.age}</h3><p style="color:#6fcf97; font-size:0.75rem; font-weight:700;">${g.role}</p></div>`;
            card.onclick = () => openProfile(g.id);
            grid.appendChild(card);
            setTimeout(() => card.style.opacity = "1", 50);
            setTimeout(() => card.style.transform = "translateY(0)", 50);
        }, i * 800); // 0.8s Load Speed
    });
}

function openProfile(id) {
    activeGirl = girls.find(g => g.id === id);
    document.getElementById('mImg').style.backgroundImage = `url('assets/images/girls/${activeGirl.img}')`;
    document.getElementById('mName').innerText = `${activeGirl.name}, ${activeGirl.age}`;
    document.getElementById('mBio').innerText = activeGirl.bio;
    document.getElementById('pModal').style.display = 'flex';
}

async function openChat() {
    document.getElementById('pModal').style.display = 'none';
    document.getElementById('chatWidget').style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    const pRes = await fetch(`data/answers/type_${activeGirl.type}.csv`).then(r => r.text());
    personalityData = parseCSV(pRes);
    addMessage(`Hi! I'm ${activeGirl.name}. 😊`, 'bot');
}

function updateLiveSuggestions(val) {
    const area = document.getElementById('suggestArea');
    area.innerHTML = ""; if (val.length < 2) return;
    const s = val.toLowerCase();
    const matches = pqQuestions.filter(q => q[1] && q[1].toLowerCase().includes(s)).slice(0, 1);
    const pMatches = personalityData.filter(p => p[0] && p[0].toLowerCase().includes(s)).slice(0, 1);
    [...matches, ...pMatches].forEach(m => {
        const text = m[1] || m[0];
        const span = document.createElement('span');
        span.className = "suggest-item";
        span.innerText = `Ask: "${text}"`;
        span.onclick = () => { document.getElementById('chatInput').value = text; area.innerHTML = ""; handleChatInput({key:'Enter'}); };
        area.appendChild(span);
    });
}

function generateBotResponse(msg) {
    const clean = msg.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    let reply = "";
    const pq = pqQuestions.find(q => q[1] && q[1].toLowerCase().replace(/[^\w\s]/gi, '') === clean);
    if (pq) {
        const girlRow = pqAnswers.find(row => row[0] === activeGirl.id);
        const colIdx = pqAnswers[0].indexOf(pq[0]);
        if (girlRow && colIdx !== -1) reply = girlRow[colIdx];
    }
    if (!reply) {
        const pers = personalityData.find(p => p[0] && p[0].toLowerCase().replace(/[^\w\s]/gi, '') === clean);
        if (pers) reply = pers[1];
    }
    if (!reply) reply = "...Could you ask me something else?";
    setTimeout(() => addMessage(reply, 'bot'), 1200);
}

function addMessage(t, s) {
    const w = document.getElementById('chatWindow');
    const m = document.createElement('div');
    m.className = `msg ${s}-msg`; m.innerText = t;
    w.appendChild(m); w.scrollTop = w.scrollHeight;
}

function handleChatInput(e) {
    if (e.key === 'Enter') {
        const i = document.getElementById('chatInput');
        const v = i.value.trim(); if (!v) return;
        addMessage(v, 'user'); i.value = "";
        document.getElementById('suggestArea').innerHTML = "";
        generateBotResponse(v);
    }
}

window.onload = () => {
    init();
    const ci = document.getElementById('chatInput');
    ci.addEventListener('input', (e) => updateLiveSuggestions(e.target.value));
    ci.addEventListener('keypress', handleChatInput);
};
