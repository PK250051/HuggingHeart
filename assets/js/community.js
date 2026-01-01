// assets/js/community.js
document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('observerGrid');
    
    try {
        const response = await fetch('data/stats/online_status.json');
        const girls = await response.json();

        grid.innerHTML = girls.map(girl => `
            <a href="profile.html?id=${girl.id}" class="observer-card">
                <img src="assets/images/girls/${girl.image}" alt="${girl.name}">
                <div class="observer-info">
                    <h3>${girl.name}</h3>
                    <p>${girl.job} • ${girl.country}</p>
                    <div class="status-tag">${girl.personality_type}</div>
                </div>
            </a>
        `).join('');
    } catch (error) {
        console.error("Error loading community:", error);
    }
});
