const girls = [
    { id: "G001", name: "Luna Sharma", role: "Software Engineer", img: "G001_luna.jpg", motto: "Code is logic, but life is art.", loveLanguage: "Intellectual Depth", values: "Honesty, Growth", bio: "Tech enthusiast." },
    { id: "G002", name: "Meera Iyer", role: "UX Researcher", img: "G002_meera.jpg", motto: "Empathy is power.", loveLanguage: "Quality Time", values: "Kindness", bio: "Fascinated by behavior." },
    { id: "G003", name: "Ananya Rai", role: "Digital Artist", img: "G003_ananya.jpg", motto: "Pixels tell stories.", loveLanguage: "Words", values: "Expression", bio: "Color is life." },
    { id: "G004", name: "Isha Verma", role: "Data Scientist", img: "G004_isha.jpg", motto: "Variables and constants.", loveLanguage: "Service", values: "Precision", bio: "Finding patterns." },
    { id: "G005", name: "Riya Kapoor", role: "Designer", img: "G005_riya.jpg", motto: "Simple is better.", loveLanguage: "Gifts", values: "Style", bio: "Tech meets art." },
    { id: "G006", name: "Sofia Verma", role: "HR Executive", img: "G006_sofia.jpg", motto: "Kindness is universal.", loveLanguage: "Presence", values: "Harmony", bio: "Helping hearts." },
    { id: "G007", name: "Olivia Singh", role: "Strategic Analyst", img: "G007_olivia.jpg", motto: "Create balance.", loveLanguage: "Stimulation", values: "Clarity", bio: "Work-life flow." },
    { id: "G008", name: "Aarohi Gupta", role: "Content Writer", img: "G008_aarohi.jpg", motto: "Stories end.", loveLanguage: "Conversation", values: "Wisdom", bio: "Old soul." },
    { id: "G009", name: "Emma Watson", role: "Operations Lead", img: "G009_emma.jpg", motto: "Be effective.", loveLanguage: "Goals", values: "Action", bio: "Efficiency first." },
    { id: "G010", name: "Amelia Chen", role: "Frontend Dev", img: "G010_amelia.jpg", motto: "Heart is bigger.", loveLanguage: "Experiences", values: "Beauty", bio: "Connecting world." }
];

function loadGrid() {
    const grid = document.getElementById('gridContainer');
    if(!grid) return;
    grid.innerHTML = "";

    // Staggered Load: 1 girl every 800ms for "Relax Mode"
    girls.forEach((g, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'girl-card';
            card.onclick = () => openProfile(g.id);
            card.innerHTML = `
                <div class="img-box">
                    <span class="status-tag"><span class="green-bulb"></span> Online</span>
                    <img src="assets/images/girls/${g.img}" alt="${g.name}">
                </div>
                <div class="info-box">
                    <p>${g.role}</p>
                    <h3>${g.name}</h3>
                </div>
            `;
            grid.appendChild(card);
        }, index * 800);
    });
}

function openProfile(id) {
    const activeGirl = girls.find(x => x.id === id);
    document.getElementById('mName').innerText = activeGirl.name;
    document.getElementById('mImg').style.backgroundImage = `url('assets/images/girls/${activeGirl.img}')`;
    document.getElementById('pModal').style.display = 'flex';
}

function closeProfile() { document.getElementById('pModal').style.display = 'none'; }

window.onload = loadGrid;
