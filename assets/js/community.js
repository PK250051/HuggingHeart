// assets/js/community.js

async function loadCommunity() {
    const grid = document.getElementById('girl-grid'); // Ensure your HTML has this ID
    if (!grid) return;

    try {
        const response = await fetch('data/stats/online_status.json');
        const girls = await response.json();

        grid.innerHTML = girls.map(girl => `
            <div class="card" onclick="window.location.href='chat.html?id=${girl.id}'">
                <img src="assets/images/girls/${girl.id.toLowerCase()}.jpg" onerror="this.src='assets/images/girls/default.jpg'">
                <div class="status-dot ${girl.online ? 'online' : ''}"></div>
                <h3>${girl.name}</h3>
                <p>${girl.type}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error("Failed to load community:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadCommunity);
