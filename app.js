/* ===================================================
   HUGGINGHEART - PERFECT DATABASE ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", type: "B1_very_shy", img: "G001_luna.jpg", role: "Software Engineer", age: 24, loc: "Mumbai", pers: "Reserved", motto: "Code is logic, but life is art.", loveLanguage: "Intellectual Depth", values: "Honesty", bio: "I build complex systems by day and ponder the stars by night. I value deep, honest debates over small talk." },
    { id: "G002", name: "Meera Iyer", type: "B2_shy", img: "G002_meera.jpg", role: "UX Researcher", age: 26, loc: "Bangalore", pers: "Reserved", motto: "Empathy is power.", loveLanguage: "Time", values: "Kindness", bio: "Fascinated by human behavior and soft voices." },
    { id: "G003", name: "Ananya Rai", type: "B3_soft", img: "G003_ananya.jpg", role: "Digital Artist", age: 21, loc: "Delhi", pers: "Creative", motto: "Pixels tell stories.", loveLanguage: "Words", values: "Passion", bio: "I see the world in high-contrast and vibrant colors." },
    { id: "G004", name: "Isha Verma", type: "B4_balanced", img: "G004_isha.jpg", role: "Data Scientist", age: 23, loc: "Pune", pers: "Analytical", motto: "Be a constant.", loveLanguage: "Service", values: "Precision", bio: "Searching for logical patterns in chaos." },
    { id: "G005", name: "Riya Kapoor", type: "B5_confident", img: "G005_riya.jpg", role: "Designer", age: 24, loc: "Chennai", pers: "Modern", motto: "Simplicity is beauty.", loveLanguage: "Gifts", values: "Style", bio: "Blending tech logic with modern visual style." },
    { id: "G006", name: "Sofia Verma", type: "B6_witty", img: "G006_sofia.jpg", role: "HR Executive", age: 20, loc: "Sydney", pers: "Witty", motto: "Kindness is universal.", loveLanguage: "Presence", values: "Harmony", bio: "Helping people find their spark in a noisy world." },
    { id: "G007", name: "Olivia Singh", type: "B7_bold", img: "G007_olivia.jpg", role: "Strategic Analyst", age: 22, loc: "Toronto", pers: "Bold", motto: "Balance is creation.", loveLanguage: "Stimulation", values: "Clarity", bio: "Strategic in mind, poetic in heart." },
    { id: "G008", name: "Aarohi Gupta", type: "B8_daring", img: "G008_aarohi.jpg", role: "Content Writer", age: 30, loc: "Hyderabad", pers: "Daring", motto: "Stories never end.", loveLanguage: "Conversation", values: "Wisdom", bio: "Old soul who finds peace in quiet libraries." },
    { id: "G009", name: "Emma Watson", type: "B9_gen_z", img: "G009_emma.jpg", role: "Operations Lead", age: 25, loc: "London", pers: "Vibrant", motto: "Be effective.", loveLanguage: "Goals", values: "Action", bio: "Organized leader with global vision." },
    { id: "G010", name: "Amelia Chen", type: "B10_wild", img: "G010_amelia.jpg", role: "Frontend Dev", age: 22, loc: "Singapore", pers: "Wild", motto: "Heart is bigger.", loveLanguage: "Experiences", values: "Beauty", bio: "Connecting the world through code and soul." }
];

let activeGirl = null;
let pqQuestions = [];
let pqAnswers = [];
let personalityData = [];

// Robust CSV Parser
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
    } catch (e) { console.warn("Databases pre-loading..."); }
}

function loadGrid() {
    const grid = document.getElementById('gridContainer');
    if(!grid) return;
    grid.innerHTML = "";
    girls.forEach((g) => {
        const card = document.createElement('div');
        card.className = 'girl-card';
        card.innerHTML = `
            <div class="img-box">
                <span class="status-tag"><span class="green-bulb"></span> Online</span>
                <img src="assets/images/girls/${g.img}">
            </div>
            <div class="info-box">
                <p style="color:#6fcf97; font-weight:700; font-size:0.75rem; text-transform:uppercase;">${g.role}</p>
                <h3>${g.name}</h3>
                <span class="age-label">Age: ${g.age}</span>
            </div>`;
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
    document.getElementById('mBio').innerText = activeGirl.bio; // BIO RESTORED
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
    showTyping(true); // SHOW SUGGESTIONS DURING TYPING
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
    if (!botReply) botReply = "I... I'm not sure. Ask me something from my profile?";
    
    showTyping(true);
    setTimeout(() => {
        showTyping(false);
        addMessage(botReply, 'bot');
    }, 1500);
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
    const existing = document.getElementById('typing-block');
    if (isTyping && !existing) {
        const block = document.createElement('div');
        block.id = 'typing-block';
        block.className = 'typing-indicator';
        block.innerHTML = `<span>${activeGirl.name} is typing...</span>`;
        
        // SHOW SUGGESTIONS INSIDE TYPING BLOCK
        const suggestDiv = document.createElement('div');
        suggestDiv.className = "suggestion-container";
        
        // Pick 1 from PQ and 1 from Personality
        const pqH = pqQuestions.slice(1, 40).sort(() => 0.5 - Math.random())[0];
        const perH = personalityData.slice(1, 20).sort(() => 0.5 - Math.random())[0];
        
        [pqH, perH].forEach(h => {
            if(h && h[1]) {
                const s = document.createElement('span');
                s.className = "suggestion-text";
                s.innerText = `Try: "${h[1].substring(0, 30)}..."`;
                s.onclick = () => {
                    document.getElementById('chatInput').value = (h[0].length > 5) ? h[0] : h[1];
                    handleChatInput({ key: 'Enter' });
                };
                suggestDiv.appendChild(s);
            }
        });
        
        block.appendChild(suggestDiv);
        windowDiv.appendChild(block);
    } else if (!isTyping && existing) {
        existing.remove();
    }
    windowDiv.scrollTop = windowDiv.scrollHeight;
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

window.onload = () => { initDatabases(); loadGrid(); const input = document.getElementById('chatInput'); if(input) input.addEventListener('keypress', handleChatInput); };
