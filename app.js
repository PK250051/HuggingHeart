/* ===================================================
   HUGGINGHEART - 100% DATABASE CHAT ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", age: 24, loc: "Mumbai", role: "Software Engineer", pers: "Very Shy", img: "G001_luna.jpg", type: "B1_very_shy", motto: "Code is logic, but life is art.", loveLanguage: "Intellectual Depth", values: "Honesty", bio: "I build systems and ponder the stars." },
    { id: "G002", name: "Meera Iyer", age: 26, loc: "Bangalore", role: "UX Researcher", pers: "Shy", img: "G002_meera.jpg", type: "B2_shy", motto: "Empathy is power.", loveLanguage: "Quality Time", values: "Kindness", bio: "Fascinated by behavior." },
    { id: "G003", name: "Ananya Rai", age: 21, loc: "Delhi", role: "Digital Artist", pers: "Soft", img: "G003_ananya.jpg", type: "B3_soft", motto: "Pixels tell stories.", loveLanguage: "Words", values: "Passion", bio: "Color is life." },
    { id: "G004", name: "Isha Verma", age: 23, loc: "Pune", role: "Data Scientist", pers: "Balanced", img: "G004_isha.jpg", type: "B4_balanced", motto: "Be a constant.", loveLanguage: "Service", values: "Precision", bio: "Patterns in chaos." },
    { id: "G005", name: "Riya Kapoor", age: 24, loc: "Chennai", role: "Designer", pers: "Confident", img: "G005_riya.jpg", type: "B5_confident", motto: "Simplicity is beauty.", loveLanguage: "Gifts", values: "Style", bio: "Tech meets art." },
    { id: "G006", name: "Sofia Verma", age: 20, loc: "Sydney", role: "HR Executive", pers: "Witty", img: "G006_sofia.jpg", type: "B6_witty", motto: "Kindness is universal.", loveLanguage: "Presence", values: "Harmony", bio: "Helping hearts." },
    { id: "G007", name: "Olivia Singh", age: 22, loc: "Toronto", role: "Strategic Analyst", pers: "Bold", img: "G007_olivia.jpg", type: "B7_bold", motto: "Balance is creation.", loveLanguage: "Stimulation", values: "Clarity", bio: "Strategic analyst." },
    { id: "G008", name: "Aarohi Gupta", age: 30, loc: "Hyderabad", role: "Content Writer", pers: "Daring", img: "G008_aarohi.jpg", type: "B8_daring", motto: "Stories end.", loveLanguage: "Conversation", values: "Wisdom", bio: "Old soul." },
    { id: "G009", name: "Emma Watson", age: 25, loc: "London", role: "Operations Lead", pers: "Gen Z", img: "G009_emma.jpg", type: "B9_gen_z", motto: "Be effective.", loveLanguage: "Goals", values: "Action", bio: "Efficiency." },
    { id: "G010", name: "Amelia Chen", age: 22, loc: "Singapore", role: "Frontend Dev", pers: "Wild", img: "G010_amelia.jpg", type: "B10_wild", motto: "Heart is bigger.", loveLanguage: "Experiences", values: "Beauty", bio: "Connecting world." }
];

let activeGirl = null;
let pqQuestions = [];
let pqAnswers = [];
let personalityData = [];

// DATA LOADER
async function loadCSV(path) {
    const res = await fetch(path);
    const text = await res.text();
    return text.split('\n').filter(row => row.trim() !== "").map(row => row.split(',').map(cell => cell.trim()));
}

async function openChat() {
    closeProfile();
    document.getElementById('chatWidget').style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatAvatar').src = `assets/images/girls/${activeGirl.img}`;
    
    const windowDiv = document.getElementById('chatWindow');
    windowDiv.innerHTML = "";

    pqQuestions = await loadCSV('data/questions/PQ_40_Personal_Questions.csv');
    pqAnswers = await loadCSV('data/questions/PQ_40_Personal_Answer.csv');
    personalityData = await loadCSV(`data/answers/type_${activeGirl.type}.csv`);

    addMessage(`Hi! I'm ${activeGirl.name}. 😊`, 'bot');

    setTimeout(() => {
        showTyping(true);
        showSuggestions();
        setTimeout(() => {
            showTyping(false);
            addMessage(`I'm really glad you reached out. May I know your name?`, 'bot');
        }, 1500); 
    }, 1000);
}

function showSuggestions() {
    const windowDiv = document.getElementById('chatWindow');
    const container = document.createElement('div');
    container.id = "current-suggestions";
    container.style = "padding: 5px 15px;";

    const randomPQs = pqQuestions.slice(1, 41).sort(() => 0.5 - Math.random()).slice(0, 2);

    randomPQs.forEach(q => {
        const span = document.createElement('span');
        span.className = "suggestion-text";
        span.innerText = `Ask: "${q[1]}"`;
        span.onclick = () => {
            document.getElementById('chatInput').value = q[1];
            container.remove();
            handleChatInput({ key: 'Enter', target: document.getElementById('chatInput') });
        };
        container.appendChild(span);
    });

    windowDiv.appendChild(container);
    windowDiv.scrollTop = windowDiv.scrollHeight;
}

function handleChatInput(e) {
    if (e.key === 'Enter') {
        const input = e.target;
        const msg = input.value.trim();
        if (msg === "") return;

        addMessage(msg, 'user');
        input.value = "";
        const oldSug = document.getElementById('current-suggestions');
        if(oldSug) oldSug.remove();

        generateBotResponse(msg);
    }
}

function generateBotResponse(userMsg) {
    const cleanMsg = userMsg.toLowerCase().replace(/[^\w\s]/gi, '');
    let botReply = "";

    // 1. Check PQ_40
    const pqMatch = pqQuestions.find(row => row[1] && row[1].toLowerCase().replace(/[^\w\s]/gi, '') === cleanMsg);
    if (pqMatch) {
        const qID = pqMatch[0];
        const girlRow = pqAnswers.find(row => row[0] === activeGirl.id);
        const qIndex = pqAnswers[0].indexOf(qID);
        if (girlRow && qIndex !== -1) botReply = girlRow[qIndex];
    }

    // 2. Check Personality Data
    if (!botReply) {
        const persMatch = personalityData.find(row => row[0] && row[0].toLowerCase().replace(/[^\w\s]/gi, '') === cleanMsg);
        if (persMatch) botReply = persMatch[1];
    }

    if (!botReply) botReply = "I... I'm not sure. Can you ask me something from my profile?";

    setTimeout(() => {
        showTyping(true);
        showSuggestions();
        setTimeout(() => {
            showTyping(false);
            addMessage(botReply, 'bot');
        }, 1500);
    }, 800);
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
    windowDiv.scrollTop = windowDiv.scrollHeight;
}

function loadGrid() {
    const grid = document.getElementById('gridContainer');
    if(!grid) return;
    grid.innerHTML = "";
    girls.forEach((g, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'girl-card';
            card.onclick = () => openProfile(g.id);
            card.innerHTML = `<div class="img-box"><span class="status-tag"><span class="green-bulb"></span> Online</span><img src="assets/images/girls/${g.img}"></div>
                              <div class="info-box"><p>${g.role}</p><h3>${g.name}</h3><div style="font-size:0.8rem; color:#6b7280;">Age: ${g.age}</div></div>`;
            grid.appendChild(card);
        }, index * 800); 
    });
}

function openProfile(id) {
    activeGirl = girls.find(x => x.id === id);
    document.getElementById('mName').innerText = activeGirl.name;
    document.getElementById('mRole').innerText = activeGirl.role;
    document.getElementById('mAge').innerText = activeGirl.age;
    document.getElementById('mLoc').innerText = activeGirl.loc;
    document.getElementById('mPers').innerText = activeGirl.pers;
    document.getElementById('mBio').innerText = activeGirl.bio;
    document.getElementById('mMotto').innerText = `"${activeGirl.motto}"`;
    document.getElementById('mLove').innerText = activeGirl.loveLanguage;
    document.getElementById('mValues').innerText = activeGirl.values;
    document.getElementById('mImg').style.backgroundImage = `url('assets/images/girls/${activeGirl.img}')`;
    document.getElementById('pModal').style.display = 'flex';
}

function closeProfile() { document.getElementById('pModal').style.display = 'none'; }
function closeChat() { document.getElementById('chatWidget').style.display = 'none'; }

window.onload = () => {
    loadGrid();
    const chatInput = document.getElementById('chatInput');
    if (chatInput) chatInput.addEventListener('keypress', handleChatInput);
};
