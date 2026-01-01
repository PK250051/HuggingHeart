const girls = [
    { id: "G001", name: "Luna Sharma", age: 24, loc: "Mumbai", role: "Software Engineer", pers: "Bold Strategist", img: "G001_luna.jpg", bio: "Tech enthusiast with a love for deep logic and late-night philosophy." },
    { id: "G002", name: "Meera Iyer", age: 26, loc: "Bangalore", role: "UX Researcher", pers: "The Caretaker", img: "G002_meera.jpg", bio: "Fascinated by human behavior and digital empathy." },
    { id: "G003", name: "Ananya Rai", age: 21, loc: "Delhi", role: "Digital Artist", pers: "Creative Soul", img: "G003_ananya.jpg", bio: "I see the world in colors and believe every pixel tells a story." },
    { id: "G004", name: "Isha Verma", age: 23, loc: "Pune", role: "Data Scientist", pers: "The Analyst", img: "G004_isha.jpg", bio: "Searching for patterns in the chaos and beauty in numbers." },
    { id: "G005", name: "Riya Kapoor", age: 24, loc: "Chennai", role: "Designer", pers: "The Techie", img: "G005_riya.jpg", bio: "Blending tech logic with modern style." },
    { id: "G006", name: "Sofia Verma", age: 20, loc: "Sydney", role: "HR Executive", pers: "Gentle Caretaker", img: "G006_sofia.jpg", bio: "Focused on helping others find their true path in life." },
    { id: "G007", name: "Olivia Singh", age: 22, loc: "Toronto", role: "Strategic Analyst", pers: "The Strategist", img: "G007_olivia.jpg", bio: "Maintains a perfect work-life balance and values clear minds." },
    { id: "G008", name: "Aarohi Gupta", age: 30, loc: "Hyderabad", role: "Content Writer", pers: "Intellectual", img: "G008_aarohi.jpg", bio: "Words are my soul. I find peace in quiet libraries." },
    { id: "G009", name: "Emma Watson", age: 25, loc: "London", role: "Operations Lead", pers: "Efficient Leader", img: "G009_emma.jpg", bio: "Always looking for the most efficient path forward." },
    { id: "G010", name: "Amelia Chen", age: 22, loc: "Singapore", role: "Frontend Dev", pers: "Globalist", img: "G010_amelia.jpg", bio: "Building beautiful interfaces for a more connected world." }
];

let activeGirl = null;

function loadGrid() {
    const grid = document.getElementById('gridContainer');
    if(!grid) return;
    grid.innerHTML = "";
    
    // Create the "Discovering Souls" status element
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

            // Hide status when finished
            if(index === girls.length - 1) {
                setTimeout(() => {
                    statusDiv.style.opacity = "0";
                    setTimeout(() => statusDiv.remove(), 500);
                }, 1000);
            }
        }, index * 1000); // Relax Mode: 1 second delay per girl
    });
}

function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('show');
}

function openProfile(id) {
    activeGirl = girls.find(x => x.id === id);
    document.getElementById('mName').innerText = activeGirl.name;
    document.getElementById('mRole').innerText = activeGirl.role;
    document.getElementById('mAge').innerText = activeGirl.age;
    document.getElementById('mLoc').innerText = activeGirl.loc;
    document.getElementById('mPers').innerText = activeGirl.pers;
    document.getElementById('mBio').innerText = activeGirl.bio;
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
}

function closeChat() { document.getElementById('chatWidget').style.display = 'none'; }

window.onload = loadGrid;
