/* ===================================================
   HUGGINGHEART - PERFECT DATABASE & CHATBOT ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", type: "B1_very_shy", img: "G001_luna.jpg", role: "Software Engineer", age: 24, loc: "Mumbai", pers: "Thoughtful", motto: "Code is logic...", loveLanguage: "Intellectual", values: "Honesty", bio: "I build complex systems." },
    { id: "G002", name: "Meera Iyer", type: "B2_shy", img: "G002_meera.jpg", role: "UX Researcher", age: 26, loc: "Bangalore", pers: "Reserved", motto: "Empathy is power.", loveLanguage: "Time", values: "Kindness", bio: "Fascinated by humans." },
    { id: "G003", name: "Ananya Rai", type: "B3_soft", img: "G003_ananya.jpg", role: "Digital Artist", age: 21, loc: "Delhi", pers: "Creative", motto: "Pixels tell stories.", loveLanguage: "Words", values: "Passion", bio: "World in high-contrast." },
    { id: "G004", name: "Isha Verma", type: "B4_balanced", img: "G004_isha.jpg", role: "Data Scientist", age: 23, loc: "Pune", pers: "Analytical", motto: "Be a constant.", loveLanguage: "Service", values: "Precision", bio: "Patterns in chaos." },
    { id: "G005", name: "Riya Kapoor", type: "B5_confident", img: "G005_riya.jpg", role: "Designer", age: 24, loc: "Chennai", pers: "Modern", motto: "Simplicity is beauty.", loveLanguage: "Gifts", values: "Style", bio: "Tech meets aesthetic." },
    { id: "G006", name: "Sofia Verma", type: "B6_witty", img: "G006_sofia.jpg", role: "HR Executive", age: 20, loc: "Sydney", pers: "Witty", motto: "Kindness is universal.", loveLanguage: "Presence", values: "Harmony", bio: "Helping hearts." },
    { id: "G007", name: "Olivia Singh", type: "B7_bold", img: "G007_olivia.jpg", role: "Strategic Analyst", age: 22, loc: "Toronto", pers: "Bold", motto: "Balance is creation.", loveLanguage: "Stimulation", values: "Clarity", bio: "Strategic analyst." },
    { id: "G008", name: "Aarohi Gupta", type: "B8_daring", img: "G008_aarohi.jpg", role: "Content Writer", age: 30, loc: "Hyderabad", pers: "Deep", motto: "Stories never end.", loveLanguage: "Conversation", values: "Wisdom", bio: "Old soul." },
    { id: "G009", name: "Emma Watson", type: "B9_gen_z", img: "G009_emma.jpg", role: "Operations Lead", age: 25, loc: "London", pers: "Vibrant", motto: "Be effective.", loveLanguage: "Goals", values: "Action", bio: "Organized leader." },
    { id: "G010", name: "Amelia Chen", type: "B10_wild", img: "G010_amelia.jpg", role: "Frontend Dev", age: 22, loc: "Singapore", pers: "Wild", motto: "Heart is bigger.", loveLanguage: "Experiences", values: "Beauty", bio: "Connecting the soul." }
];

let activeGirl = null;
let pqQuestions = [];
let pqAnswers = [];
let personalityData = [];

// Advanced CSV Parser (Handles commas inside sentences)
function parseCSV(text) {
    if(!text) return [];
    const rows = text.split('\n').filter(r => r.trim() !== "");
    return rows.map(row => {
        const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        return matches ? matches.map(v => v.replace(/"/g, "").trim()) : row.split(',');
    });
}

async function initDatabases() {
    try {
        const [qRes, aRes] = await Promise.all([
            fetch('data/questions/PQ_40_Personal_Questions.csv').then(r => r.text()),
            fetch('data/questions/PQ_40_Personal_Answer.csv').then(r => r.text())
        ]);
        pqQuestions = parseCSV(qRes);
        pqAnswers = parseCSV(aRes);
    } catch (e) { console.warn("Syncing databases..."); }
}

function loadGrid() {
    const grid = document.getElementById('gridContainer');
    if(!grid) return;
    grid.innerHTML = "";
    girls.forEach((g) => {
        const card = document.createElement('div');
        card.className = 'girl-card';
        card.innerHTML = `<div class="img-box"><span class="status-tag"><span class="green-bulb"></span> Online</span><img src="assets/images/girls/${g.img}"></div>
                          <div class="info-box"><p>${g.role}</p><h3>${g.name}</h3></div>`;
        card.onclick = () => { activeGirl = g; openProfile(); };
        grid.appendChild(card);
    });
}

function openProfile() {
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
}

async function openChat() {
    document.getElementById('pModal').style.display = 'none';
    const widget = document.getElementById('chatWidget');
    widget.style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatAvatar').src = `assets/images/girls/${activeGirl.img}`;
    const windowDiv = document.getElementById('chatWindow');
    windowDiv.innerHTML = "";
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
            addMessage(`I'm really glad you reached out. What is your name?`, 'bot');
        }, 1500);
    }, 1000);
}

function generateBotResponse(userMsg) {
    const cleanMsg = userMsg.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    let botReply = "";
    const pqMatch = pqQuestions.find(row => row[1] && row[1].toLowerCase().replace(/[^\w\s]/gi, '') === cleanMsg);
    if (pqMatch) {
        const qID = pqMatch[0];
        const girlRow = pqAnswers.find(row => row[0] === activeGirl.id);
        const qIndex = pqAnswers[0].indexOf(qID);
        if (girlRow && qIndex !== -1) botReply = girlRow[qIndex];
    }
    if (!botReply) {
        const persMatch = personalityData.find(row => row[0] && row[0].toLowerCase().replace(/[^\w\s]/gi, '') === cleanMsg);
        if (persMatch) botReply = persMatch[1];
    }
    if (!botReply) botReply = "I'm not sure... ask me something from my profile?";
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
    container.style = "padding: 5px 0; display:flex; flex-wrap:wrap; gap:10px;";
    const hints = pqQuestions.slice(1, 41).sort(() => 0.5 - Math.random()).slice(0, 2);
    hints.forEach(h => {
        const span = document.createElement('span');
        span.className = "suggestion-text";
        span.innerText = `Ask: "${h[1]}"`;
        span.onclick = () => {
            document.getElementById('chatInput').value = h[1];
            container.remove();
            handleChatInput({ key: 'Enter' });
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
        indicator.style = "font-size: 0.75rem; color: #94a3b8; font-style: italic; margin-bottom: 5px;";
        indicator.innerText = `${activeGirl.name} is typing...`;
        windowDiv.appendChild(indicator);
    } else if (!isTyping && existing) { existing.remove(); }
}

function handleChatInput(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('chatInput');
        const val = input.value.trim();
        if (val === "") return;
        addMessage(val, 'user');
        input.value = "";
        generateBotResponse(val);
    }
}

function closeProfile() { document.getElementById('pModal').style.display = 'none'; document.body.style.overflow = 'auto'; }
function closeChat() { document.getElementById('chatWidget').style.display = 'none'; }

window.onload = () => {
    initDatabases();
    loadGrid();
    const input = document.getElementById('chatInput');
    if(input) input.addEventListener('keypress', handleChatInput);
};
