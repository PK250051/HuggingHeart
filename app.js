/* ===================================================
   HUGGINGHEART - 100% ACCURATE DATA & CHAT ENGINE
   =================================================== */

// Internal Girls Array - Maps to the Profile_ID in your CSV
const girls = [
    { id: "G001", name: "Neha Iyer", type: "B1_very_shy", img: "G001_luna.jpg", role: "Lead Engineer", age: 30, loc: "Mumbai", bio: "I build complex systems by day and ponder the stars by night." },
    { id: "G002", name: "Meera Gupta", type: "B2_shy", img: "G002_meera.jpg", role: "Marketing Lead", age: 26, loc: "Hyderabad", bio: "Fascinated by human behavior and soft voices." },
    { id: "G003", name: "Ananya Rai", type: "B3_soft", img: "G003_ananya.jpg", role: "Digital Artist", age: 21, loc: "Delhi", bio: "I see the world in high-contrast and vibrant colors." },
    { id: "G004", name: "Isha Verma", type: "B4_balanced", img: "G004_isha.jpg", role: "Data Scientist", age: 23, loc: "Pune", bio: "Searching for logical patterns in chaos." },
    { id: "G005", name: "Riya Kapoor", type: "B5_confident", img: "G005_riya.jpg", role: "Designer", age: 24, loc: "Chennai", bio: "Blending tech logic with modern visual style." },
    { id: "G006", name: "Sofia Verma", type: "B6_witty", img: "G006_sofia.jpg", role: "HR Executive", age: 20, loc: "Sydney", bio: "Helping people find their spark in a noisy world." },
    { id: "G007", name: "Olivia Singh", type: "B7_bold", img: "G007_olivia.jpg", role: "Strategic Analyst", age: 22, loc: "Toronto", bio: "Strategic in mind, poetic in heart." },
    { id: "G008", name: "Aarohi Gupta", type: "B8_daring", img: "G008_aarohi.jpg", role: "Content Writer", age: 30, loc: "Hyderabad", bio: "Old soul who finds peace in quiet libraries." },
    { id: "G009", name: "Emma Watson", type: "B9_gen_z", img: "G009_emma.jpg", role: "Operations Lead", age: 25, loc: "London", bio: "Organized leader with global vision." },
    { id: "G010", name: "Amelia Chen", type: "B10_wild", img: "G010_amelia.jpg", role: "Frontend Dev", age: 22, loc: "Singapore", bio: "Connecting the world through code and soul." }
];

let activeGirl = null;
let pqQuestions = [];  
let pqAnswers = [];    
let personalityData = []; 

/**
 * HIGH-ACCURACY STATE-MACHINE CSV PARSER
 * Specifically handles commas inside quotes to prevent data mismatch.
 */
function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentCell = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentCell.trim());
            currentCell = "";
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (currentCell !== "" || currentRow.length > 0) {
                currentRow.push(currentCell.trim());
                rows.push(currentRow);
                currentRow = [];
                currentCell = "";
            }
        } else {
            currentCell += char;
        }
    }
    if (currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
    }
    return rows;
}

/**
 * STARTUP: Load DBs and Grid
 */
async function init() {
    try {
        const [qRes, aRes] = await Promise.all([
            fetch('data/questions/PQ_40_Personal_Questions.csv').then(r => r.text()),
            fetch('data/questions/PQ_40_Personal_Answer.csv').then(r => r.text())
        ]);
        pqQuestions = parseCSV(qRes);
        pqAnswers = parseCSV(aRes);
        loadGrid();
    } catch (e) {
        console.error("Database Connection Failed:", e);
    }
}

/**
 * GRID RENDER: 0.8s Staggered Loading
 */
function loadGrid() {
    const grid = document.getElementById('gridContainer');
    if (!grid) return;
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
            // Entrance Animation
            setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 50);
        }, i * 800); 
    });
}

/**
 * MODAL: Profile View
 */
function openProfile(id) {
    activeGirl = girls.find(g => g.id === id);
    document.getElementById('mName').innerText = `${activeGirl.name}, ${activeGirl.age}`;
    document.getElementById('mBio').innerText = activeGirl.bio;
    document.getElementById('mImg').style.backgroundImage = `url('assets/images/girls/${activeGirl.img}')`;
    document.getElementById('mImg').style.backgroundSize = "cover";
    document.getElementById('pModal').style.display = 'flex';
}

function closeProfile() {
    document.getElementById('pModal').style.display = 'none';
}

/**
 * CHAT: Personality Loading & suggestions
 */
async function openChat() {
    closeProfile();
    document.getElementById('chatWidget').style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatAvatar').src = `assets/images/girls/${activeGirl.img}`;
    
    // Load character-specific file (B1-B10)
    const pRes = await fetch(`data/answers/type_${activeGirl.type}.csv`).then(r => r.text());
    personalityData = parseCSV(pRes);
    
    const win = document.getElementById('chatWindow');
    win.innerHTML = "";
    addMessage(`Hi! I'm ${activeGirl.name}. 😊`, 'bot');
}

/**
 * LIVE SUGGESTIONS: Scan PQ and Personality Files
 */
function updateSuggestions(val) {
    const area = document.getElementById('suggestArea');
    area.innerHTML = "";
    if (val.length < 2) return;

    const s = val.toLowerCase();
    
    // 1. Check Personal Questions Database
    const pqMatch = pqQuestions.filter(q => q[1] && q[1].toLowerCase().includes(s)).slice(0, 1);
    
    // 2. Check Personality Database
    const persMatch = personalityData.filter(p => p[0] && p[0].toLowerCase().includes(s)).slice(0, 1);

    [...pqMatch, ...persMatch].forEach(m => {
        const text = m[1] || m[0]; // Take either PQ Text or Pers Question
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

/**
 * ENGINE: Find matching answer from Column Headers
 */
function generateBotResponse(msg) {
    const clean = msg.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    let reply = "";

    // Search PQ Database
    const pq = pqQuestions.find(q => q[1] && q[1].toLowerCase().replace(/[^\w\s]/gi, '') === clean);
    if (pq) {
        const girlRow = pqAnswers.find(row => row[0] === activeGirl.id);
        const colIdx = pqAnswers[0].indexOf(pq[0]); // Finds PQ01, PQ02 column index
        if (girlRow && colIdx !== -1) reply = girlRow[colIdx];
    }

    // Search Personality Database (Shy/Bold/etc)
    if (!reply) {
        const pers = personalityData.find(p => p[0] && p[0].toLowerCase().replace(/[^\w\s]/gi, '') === clean);
        if (pers) reply = pers[1];
    }

    if (!reply) reply = "...I'm a bit shy. Could you ask me something else?";

    showTyping(true);
    setTimeout(() => {
        showTyping(false);
        addMessage(reply, 'bot');
    }, 1200);
}

function addMessage(text, side) {
    const win = document.getElementById('chatWindow');
    const m = document.createElement('div');
    m.className = `msg ${side}-msg`;
    m.innerText = text;
    win.appendChild(m);
    win.scrollTop = win.scrollHeight;
}

function showTyping(isTyping) {
    const win = document.getElementById('chatWindow');
    const existing = document.getElementById('typing-indicator');
    if (isTyping && !existing) {
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.style = "font-size: 0.75rem; color: #94a3b8; font-style: italic; margin-bottom: 5px;";
        div.innerText = `${activeGirl.name} is thinking...`;
        win.appendChild(div);
    } else if (!isTyping && existing) {
        existing.remove();
    }
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

function closeChat() {
    document.getElementById('chatWidget').style.display = 'none';
}

// Global Event Listeners
window.onload = () => {
    init();
    const ci = document.getElementById('chatInput');
    if (ci) {
        ci.addEventListener('input', (e) => updateSuggestions(e.target.value));
        ci.addEventListener('keypress', handleChatInput);
    }
};
