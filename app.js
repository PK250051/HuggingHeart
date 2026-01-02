/* ===================================================
   HUGGINGHEART - 100% ACCURATE CSV ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", type: "B1_very_shy", img: "G001_luna.jpg", role: "Software Engineer", age: 24, loc: "Mumbai", pers: "Soft-spoken", motto: "Code is logic...", loveLanguage: "Intellectual", values: "Honesty", bio: "I build complex systems by day and ponder the stars by night." },
    // ... add other girls with correct IDs G002, G003 etc.
];

let activeGirl = null;
let pqQuestions = []; // Stores [ID, Text]
let pqAnswers = [];   // Stores [ProfileID, Name, PQ01, PQ02...]
let personalityData = []; // Stores [Question, Answer]

// Robust Parser: Correctly handles commas inside quotes
function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
    return lines.map(line => {
        const result = [];
        let cur = "", inQuote = false;
        for (let char of line) {
            if (char === '"') inQuote = !inQuote;
            else if (char === ',' && !inQuote) { result.push(cur.trim()); cur = ""; }
            else cur += char;
        }
        result.push(cur.trim());
        return result;
    });
}

async function initDatabases() {
    const [qRes, aRes] = await Promise.all([
        fetch('data/questions/PQ_40_Personal_Questions.csv').then(r => r.text()),
        fetch('data/questions/PQ_40_Personal_Answer.csv').then(r => r.text())
    ]);
    pqQuestions = parseCSV(qRes);
    pqAnswers = parseCSV(aRes);
    loadGrid();
}

function loadGrid() {
    const grid = document.getElementById('gridContainer');
    grid.innerHTML = girls.map(g => `
        <div class="girl-card" onclick="openProfile('${g.id}')">
            <div class="img-box">
                <div class="status-tag"><div class="green-bulb"></div> Online</div>
                <img src="assets/images/girls/${g.img}">
            </div>
            <div class="info-box">
                <p style="color:#6fcf97; font-weight:700; font-size:0.75rem; text-transform:uppercase;">${g.role}</p>
                <h3>${g.name}</h3>
                <span style="font-size:0.85rem; color:#6b7280;">Age: ${g.age}</span>
            </div>
        </div>
    `).join('');
}

function openProfile(id) {
    activeGirl = girls.find(g => g.id === id);
    document.getElementById('mName').innerText = activeGirl.name;
    document.getElementById('mBio').innerText = activeGirl.bio;
    document.getElementById('mImg').style.backgroundImage = `url('assets/images/girls/${activeGirl.img}')`;
    document.getElementById('mImg').style.backgroundSize = "cover";
    document.getElementById('pModal').style.display = 'flex';
}

async function openChat() {
    document.getElementById('pModal').style.display = 'none';
    document.getElementById('chatWidget').style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    
    // Secretly load Personality
    const pRes = await fetch(`data/answers/type_${activeGirl.type}.csv`).then(r => r.text());
    personalityData = parseCSV(pRes);
    
    addMessage(`Hi! I'm ${activeGirl.name}. 😊`, 'bot');
}

// LIVE SUGGESTION LOGIC
function updateSuggestions(input) {
    const val = input.toLowerCase();
    const suggestArea = document.getElementById('suggestArea');
    suggestArea.innerHTML = "";
    if (val.length < 2) return;

    // Search PQ
    const matches = pqQuestions.filter(q => q[1] && q[1].toLowerCase().includes(val)).slice(0, 2);
    // Search Personality
    const pMatches = personalityData.filter(p => p[0] && p[0].toLowerCase().includes(val)).slice(0, 2);

    [...matches, ...pMatches].forEach(m => {
        const text = m[1] || m[0];
        const span = document.createElement('span');
        span.className = "suggest-item";
        span.innerText = `Ask: "${text}"`;
        span.onclick = () => {
            document.getElementById('chatInput').value = text;
            suggestArea.innerHTML = "";
            handleChatInput({ key: 'Enter' });
        };
        suggestArea.appendChild(span);
    });
}

function generateBotResponse(userMsg) {
    const clean = userMsg.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    let reply = "";

    // 1. Check PQ
    const pq = pqQuestions.find(q => q[1] && q[1].toLowerCase().replace(/[^\w\s]/gi, '') === clean);
    if (pq) {
        const girlRow = pqAnswers.find(row => row[0] === activeGirl.id);
        const colIndex = pqAnswers[0].indexOf(pq[0]);
        if (girlRow && colIndex !== -1) reply = girlRow[colIndex];
    }

    // 2. Check Personality
    if (!reply) {
        const pers = personalityData.find(p => p[0] && p[0].toLowerCase().replace(/[^\w\s]/gi, '') === clean);
        if (pers) reply = pers[1];
    }

    if (!reply) reply = "I'm not sure... ask me something from my profile?";

    setTimeout(() => { addMessage(reply, 'bot'); }, 1000);
}

function addMessage(text, side) {
    const win = document.getElementById('chatWindow');
    const m = document.createElement('div');
    m.className = `msg ${side}-msg`;
    m.innerText = text;
    win.appendChild(m);
    win.scrollTop = win.scrollHeight;
}

function handleChatInput(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('chatInput');
        const val = input.value.trim();
        if (!val) return;
        addMessage(val, 'user');
        input.value = "";
        document.getElementById('suggestArea').innerHTML = "";
        generateBotResponse(val);
    }
}

window.onload = () => {
    initDatabases();
    const input = document.getElementById('chatInput');
    input.addEventListener('input', (e) => updateSuggestions(e.target.value));
    input.addEventListener('keypress', handleChatInput);
};
