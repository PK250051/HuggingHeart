/* ===================================================
   HUGGINGHEART - HIDDEN PERSONALITY ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", type: "B1_very_shy", img: "G001_luna.jpg", role: "Software Engineer", age: 24, loc: "Mumbai", pers: "Soft-spoken", motto: "Code is logic, but life is art.", loveLanguage: "Intellectual Depth", values: "Honesty, Growth", bio: "I build complex systems by day and ponder the stars by night." },
    { id: "G002", name: "Meera Iyer", type: "B2_shy", img: "G002_meera.jpg", role: "UX Researcher", age: 26, loc: "Bangalore", pers: "Reserved", motto: "Empathy is the ultimate superpower.", loveLanguage: "Quality Time", values: "Kindness, Presence", bio: "Fascinated by the rhythm of human behavior." },
    { id: "G003", name: "Ananya Rai", type: "B3_soft", img: "G003_ananya.jpg", role: "Digital Artist", age: 21, loc: "Delhi", pers: "Creative Soul", motto: "Every pixel holds a silent story.", loveLanguage: "Words of Affirmation", values: "Expression", bio: "I see the world in high-contrast and vibrant colors." },
    { id: "G004", name: "Isha Verma", type: "B4_balanced", img: "G004_isha.jpg", role: "Data Scientist", age: 23, loc: "Pune", pers: "Analytical", motto: "Be a constant in a world of variables.", loveLanguage: "Acts of Service", values: "Precision", bio: "Searching for logical patterns in the beautiful chaos." },
    { id: "G005", name: "Riya Kapoor", type: "B5_confident", img: "G005_riya.jpg", role: "Designer", age: 24, loc: "Chennai", pers: "Modern & Bold", motto: "Simplicity is the ultimate sophistication.", loveLanguage: "Thoughtful Gifts", values: "Style", bio: "Blending tech logic with modern aesthetic design." },
    { id: "G006", name: "Sofia Verma", type: "B6_witty", img: "G006_sofia.jpg", role: "HR Executive", pers: "Witty Observer", age: 20, loc: "Sydney", motto: "Kindness is universal.", loveLanguage: "Presence", values: "Harmony", bio: "Helping people find their spark in a noisy world." },
    { id: "G007", name: "Olivia Singh", type: "B7_bold", img: "G007_olivia.jpg", role: "Strategic Analyst", age: 22, loc: "Toronto", pers: "Direct & Clear", motto: "Balance is a creation, not a discovery.", loveLanguage: "Stimulation", values: "Clarity", bio: "Strategic in mind, poetic in heart." },
    { id: "G008", name: "Aarohi Gupta", type: "B8_daring", img: "G008_aarohi.jpg", role: "Content Writer", age: 30, loc: "Hyderabad", pers: "Deep Thinker", motto: "We are all stories in the end.", loveLanguage: "Conversation", values: "Wisdom", bio: "Old soul who finds peace in quiet libraries." },
    { id: "G009", name: "Emma Watson", type: "B9_gen_z", img: "G009_emma.jpg", role: "Operations Lead", age: 25, loc: "London", pers: "Vibrant", motto: "Be effective, not just busy.", loveLanguage: "Shared Goals", values: "Action", bio: "Organized, focused, and always looking forward." },
    { id: "G010", name: "Amelia Chen", type: "B10_wild", img: "G010_amelia.jpg", role: "Frontend Dev", age: 22, loc: "Singapore", pers: "Wild & Free", motto: "The heart is bigger than the world.", loveLanguage: "Experiences", values: "Beauty", bio: "Building interfaces to connect a global soul." }
];

let activeGirl = null;
let pqQuestions = [];
let pqAnswers = [];
let personalityData = [];

// ROBUST CSV PARSER (Handles commas inside quotes correctly)
function parseCSV(text) {
    if (!text) return [];
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
    return lines.map(line => {
        const result = [];
        let cur = "";
        let inQuote = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') inQuote = !inQuote;
            else if (char === ',' && !inQuote) { result.push(cur.trim()); cur = ""; }
            else cur += char;
        }
        result.push(cur.trim());
        return result;
    });
}

// Pre-load PQ Databases
async function initDatabases() {
    try {
        const qRes = await fetch('data/questions/PQ_40_Personal_Questions.csv').then(r => r.text());
        const aRes = await fetch('data/questions/PQ_40_Personal_Answer.csv').then(r => r.text());
        pqQuestions = parseCSV(qRes);
        pqAnswers = parseCSV(aRes);
    } catch (e) { console.warn("Database files loading silently..."); }
}

function loadGrid() {
    const grid = document.getElementById('gridContainer');
    if (!grid) return;
    grid.innerHTML = "";
    girls.forEach((g, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'girl-card';
            card.onclick = () => { activeGirl = g; openProfile(g.id); };
            card.innerHTML = `
                <div class="img-box">
                    <span class="status-tag"><span class="green-bulb"></span> Online</span>
                    <img src="assets/images/girls/${g.img}">
                </div>
                <div class="info-box">
                    <p>${g.role}</p>
                    <h3>${g.name}</h3>
                </div>`;
            grid.appendChild(card);
        }, index * 200);
    });
}

function openProfile(id) {
    if(!activeGirl) return;
    document.getElementById('mName').innerText = activeGirl.name;
    document.getElementById('mRole').innerText = activeGirl.role;
    document.getElementById('mAge').innerText = activeGirl.age;
    document.getElementById('mLoc').innerText = activeGirl.loc;
    document.getElementById('mPers').innerText = activeGirl.pers;
    document.getElementById('mBio').innerText = activeGirl.bio;
    document.getElementById('mMotto').innerText = `"${activeGirl.motto}"`;
    document.getElementById('mLove').innerText = activeGirl.loveLanguage;
    document.getElementById('mValues').innerText = activeGirl.values;
    const mImg = document.getElementById('mImg');
    mImg.style.backgroundImage = `url('assets/images/girls/${activeGirl.img}')`;
    mImg.style.backgroundSize = "cover";
    mImg.style.backgroundPosition = "top";
    document.getElementById('pModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProfile() {
    document.getElementById('pModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

async function openChat() {
    closeProfile();
    const widget = document.getElementById('chatWidget');
    const windowDiv = document.getElementById('chatWindow');
    widget.style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatAvatar').src = `assets/images/girls/${activeGirl.img}`;
    windowDiv.innerHTML = "";

    // Hidden: Load character-specific personality file
    try {
        const pRes = await fetch(`data/answers/type_${activeGirl.type}.csv`).then(r => r.text());
        personalityData = parseCSV(pRes);
    } catch(e) { personalityData = []; }

    addMessage(`Hi! I'm ${activeGirl.name}. 😊`, 'bot');
    setTimeout(() => {
        showTyping(true);
        showSuggestions();
        setTimeout(() => {
            showTyping(false);
            addMessage(`I'm really glad we're talking. May I know your name?`, 'bot');
        }, 1500);
    }, 1000);
}

function generateBotResponse(userMsg) {
    const cleanMsg = userMsg.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    let botReply = "";

    // 1. Search PQ_40
    const pqMatch = pqQuestions.find(row => row[1] && row[1].toLowerCase().replace(/[^\w\s]/gi, '') === cleanMsg);
    if (pqMatch) {
        const qID = pqMatch[0];
        const girlRow = pqAnswers.find(row => row[0] === activeGirl.id);
        const qIndex = pqAnswers[0].indexOf(qID);
        if (girlRow && qIndex !== -1) botReply = girlRow[qIndex];
    }

    // 2. Search Personality Data (B1-B10)
    if (!botReply) {
        const persMatch = personalityData.find(row => row[0] && row[0].toLowerCase().replace(/[^\w\s]/gi, '') === cleanMsg);
        if (persMatch) botReply = persMatch[1];
    }

    if (!botReply) botReply = "I'm not quite sure how to answer that yet... Ask me something from my profile?";

    setTimeout(() => {
        showTyping(true);
        showSuggestions();
        setTimeout(() => {
            showTyping(false);
            addMessage(botReply, 'bot');
        }, 1500);
    }, 800);
}

function showSuggestions() {
    const windowDiv = document.getElementById('chatWindow');
    const old = document.getElementById('current-suggestions');
    if(old) old.remove();
    const container = document.createElement('div');
    container.id = "current-suggestions";
    container.style = "padding: 5px 15px; display:flex; flex-wrap:wrap; gap:10px;";

    const hints = pqQuestions.slice(1, 41).sort(() => 0.5 - Math.random()).slice(0, 2);
    hints.forEach(h => {
        const span = document.createElement('span');
        span.className = "suggestion-text";
        span.innerText = `Ask: "${h[1]}"`;
        span.onclick = () => {
            document.getElementById('chatInput').value = h[1];
            container.remove();
            handleChatInput({ key: 'Enter', target: document.getElementById('chatInput') });
        };
        container.appendChild(span);
    });
    windowDiv.appendChild(container);
    windowDiv.scrollTop = windowDiv.scrollHeight;
}

function addMessage(text, side) {
    const windowDiv = document.getElementById('chatWindow');
    const msg = document.createElement('div');
    msg.className = `msg ${side}-msg`;
    msg.innerHTML = text;
    windowDiv.appendChild(msg);
    windowDiv.scrollTop = windowDiv.scrollHeight;
}

function showTyping(isTyping) {
    const windowDiv = document.getElementById('chatWindow');
    const existing = document.getElementById('typing-indicator');
    if (isTyping && !existing) {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'typing-text';
        indicator.innerText = `${activeGirl.name} is typing...`;
        windowDiv.appendChild(indicator);
    } else if (!isTyping && existing) { existing.remove(); }
}

function handleChatInput(e) {
    if (e.key === 'Enter') {
        const input = e.target;
        const val = input.value.trim();
        if (val === "") return;
        addMessage(val, 'user');
        input.value = "";
        generateBotResponse(val);
    }
}

function closeChat() { document.getElementById('chatWidget').style.display = 'none'; }

window.onload = () => {
    initDatabases();
    loadGrid();
    const ci = document.getElementById('chatInput');
    if(ci) ci.addEventListener('keypress', handleChatInput);
};
