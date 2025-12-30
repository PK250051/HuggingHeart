// assets/js/community.js

async function loadCommunity() {
    const grid = document.getElementById('girlGrid');
    if (!grid) return;

    try {
        // Based on your folder structure, we go up to find the data folder
        const response = await fetch('data/stats/online_status.json'); 
        
        if (!response.ok) {
            throw new Error("Could not find online_status.json");
        }

        const girls = await response.json();

        grid.innerHTML = girls.map(girl => `
            <div class="card" onclick="goToChat('${girl.id}')">
                <img src="assets/images/girls/${girl.image}" onerror="this.src='assets/images/girls/default.jpg'">
                <div class="status-dot ${girl.online ? 'online' : ''}"></div>
                <div class="card-info">
                    <h3>${girl.name}</h3>
                    <p>${girl.job} • ${girl.country}</p>
                    <span class="type-tag">${girl.personality_type}</span>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error("Critical Error loading community:", error);
        grid.innerHTML = `<p style="color:red">Error: ${error.message}. Check if your JSON file exists in /data/stats/</p>`;
    }
}

function goToChat(girlId) {
    window.location.href = `chat.html?id=${girlId}`;
}

// This ensures the code runs after the page is ready
document.addEventListener('DOMContentLoaded', loadCommunity);
