// DATABASE OF ALL 10 GIRLS
const girls = [
    { id: "G001", name: "Luna Sharma", age: 24, loc: "Mumbai", country: "India", role: "Software Engineer", pers: "The Bold Strategist", img: "G001_luna.jpg", bio: "Tech enthusiast with a love for deep logic and late-night philosophy." },
    { id: "G002", name: "Meera Iyer", age: 26, loc: "Bangalore", country: "India", role: "UX Researcher", pers: "The Caretaker", img: "G002_meera.jpg", bio: "Fascinated by human behavior and creating digital empathy." },
    { id: "G003", name: "Ananya Rai", age: 21, loc: "Delhi", country: "India", role: "Digital Artist", pers: "Creative Soul", img: "G003_ananya.jpg", bio: "I see the world in colors and believe every pixel tells a story." },
    { id: "G004", name: "Isha Verma", age: 23, loc: "Pune", country: "India", role: "Data Scientist", pers: "The Analyst", img: "G004_isha.jpg", bio: "Searching for patterns in the chaos and beauty in numbers." },
    { id: "G005", name: "Riya Kapoor", age: 24, loc: "Chennai", country: "India", role: "Designer", pers: "The Techie", img: "G005_riya.jpg", bio: "Blending tech logic with modern visual style." },
    { id: "G006", name: "Sofia Verma", age: 20, loc: "Sydney", country: "Australia", role: "HR Executive", pers: "Gentle Caretaker", img: "G006_sofia.jpg", bio: "Focused on helping others find their true path in life." },
    { id: "G007", name: "Olivia Singh", age: 22, loc: "Toronto", country: "Canada", role: "Strategic Analyst", pers: "The Strategist", img: "G007_olivia.jpg", bio: "Maintains a perfect work-life balance and values clear minds." },
    { id: "G008", name: "Aarohi Gupta", age: 30, loc: "Hyderabad", country: "India", role: "Content Writer", pers: "Intellectual", img: "G008_aarohi.jpg", bio: "Words are my soul. I find peace in quiet libraries." },
    { id: "G009", name: "Emma Watson", age: 25, loc: "London", country: "UK", role: "Operations Lead", pers: "Efficient Leader", img: "G009_emma.jpg", bio: "Always looking for the most efficient path forward." },
    { id: "G010", name: "Amelia Chen", age: 22, loc: "Singapore", country: "Singapore", role: "Frontend Dev", pers: "Globalist", img: "G010_amelia.jpg", bio: "Building beautiful interfaces for a more connected world." }
];

let activeGirl = null;

// RENDER GRID AUTOMATICALLY
function loadCommunityGrid() {
    const grid = document.getElementById('grid');
    if(!grid) return;
    grid.innerHTML = "";
    girls.forEach(g => {
        grid.innerHTML += `
            <div class="girl-card" onclick="openProfile('${g.id}')">
                <div class="img-box"><span class="status-tag">Online</span><img src="assets/images/girls/${g.img}"></div>
                <div class="info-box"><p>${g.role}</p><h3>${g.name}</h3></div>
            </div>`;
    });
}

// PROFILE LOGIC
function openProfile(id) {
    activeGirl = girls.find(x => x.id === id);
    document.getElementById('mName').innerText = activeGirl.name;
    document.getElementById('mRole').innerText = activeGirl.role;
    document.getElementById('mAge').innerText = activeGirl.age;
    document.getElementById('mLoc').innerText = activeGirl.loc + ", " + activeGirl.country;
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

// CHAT LOGIC (RIGHT BOTTOM)
function openChat() {
    closeProfile();
    document.getElementById('chatWidget').style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatImg').src = `assets/images/girls/${activeGirl.img}`;
}

function closeChat() {
    document.getElementById('chatWidget').style.display = 'none';
}

// Toggle Mobile Menu
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('show');
}

// Initialize
window.onload = function() {
    loadCommunityGrid();
}
