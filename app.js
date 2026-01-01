/* ===================================================
   HUGGINGHEART - DATA-DRIVEN COMMUNITY LOGIC
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", age: 24, loc: "Mumbai", role: "Software Engineer", pers: "Bold Strategist", img: "G001_luna.jpg", type: "B1_very_shy", motto: "Code is logic, but life is art.", loveLanguage: "Intellectual Depth", values: "Honesty, Growth", bio: "I build complex systems and ponder the stars." },
    { id: "G002", name: "Meera Iyer", age: 26, loc: "Bangalore", role: "UX Researcher", pers: "The Caretaker", img: "G002_meera.jpg", type: "B2_shy", motto: "Empathy is power.", loveLanguage: "Quality Time", values: "Kindness, Peace", bio: "Fascinated by human behavior." },
    { id: "G003", name: "Ananya Rai", age: 21, loc: "Delhi", role: "Digital Artist", pers: "Creative Soul", img: "G003_ananya.jpg", type: "B3_soft", motto: "Every pixel holds a story.", loveLanguage: "Words", values: "Passion", bio: "I see world in colors." },
    { id: "G004", name: "Isha Verma", age: 23, loc: "Pune", role: "Data Scientist", pers: "The Analyst", img: "G004_isha.jpg", type: "B4_balanced", motto: "Be a constant.", loveLanguage: "Service", values: "Precision", bio: "Finding patterns in chaos." },
    { id: "G005", name: "Riya Kapoor", age: 24, loc: "Chennai", role: "Designer", pers: "The Techie", img: "G005_riya.jpg", type: "B5_confident", motto: "Simple is sophisticated.", loveLanguage: "Gifts", values: "Style", bio: "Blending tech and art." },
    { id: "G006", name: "Sofia Verma", age: 20, loc: "Sydney", role: "HR Executive", pers: "Gentle Caretaker", img: "G006_sofia.jpg", type: "B6_witty", motto: "Kindness is universal.", loveLanguage: "Presence", values: "Harmony", bio: "Helping people find sparks." },
    { id: "G007", name: "Olivia Singh", age: 22, loc: "Toronto", role: "Strategic Analyst", pers: "The Strategist", img: "G007_olivia.jpg", type: "B7_bold", motto: "Balance is a creation.", loveLanguage: "Stimulation", values: "Clarity", bio: "Strategic and poetic." },
    { id: "G008", name: "Aarohi Gupta", age: 30, loc: "Hyderabad", role: "Content Writer", pers: "Intellectual", img: "G008_aarohi.jpg", type: "B8_daring", motto: "Stories never end.", loveLanguage: "Conversation", values: "Wisdom", bio: "Peace in libraries." },
    { id: "G009", name: "Emma Watson", age: 25, loc: "London", role: "Operations Lead", pers: "Efficient Leader", img: "G009_emma.jpg", type: "B9_gen_z", motto: "Be effective.", loveLanguage: "Goals", values: "Action", bio: "Efficiency is key." },
    { id: "G010", name: "Amelia Chen", age: 22, loc: "Singapore", role: "Frontend Dev", pers: "Globalist", img: "G010_amelia.jpg", type: "B10_wild", motto: "Heart is bigger.", loveLanguage: "Experiences", values: "Beauty", bio: "Connecting the world." }
];

let activeGirl = null;
let pqQuestions = [];
let pqAnswers = [];
let personalityData = [];
let chatState = "GREETING"; // GREETING -> ASKING_NAME -> CHATTING

async function loadCSV(path) {
    const res = await fetch(path);
    const text = await res.text();
    return text.split('\n').map(row => row.split(',').map(cell => cell.trim()));
}

async function openChat() {
    closeProfile();
    const widget = document.getElementById('chatWidget');
    const windowDiv = document.querySelector('.chat-window');
    widget.style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatAvatar').src = `assets/images/girls/${activeGirl.img}`;
    windowDiv.innerHTML = "";
    chatState = "GREETING";

    // Load Data Files
    pqQuestions = await loadCSV('data/questions/PQ_40_Personal_Questions.csv');
    pqAnswers = await loadCSV('data/questions/PQ_40_Personal_Answer.csv');
    personalityData = await loadCSV(`data/answers/type_${activeGirl.type}.csv`);

    addMessage(`Hi! I'm ${activeGirl.name}. 😊`, 'bot');

    setTimeout(() => {
        showTyping(true);
        setTimeout(() => {
            showTyping(false);
            addMessage(`I'm really glad you reached out. Before we start, may I know your name?`, 'bot');
            chatState = "ASKING_NAME";
        }, 1500); 
    }, 1000);
}

function handleChatInput(e) {
    if (e.key === 'Enter') {
        const input = e.target;
        const msg = input.value.trim();
        if (msg === "") return;

        addMessage(msg, 'user');
        input.value = "";

        if (chatState === "ASKING_NAME") {
            setTimeout(() => {
                showTyping(true);
                setTimeout(() => {
                    showTyping(false);
                    addMessage(`It's lovely to meet you, ${msg}. I can already feel a connection! Ask me anything.`, 'bot');
                    chatState = "CHATTING";
                }, 1500);
            }, 800);
        } else {
            generateBotResponse(msg);
        }
    }
}

function generateBotResponse(userMsg) {
    const cleanMsg = userMsg.toLowerCase().replace(/[^\w\s]/gi, '');
    let botReply = "";

    // 1. Check Personal Questions (PQ01-PQ40)
    const pqMatch = pqQuestions.find(q => q[1] && q[1].toLowerCase().replace(/[^\w\s]/gi, '') === cleanMsg);
    if (pqMatch) {
        const qID = pqMatch[0];
        const girlRow = pqAnswers.find(row => row[0] === activeGirl.id);
        const qIndex = pqAnswers[0].indexOf(qID);
        if (girlRow && qIndex !== -1) {
            botReply = girlRow[qIndex];
        }
    }

    // 2. Check Personality CSV (Generic hi, how are you, etc)
    if (!botReply) {
        const persMatch = personalityData.find(row => row[0] && row[0].toLowerCase() === cleanMsg);
        if (persMatch) botReply = persMatch[1];
    }

    // 3. Fallback
    if (!botReply) botReply = "...sorry, I'm a bit lost. Could you say that again?";

    setTimeout(() => {
        showTyping(true);
        setTimeout(() => {
            showTyping(false);
            addMessage(botReply, 'bot');
        }, 1500);
    }, 800);
}

function addMessage(text, side) {
    const windowDiv = document.querySelector('.chat-window');
    const msg = document.createElement('div');
    msg.className = `msg ${side}-msg`;
    msg.innerHTML = text;
    windowDiv.appendChild(msg);
    windowDiv.scrollTop = windowDiv.scrollHeight;
}

function showTyping(isTyping) {
    const windowDiv = document.querySelector('.chat-window');
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

function closeChat() { document.getElementById('chatWidget').style.display = 'none'; }
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
window.onload = () => {
    loadGrid();
    const chatInput = document.querySelector('#chatInput');
    if (chatInput) chatInput.addEventListener('keypress', handleChatInput);
};
