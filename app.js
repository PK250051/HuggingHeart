/* ===================================================
   HUGGINGHEART - 100% ACCURATE DATA ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Neha Iyer", type: "B1_very_shy", img: "G001_luna.jpg", role: "Lead Engineer", age: 30, bio: "I build complex systems and ponder stars." },
    { id: "G002", name: "Meera Gupta", type: "B2_shy", img: "G002_meera.jpg", role: "Marketing Lead", age: 26, bio: "Fascinated by human behavior." },
    { id: "G003", name: "Ananya Rai", type: "B3_soft", img: "G003_ananya.jpg", role: "Digital Artist", age: 21, bio: "World in high-contrast." },
    { id: "G004", name: "Isha Verma", type: "B4_balanced", img: "G004_isha.jpg", role: "Data Scientist", age: 23, bio: "Patterns in chaos." },
    { id: "G005", name: "Riya Kapoor", type: "B5_confident", img: "G005_riya.jpg", role: "Designer", age: 24, bio: "Tech meets style." },
    { id: "G006", name: "Sofia Verma", type: "B6_witty", img: "G006_sofia.jpg", role: "HR Executive", age: 20, bio: "Helping hearts." },
    { id: "G007", name: "Olivia Singh", type: "B7_bold", img: "G007_olivia.jpg", role: "Strategic Analyst", age: 22, bio: "Strategic analyst." },
    { id: "G008", name: "Aarohi Gupta", type: "B8_daring", img: "G008_aarohi.jpg", role: "Content Writer", age: 30, bio: "Old soul." },
    { id: "G009", name: "Emma Watson", type: "B9_gen_z", img: "G009_emma.jpg", role: "Operations Lead", age: 25, bio: "Efficiency." },
    { id: "G010", name: "Amelia Chen", type: "B10_wild", img: "G010_amelia.jpg", role: "Frontend Dev", age: 22, bio: "Connecting world." }
];

let activeGirl = null;
let pqQuestions = [], pqAnswers = [], personalityData = [];

// Advanced State-Machine Parser (Handles commas inside quotes)
function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentCell = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) { currentRow.push(currentCell.trim()); currentCell = ""; }
        else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (currentCell || currentRow.length > 0) {
                currentRow.push(currentCell.trim());
                rows.push(currentRow);
                currentRow = [];
                currentCell = "";
            }
        } else currentCell += char;
    }
    if (currentRow.length > 0) { currentRow.push(currentCell.trim()); rows.push(currentRow); }
    return rows;
}

async function init() {
    try {
        const [qRes, aRes] = await Promise.all([
            fetch('PQ_40_Personal_Questions.csv').then(r => r.text()),
            fetch('PQ_40_Personal_Answer.csv').then(r => r.text())
        ]);
        pqQuestions = parseCSV(qRes);
        pqAnswers = parseCSV(aRes);
        loadGrid();
    } catch (e) { console.error("Database error:", e); }
}

function loadGrid() {
    const grid = document.getElementById('gridContainer');
    grid.innerHTML = "";
    girls.forEach((g, i) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = "girl-card";
            card.innerHTML = `
                <div class="img-box"><div class="status-tag"><div class="green-bulb"></div> Online</div><img src="assets/images/girls/${g.img}"></div>
                <div class="info-box"><h3>${g.name}, ${g.age}</h3><p style="color:#6fcf97; font-weight:700; font-size:0.75rem;">${g.role}</p></div>`;
            card.onclick = () => openProfile(g.id);
            grid.appendChild(card);
            setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 50);
        }, i * 800); // 0.8s Staggered Loading
    });
}

function openProfile(id) {
    activeGirl = girls.find(g => g.id === id);
    document.getElementById('mName').innerText = `${activeGirl.name}, ${activeGirl.age}`;
    document.getElementById('mBio').innerText = activeGirl.bio;
    document.getElementById('mImg').style.backgroundImage = `url('assets/images/girls/${activeGirl.img}')`;
    document.getElementById('pModal').style.display = 'flex';
}

async function openChat() {
    document.getElementById('pModal').style.display = 'none';
    document.getElementById('chatWidget').style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    const pRes = await fetch(`type_${activeGirl.type}.csv`).then(r => r.text());
    personalityData = parseCSV(pRes);
    addMessage(`Hi! I'm ${activeGirl.name}. 😊`, 'bot');
}

// LIVE TYPING SUGGESTIONS (Scans both files)
function updateSuggestions(val) {
    const sArea = document.getElementById('suggestArea');
    sArea.innerHTML = "";
    if (val.length < 2) return;
    const s = val.toLowerCase();
    
    // Check PQ Questions
    const pqMatch = pqQuestions.filter(q => q[1] && q[1].toLowerCase().includes(s)).slice(0, 1);
    // Check Personality Style Questions
    const persMatch = personalityData.filter(p => p[0] && p[0].toLowerCase().includes(s)).slice(0, 1);
    
    [...pqMatch, ...persMatch].forEach(m => {
        const text = m[1] || m[0];
        const span = document.createElement('span');
        span.className = "suggest-item";
        span.innerText = `Ask: "${text}"`;
        span.onclick = () => { document.getElementById('chatInput').value = text; sArea.innerHTML = ""; handleChatInput({key:'Enter'}); };
        sArea.appendChild(span);
    });
}

function generateBotResponse(msg) {
    const clean = msg.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    let reply = "";
    
    // 1. Check PQ Answers Accuracy
    const pq = pqQuestions.find(q => q[1] && q[1].toLowerCase().replace(/[^\w\s]/gi, '') === clean);
    if (pq) {
        const girlRow = pqAnswers.find(row => row[0] === activeGirl.id);
        const colIdx = pqAnswers[0].indexOf(pq[0]);
        if (girlRow && colIdx !== -1) reply = girlRow[colIdx];
    }
    
    // 2. Check Personality Style (B1-B10)
    if (!reply) {
        const pers = personalityData.find(p => p[0] && p[0].toLowerCase().replace(/[^\w\s]/gi, '') === clean);
        if (pers) reply = pers[1];
    }
    
    if (!reply) reply = "...I'm a bit shy. Could you ask me something else?";
    setTimeout(() => addMessage(reply, 'bot'), 1000);
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
    ci.addEventListener('input', (e) => updateSuggestions(e.target.value));
    ci.addEventListener('keypress', handleChatInput);
};
