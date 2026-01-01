/* ===================================================
   HUGGINGHEART - COMMUNITY LOGIC (VERIFIED)
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", age: 24, loc: "Mumbai", role: "Software Engineer", pers: "Bold Strategist", img: "G001_luna.jpg", motto: "Code is logic, but life is art.", loveLanguage: "Intellectual Depth", values: "Honesty, Growth", bio: "I build complex systems by day and ponder the stars by night." },
    { id: "G002", name: "Meera Iyer", age: 26, loc: "Bangalore", role: "UX Researcher", pers: "The Caretaker", img: "G002_meera.jpg", motto: "Empathy is the ultimate superpower.", loveLanguage: "Quality Time", values: "Kindness, Presence", bio: "I spend my time studying how people feel." },
    { id: "G003", name: "Ananya Rai", age: 21, loc: "Delhi", role: "Digital Artist", pers: "Creative Soul", img: "G003_ananya.jpg", motto: "Every pixel holds a silent story.", loveLanguage: "Words of Affirmation", values: "Expression, Passion", bio: "I see the world in high-contrast." },
    { id: "G004", name: "Isha Verma", age: 23, loc: "Pune", role: "Data Scientist", pers: "The Analyst", img: "G004_isha.jpg", motto: "In a world of variables, be a constant.", loveLanguage: "Acts of Service", values: "Precision, Loyalty", bio: "Searching for patterns in the chaos." },
    { id: "G005", name: "Riya Kapoor", age: 24, loc: "Chennai", role: "Designer", pers: "The Techie", img: "G005_riya.jpg", motto: "Simplicity is sophistication.", loveLanguage: "Thoughtful Gifts", values: "Innovation, Style", bio: "Blending tech logic with modern visual style." },
    { id: "G006", name: "Sofia Verma", age: 20, loc: "Sydney", role: "HR Executive", pers: "Gentle Caretaker", img: "G006_sofia.jpg", motto: "Kindness is universal.", loveLanguage: "Presence", values: "Support, Harmony", bio: "Dedicated to helping people find their spark." },
    { id: "G007", name: "Olivia Singh", age: 22, loc: "Toronto", role: "Strategic Analyst", pers: "The Strategist", img: "G007_olivia.jpg", motto: "Balance is a creation.", loveLanguage: "Stimulation", values: "Clarity, Ambition", bio: "Strategic in mind, poetic in heart." },
    { id: "G008", name: "Aarohi Gupta", age: 30, loc: "Hyderabad", role: "Content Writer", pers: "Intellectual", img: "G008_aarohi.jpg", motto: "We are all stories in the end.", loveLanguage: "Conversation", values: "Wisdom, Silence", bio: "I find peace in quiet libraries." },
    { id: "G009", name: "Emma Watson", age: 25, loc: "London", role: "Operations Lead", pers: "Efficient Leader", img: "G009_emma.jpg", motto: "Be effective, not just busy.", loveLanguage: "Shared Goals", values: "Action, Discipline", bio: "Organized and focused." },
    { id: "G010", name: "Amelia Chen", age: 22, loc: "Singapore", role: "Frontend Dev", pers: "Globalist", img: "G010_amelia.jpg", motto: "The heart is bigger than the world.", loveLanguage: "New Experiences", values: "Connection, Beauty", bio: "Building interfaces to connect the world." }
];

let activeGirl = null;

// RELAX MODE LOAD: One girl every 1000ms
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
                    <div class="age-text">Age: ${g.age}</div>
                </div>
            `;
            grid.appendChild(card);
        }, index * 1000); 
    });
}

function openProfile(id) {
    activeGirl = girls.find(x => x.id === id);
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
    document.getElementById('mImg').style.backgroundImage = `url('assets/images/girls/${activeGirl.img}')`;
    
    document.getElementById('pModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProfile() {
    document.getElementById('pModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// CHAT BOT SEQUENTIAL LOGIC
function openChat() {
    closeProfile();
    const widget = document.getElementById('chatWidget');
    const windowDiv = document.querySelector('.chat-window');
    
    widget.style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatAvatar').src = `assets/images/girls/${activeGirl.img}`;
    windowDiv.innerHTML = "";

    // 1. Instant Hi
    addMessage(`Hi! I'm ${activeGirl.name}. 😊`, 'bot');

    // 2. Typing Delay 1.5s
    setTimeout(() => {
        showTyping(true);
        setTimeout(() => {
            showTyping(false);
            addMessage(`I'm really glad you reached out. Before we start our movement, may I know your name?`, 'bot');
        }, 1500); 
    }, 1000);
}

function handleChatInput(e) {
    if (e.key === 'Enter') {
        const input = e.target;
        const val = input.value.trim();
        if (val !== "") {
            addMessage(val, 'user');
            input.value = "";
            setTimeout(() => {
                showTyping(true);
                setTimeout(() => {
                    showTyping(false);
                    addMessage(`It's lovely to meet you, ${val}. I can already feel a great connection! How are you today?`, 'bot');
                }, 1500);
            }, 800);
        }
    }
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
    } else if (!isTyping && existing) {
        existing.remove();
    }
    windowDiv.scrollTop = windowDiv.scrollHeight;
}

function closeChat() {
    document.getElementById('chatWidget').style.display = 'none';
}

window.onload = () => {
    loadGrid();
    const chatInput = document.querySelector('#chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', handleChatInput);
    }
};
