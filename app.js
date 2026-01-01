const girls = [
    { 
        id: "G001", name: "Luna Sharma", age: 24, loc: "Mumbai", role: "Software Engineer", 
        pers: "Bold Strategist", img: "G001_luna.jpg", 
        motto: "Code is logic, but life is art.", 
        loveLanguage: "Intellectual Depth", 
        values: "Honesty, Growth, Freedom",
        bio: "I build complex systems by day and ponder the stars by night. I value deep, honest debates over small talk." 
    },
    { 
        id: "G002", name: "Meera Iyer", age: 26, loc: "Bangalore", role: "UX Researcher", 
        pers: "The Caretaker", img: "G002_meera.jpg", 
        motto: "Empathy is the ultimate superpower.", 
        loveLanguage: "Quality Time", 
        values: "Kindness, Presence, Peace",
        bio: "I spend my time studying how people feel. I value soft voices and warm hearts over digital noise." 
    },
    // ... Add G003 to G010 with similar assertive fields ...
    { 
        id: "G007", name: "Olivia Singh", age: 22, loc: "Toronto", role: "Strategic Analyst", 
        pers: "The Strategist", img: "G007_olivia.jpg", 
        motto: "Balance is a creation, not a discovery.", 
        loveLanguage: "Intellectual Stimulation", 
        values: "Clarity, Ambition, Focus",
        bio: "Strategic in mind, poetic in heart. I believe the best connections happen when we put the digital world on pause." 
    }
];

let activeGirl = null;

function loadGrid() {
    const grid = document.getElementById('gridContainer');
    if(!grid) return;
    grid.innerHTML = "";
    
    const statusDiv = document.createElement('div');
    statusDiv.id = "loadStatus";
    statusDiv.className = "loading-status";
    statusDiv.innerHTML = 'Discovering Souls<span class="dot-pulse"></span>';
    grid.parentNode.insertBefore(statusDiv, grid);

    girls.forEach((g, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'girl-card';
            card.onclick = () => openProfile(g.id);
            card.innerHTML = `<div class="img-box"><span class="status-tag">Online</span><img src="assets/images/girls/${g.img}"></div>
                              <div class="info-box"><p>${g.role}</p><h3>${g.name}</h3></div>`;
            grid.appendChild(card);

            if(index === girls.length - 1) {
                setTimeout(() => {
                    statusDiv.style.opacity = "0";
                    setTimeout(() => statusDiv.remove(), 500);
                }, 1000);
            }
        }, index * 1000); 
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
    document.body.style.overflow = 'hidden';
}

function closeProfile() {
    document.getElementById('pModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openChat() {
    closeProfile();
    document.getElementById('chatWidget').style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatAvatar').src = `assets/images/girls/${activeGirl.img}`;
    
    const chatWin = document.querySelector('.chat-window');
    chatWin.innerHTML = `<div style="margin-bottom:15px; padding:12px; background:#f0fdf4; border-radius:12px; border:1px solid #eaf7f0; font-size: 0.9rem;">
        <strong>${activeGirl.name}:</strong> Hi! I'm ${activeGirl.name}. I saw you reading my motto... it's really how I live my life. I'm glad you reached out. How are you today?
    </div>`;
}

function closeChat() { document.getElementById('chatWidget').style.display = 'none'; }
window.onload = loadGrid;
