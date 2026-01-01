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
    { 
        id: "G003", name: "Ananya Rai", age: 21, loc: "Delhi", role: "Digital Artist", 
        pers: "Creative Soul", img: "G003_ananya.jpg", 
        motto: "Every pixel holds a silent story.", 
        loveLanguage: "Words of Affirmation", 
        values: "Expression, Passion, Color",
        bio: "I see the world in high-contrast. Seeking a connection that feels like a masterpiece in progress." 
    },
    { 
        id: "G004", name: "Isha Verma", age: 23, loc: "Pune", role: "Data Scientist", 
        pers: "The Analyst", img: "G004_isha.jpg", 
        motto: "In a world of variables, be a constant.", 
        loveLanguage: "Acts of Service", 
        values: "Precision, Loyalty, Logic",
        bio: "Searching for patterns in the chaos. I appreciate clarity, consistency, and a mind that never stops questioning." 
    },
    { 
        id: "G005", name: "Riya Kapoor", age: 24, loc: "Chennai", role: "Designer", 
        pers: "The Techie", img: "G005_riya.jpg", 
        motto: "Simplicity is the highest form of sophistication.", 
        loveLanguage: "Receiving Gifts of Thought", 
        values: "Innovation, Style, Truth",
        bio: "Blending tech logic with modern visual style. I’m drawn to minimalist aesthetics and maximalist conversations." 
    },
    { 
        id: "G006", name: "Sofia Verma", age: 20, loc: "Sydney", role: "HR Executive", 
        pers: "Gentle Caretaker", img: "G006_sofia.jpg", 
        motto: "Kindness is a language everyone understands.", 
        loveLanguage: "Physical Touch (Presence)", 
        values: "Support, Patience, Harmony",
        bio: "Dedicated to helping people find their spark. I value authentic connections that feel safe and grounding." 
    },
    { 
        id: "G007", name: "Olivia Singh", age: 22, loc: "Toronto", role: "Strategic Analyst", 
        pers: "The Strategist", img: "G007_olivia.jpg", 
        motto: "Balance is a creation, not a discovery.", 
        loveLanguage: "Intellectual Stimulation", 
        values: "Clarity, Ambition, Focus",
        bio: "Strategic in mind, poetic in heart. I believe the best connections happen when we put the digital world on pause." 
    },
    { 
        id: "G008", name: "Aarohi Gupta", age: 30, loc: "Hyderabad", role: "Content Writer", 
        pers: "Intellectual", img: "G008_aarohi.jpg", 
        motto: "We are all stories in the end.", 
        loveLanguage: "Deep Conversation", 
        values: "Wisdom, Silence, Literature",
        bio: "I find peace in quiet libraries. I'm looking for someone who reads between the lines and values old-soul energy." 
    },
    { 
        id: "G009", name: "Emma Watson", age: 25, loc: "London", role: "Operations Lead", 
        pers: "Efficient Leader", img: "G009_emma.jpg", 
        motto: "Efficiency is doing things right; Effectiveness is doing the right things.", 
        loveLanguage: "Shared Goals", 
        values: "Action, Discipline, Reliability",
        bio: "Organized and focused. I respect people who value time as their most precious currency." 
    },
    { 
        id: "G010", name: "Amelia Chen", age: 22, loc: "Singapore", role: "Frontend Dev", 
        pers: "Globalist", img: "G010_amelia.jpg", 
        motto: "The world is big, but the heart is bigger.", 
        loveLanguage: "New Experiences", 
        values: "Connection, Culture, Beauty",
        bio: "Building interfaces to connect the world. I love learning about new cultures and perspectives that challenge my own." 
    }
];

let activeGirl = null;

// STAGGERED LOAD LOGIC
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
            
            card.innerHTML = `
                <div class="img-box"><span class="status-tag">Online</span><img src="assets/images/girls/${g.img}"></div>
                <div class="info-box"><p>${g.role}</p><h3>${g.name}</h3></div>
            `;
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

function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('show');
}

// ASSERTIVE PROFILE POPULATION
function openProfile(id) {
    activeGirl = girls.find(x => x.id === id);
    
    document.getElementById('mName').innerText = activeGirl.name;
    document.getElementById('mRole').innerText = activeGirl.role;
    document.getElementById('mAge').innerText = activeGirl.age;
    document.getElementById('mLoc').innerText = activeGirl.loc;
    document.getElementById('mPers').innerText = activeGirl.pers;
    document.getElementById('mBio').innerText = activeGirl.bio;
    
    // Detailed Assertive Fields
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
    
    // Clear old messages and add a personality-driven greeting
    const chatWindow = document.getElementById('chatMessages') || document.getElementById('chatWindow');
    chatWindow.innerHTML = `<div style="margin-bottom:15px; padding:10px; background:#f0fdf4; border-radius:10px; border:1px solid #eaf7f0;">
        <strong>${activeGirl.name}:</strong> Hi! I'm ${activeGirl.name}. I noticed you were looking at my profile. I'm really glad you decided to reach out.
    </div>`;
}

function closeChat() { document.getElementById('chatWidget').style.display = 'none'; }

window.onload = loadGrid;
