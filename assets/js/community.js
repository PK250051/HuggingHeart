// assets/js/community.js

async function loadCommunity() {
    const grid = document.getElementById('girlGrid');
    if (!grid) return;

    try {
        // Fetching from your data/stats folder
        const response = await fetch('data/stats/online_status.json'); 
        
        if (!response.ok) {
            throw new Error("Could not load data. Ensure you are using a local server.");
        }

        const girls = await response.json();

        // Render the girls to the grid
        grid.innerHTML = girls.map(girl => `
            <div class="card" onclick="goToChat('${girl.id}')">
                <img src="assets/images/girls/${girl.image}" onerror="this.src='assets/images/ui/default-avatar.png'">
                <div class="status-dot ${girl.online ? 'online' : ''}"></div>
                <div class="card-info">
                    <h3>${girl.name}</h3>
                    <p>${girl.job || 'Professional'} • ${girl.country || 'Global'}</p>
                    <span class="type-tag">${girl.personality_type}</span>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error("Error:", error);
        grid.innerHTML = `<p style="text-align:center; color:red;">Error: ${error.message}<br>Make sure data/stats/online_status.json exists.</p>`;
    }
}

function goToChat(girlId) {
    // Navigates to chat page with the girl's unique ID
    window.location.href = `chat.html?id=${girlId}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadCommunity);
