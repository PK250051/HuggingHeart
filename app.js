/* ===================================================
   HUGGINGHEART - DUAL-DATABASE CHAT ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Neha Iyer", type: "B1_very_shy", img: "G001_luna.jpg", role: "Lead Engineer", age: 30, loc: "Mumbai", bio: "I build complex systems by day and ponder the stars by night." },
    { id: "G002", name: "Meera Gupta", type: "B2_shy", img: "G002_meera.jpg", role: "Marketing Lead", age: 26, loc: "Hyderabad", bio: "Fascinated by human behavior and soft voices." },
    // Add other girls here...
];

let activeGirl = null;
let pqQuestions = [];  
let pqAnswers = [];    
let personalityData = []; 

/**
 * ROBUST CSV PARSER
 * Handles commas and quotes so answers like "I'm fine, you?" don't break.
 */
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
    const [qRes, aRes] = await Promise.all([
        fetch('data/questions/PQ_40_Personal_Questions.csv').then(r => r.text()),
        fetch('data/questions/PQ_40_Personal_Answer.csv').then(r => r.text())
    ]);
    pqQuestions = parseCSV(qRes);
    pqAnswers = parseCSV(aRes);
    loadGrid();
}

/**
 * GRID LOADING (0.8s Staggered)
 */
function loadGrid() {
    const grid = document.getElementById('gridContainer');
    grid.innerHTML = "";
    girls.forEach((g, i) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = "girl-card";
            card.innerHTML = `
                <div class="img-box">
                    <div class="status-tag"><div class="green-bulb"></div> Online</div>
                    <img src="assets/images/girls/${g.img}">
                </div>
                <div class="info-box">
                    <p style="color:#6fcf97; font-weight:700; font-size:0.75rem;">${g.role}</p>
                    <h3>${g.name}</h3>
                    <span style="font-size:0.85rem; color:#6b7280;">Age: ${g.age}</span>
                </div>`;
            card.onclick = () => openProfile(g.id);
            grid.appendChild(card);
            setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 50);
        }, i * 800); 
    });
}

/**
 * LIVE SUGGESTIONS (PQ + Personality)
 */
function updateSuggestions(val) {
    const area = document.getElementById('suggestArea');
    area.innerHTML = "";
    if (val.length < 2) return;

    const searchTerm = val.toLowerCase();
    
    // 1. Search PQ Database
    const pqMatches = pqQuestions.filter(q => q[1] && q[1].toLowerCase().includes(searchTerm)).slice(0, 1);
    
    // 2. Search Personality Database (ex: shy, bold, wild)
    const persMatches = personalityData.filter(p => p[0] && p[0].toLowerCase().includes(searchTerm)).slice(0, 1);

    [...pqMatches, ...persMatches].forEach(match => {
        const text = match[1] || match[0];
        const span = document.createElement('span');
        span.className = "suggest-item";
        span.innerText = `Ask: "${text}"`;
        span.onclick = () => {
            document.getElementById('chatInput').value = text;
            area.innerHTML = "";
            handleChatInput({ key: 'Enter' });
        };
        area.appendChild(span);
    });
}

function generateBotResponse(msg) {
    const clean = msg.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    let reply = "";

    // Search PQ
    const pq = pqQuestions.find(q => q[1] && q[1].toLowerCase().replace(/[^\w\s]/gi, '') === clean);
    if (pq) {
        const girlRow = pqAnswers.find(row => row[0] === activeGirl.id);
        const colIdx = pqAnswers[0].indexOf(pq[0]);
        if (girlRow && colIdx !== -1) reply = girlRow[colIdx];
    }

    // Search Personality (B1-B10)
    if (!reply) {
        const pers = personalityData.find(p => p[0] && p[0].toLowerCase().replace(/[^\w\s]/gi, '') === clean);
        if (pers) reply = pers[1];
    }

    if (!reply) reply = "...I'm a bit shy. Could you ask me something else?";

    setTimeout(() => { addMessage(reply, 'bot'); }, 1000);
}

// ... Rest of functions (addMessage, openProfile, handleChatInput) ...

window.onload = () => {
    init();
    const ci = document.getElementById('chatInput');
    ci.addEventListener('input', (e) => updateSuggestions(e.target.value));
    ci.addEventListener('keypress', handleChatInput);
};
