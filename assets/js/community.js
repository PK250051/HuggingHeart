let selectedGirl = null;

async function loadGirls() {
    const grid = document.getElementById('observerGrid');
    try {
        const res = await fetch('data/stats/online_status.json');
        const girls = await res.json();

        grid.innerHTML = girls.map(girl => `
            <div class="observer-card" onclick="viewProfile('${girl.id}')">
                <img src="assets/images/girls/${girl.image}" alt="${girl.name}">
                <div class="obs-info">
                    <h3>${girl.name}</h3>
                    <p>${girl.job} • ${girl.country}</p>
                    <span style="color: #2f855a; font-size: 0.8rem; font-weight: 600;">${girl.personality_type}</span>
                </div>
            </div>
        `).join('');
    } catch (e) { console.error("Error loading girls", e); }
}

async function viewProfile(id) {
    const res = await fetch(`profiles/${id}.json`);
    selectedGirl = await res.json();
    
    document.getElementById('prof-img').src = `assets/images/girls/${selectedGirl.image}`;
    document.getElementById('prof-name').innerText = selectedGirl.name;
    document.getElementById('prof-bio').innerText = selectedGirl.bio;
    document.getElementById('profileOverlay').style.display = 'flex';
}

function closeProfile() {
    document.getElementById('profileOverlay').style.display = 'none';
}

function openChat() {
    closeProfile();
    document.getElementById('chatBox').style.display = 'flex';
    document.getElementById('chat-header-img').src = `assets/images/girls/${selectedGirl.image}`;
    document.getElementById('chat-header-name').innerText = selectedGirl.name;
    startChatEngine(selectedGirl);
}

function closeChat() {
    document.getElementById('chatBox').style.display = 'none';
}

window.onload = loadGirls;
