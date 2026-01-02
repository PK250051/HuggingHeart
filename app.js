/* ===================================================
   HUGGINGHEART - 100% ACCURATE DATA ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", type: "B1_very_shy", img: "G001_luna.jpg", role: "Software Engineer", age: 24, bio: "I build systems and ponder the stars." },
    { id: "G002", name: "Meera Iyer", type: "B2_shy", img: "G002_meera.jpg", role: "UX Researcher", age: 26, bio: "Fascinated by human behavior." },
    { id: "G003", name: "Ananya Rai", type: "B3_soft", img: "G003_ananya.jpg", role: "Digital Artist", age: 21, bio: "World in high-contrast." },
    // ... add G004 to G010 following this pattern
];

let activeGirl = null;
let pqQuestions = [];
let pqAnswers = [];
let personalityData = [];

// Better CSV Parser
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
                <p style="color:#6fcf97; font-weight:700; font-size:0.75rem;">${g.role}</p>
                <h3>${g.name}</h3>
                <span style="font-size:0.85rem; color:#6b7280;">Age: ${g.age}</span>
            </div>
        </div>
    `).join('');
}

function openProfile(id) {
    activeGirl = girls.find(g => g.id === id);
    document.getElementById('mName').innerText = activeGirl.name;
    document.getElementById('mAge').innerText = activeGirl.age;
    document.getElementById('mBio').innerText = activeGirl.bio;
    document.getElementById('mImg').style.backgroundImage = `url('assets/images/girls/${activeGirl.img}')`;
    document.getElementById('mImg').style.backgroundSize = "cover";
    document.getElementById('pModal').style.display = 'flex';
}

function closeProfile() { document.getElementById('pModal').style.display = 'none'; }

async function openChat() {
    document.getElementById('pModal').style.display = 'none';
    document.getElementById('chatWidget').style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatAvatar').src = `assets/images/girls/${activeGirl.img}`;
    
    // Load Personality
    const pRes = await fetch(`data/answers/type_${activeGirl.type}.csv`).then(r => r.text());
    personalityData = parseCSV(pRes);
    
    addMessage(`Hi! I'm ${activeGirl.name}. 😊`, 'bot');
}

// ... include generateBotResponse, addMessage, and updateSuggestions from previous version

window.onload = () => {
    initDatabases();
    const ci = document.getElementById('chatInput');
    if(ci) {
        ci.addEventListener('input', (e) => updateSuggestions(e.target.value));
        ci.addEventListener('keypress', handleChatInput);
    }
};
