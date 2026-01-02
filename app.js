/* ===================================================
   HUGGINGHEART - STABLE DATABASE ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", type: "B1_very_shy", img: "G001_luna.jpg", role: "Software Engineer", age: 24, loc: "Mumbai", pers: "Very Shy", motto: "Code is logic...", loveLanguage: "Intellectual", values: "Growth", bio: "I build systems..." },
    { id: "G002", name: "Meera Iyer", type: "B2_shy", img: "G002_meera.jpg", role: "UX Researcher", age: 26, loc: "Bangalore", pers: "Shy", motto: "Empathy is power...", loveLanguage: "Quality Time", values: "Kindness", bio: "Fascinated by behavior..." },
    { id: "G003", name: "Ananya Rai", type: "B3_soft", img: "G003_ananya.jpg", role: "Digital Artist", age: 21, loc: "Delhi", pers: "Soft", motto: "Pixels tell stories...", loveLanguage: "Words", values: "Passion", bio: "Color is life..." },
    { id: "G004", name: "Isha Verma", type: "B4_balanced", img: "G004_isha.jpg", role: "Data Scientist", age: 23, loc: "Pune", pers: "Balanced", motto: "Be a constant...", loveLanguage: "Service", values: "Precision", bio: "Patterns in chaos..." },
    { id: "G005", name: "Riya Kapoor", type: "B5_confident", img: "G005_riya.jpg", role: "Designer", age: 24, loc: "Chennai", pers: "Confident", motto: "Simplicity...", loveLanguage: "Gifts", values: "Style", bio: "Tech meets art..." },
    { id: "G006", name: "Sofia Verma", type: "B6_witty", img: "G006_sofia.jpg", role: "HR Executive", age: 20, loc: "Sydney", pers: "Witty", motto: "Kindness...", loveLanguage: "Presence", values: "Harmony", bio: "Helping hearts..." },
    { id: "G007", name: "Olivia Singh", type: "B7_bold", img: "G007_olivia.jpg", role: "Strategic Analyst", age: 22, loc: "Toronto", pers: "Bold", motto: "Balance...", loveLanguage: "Stimulation", values: "Clarity", bio: "Strategic analyst..." },
    { id: "G008", name: "Aarohi Gupta", type: "B8_daring", img: "G008_aarohi.jpg", role: "Content Writer", age: 30, loc: "Hyderabad", pers: "Daring", motto: "Stories end...", loveLanguage: "Conversation", values: "Wisdom", bio: "Old soul..." },
    { id: "G009", name: "Emma Watson", type: "B9_gen_z", img: "G009_emma.jpg", role: "Operations Lead", age: 25, loc: "London", pers: "Gen Z", motto: "Be effective...", loveLanguage: "Goals", values: "Action", bio: "Efficiency..." },
    { id: "G010", name: "Amelia Chen", type: "B10_wild", img: "G010_amelia.jpg", role: "Frontend Dev", age: 22, loc: "Singapore", pers: "Wild", motto: "Heart is bigger...", loveLanguage: "Experiences", values: "Beauty", bio: "Connecting world..." }
];

let activeGirl = null;
let pqQuestions = [];
let pqAnswers = [];
let personalityData = [];

// CSV Parser that handles complex rows
function parseCSV(text) {
    if(!text) return [];
    const rows = text.split('\n').filter(row => row.trim() !== "");
    return rows.map(row => {
        const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        return matches ? matches.map(val => val.replace(/"/g, "").trim()) : row.split(',');
    });
}

// Load databases silently so it doesn't block the grid
async function initDatabases() {
    try {
        const qText = await fetch('data/questions/PQ_40_Personal_Questions.csv').then(r => r.text());
        const aText = await fetch('data/questions/PQ_40_Personal_Answer.csv').then(r => r.text());
        pqQuestions = parseCSV(qText);
        pqAnswers = parseCSV(aText);
    } catch (e) { console.warn("Databases not ready yet."); }
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
            card.innerHTML = `
                <div class="img-box">
                    <span class="status-tag"><span class="green-bulb"></span> Online</span>
                    <img src="assets/images/girls/${g.img}">
                </div>
                <div class="info-box">
                    <p>${g.role}</p>
                    <h3>${g.name}</h3>
                    <div style="font-size:0.8rem; color:#6b7280; margin-top:5px;">Age: ${g.age}</div>
                </div>`;
            grid.appendChild(card);
        }, index * 200); // Faster loading
    });
}

function openProfile(id) {
    activeGirl = girls.find(x => x.id === id);
    if(!activeGirl) return;

    // Fill Modal Text
    document.getElementById('mName').innerText = activeGirl.name;
    document.getElementById('mRole').innerText = activeGirl.role;
    document.getElementById('mAge').innerText = activeGirl.age;
    document.getElementById('mLoc').innerText = activeGirl.loc;
    document.getElementById('mPers').innerText = activeGirl.pers;
    document.getElementById('mBio').innerText = activeGirl.bio;
    document.getElementById('mMotto').innerText = `"${activeGirl.motto}"`;
    document.getElementById('mLove').innerText = activeGirl.loveLanguage;
    document.getElementById('mValues').innerText = activeGirl.values;
    
    // Fill Modal Image
    const modalImg = document.getElementById('mImg');
    modalImg.style.backgroundImage = `url('assets/images/girls/${activeGirl.img}')`;
    modalImg.style.backgroundSize = "cover";
    modalImg.style.backgroundPosition = "top";

    document.getElementById('pModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProfile() {
    document.getElementById('pModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Chat Logic
async function openChat() {
    closeProfile();
    const widget = document.getElementById('chatWidget');
    const windowDiv = document.getElementById('chatWindow');
    widget.style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatAvatar').src = `assets/images/girls/${activeGirl.img}`;
    windowDiv.innerHTML = "";

    // Load personality data now
    try {
        const pText = await fetch(`data/answers/type_${activeGirl.type}.csv`).then(r => r.text());
        personalityData = parseCSV(pText);
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

// ... helper functions for addMessage, showTyping, showSuggestions, generateBotResponse, closeChat ...
// (Refer to previous code blocks for those helpers; they remain the same)

window.onload = () => {
    loadGrid();
    initDatabases();
    const input = document.getElementById('chatInput');
    if(input) {
        input.addEventListener('keypress', (e) => {
            if(e.key === 'Enter' && input.value.trim() !== "") {
                addMessage(input.value, 'user');
                const val = input.value;
                input.value = "";
                generateBotResponse(val);
            }
        });
    }
};
