/* =========================
   GLOBAL STATE
========================= */
window.activeGirl = null;

/* =========================
   LOAD COMMUNITY CARDS
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("girlGrid");
  if (!grid) return; // not on community page

  const girlIds = [
    "G001","G002","G003","G004","G005",
    "G006","G007","G008","G009","G010"
  ];

  let index = 0;

  function loadNext() {
    if (index >= girlIds.length) return;

    const id = girlIds[index];
    fetch(`profiles/${id}.json`)
      .then(res => res.json())
      .then(girl => {
        const card = document.createElement("div");
        card.className = "girl-card";

        card.innerHTML = `
          <div class="status-dot"></div>
          <img src="assets/images/girls/${girl.image}">
          <div class="girl-info">
            <h3>${girl.name}</h3>
            <p>${girl.job} • ${girl.country}</p>
          </div>
        `;

        card.onclick = () => openProfile(girl);

        grid.appendChild(card);

        index++;
        setTimeout(loadNext, 800); // staggered load
      })
      .catch(err => {
        console.error("Profile load failed:", id, err);
        index++;
        loadNext();
      });
  }

  loadNext();
});

/* =========================
   PROFILE MODAL
========================= */
function openProfile(girl) {
  window.activeGirl = girl;

  document.getElementById("mImg").src =
    `assets/images/girls/${girl.image}`;
  document.getElementById("mName").innerText = girl.name;
  document.getElementById("mBio").innerText = girl.bio;

  document.getElementById("pModal").style.display = "flex";
}

function closeProfile() {
  document.getElementById("pModal").style.display = "none";
}

/* =========================
   CHAT WIDGET
========================= */
function openChat() {
  if (!window.activeGirl) return;

  document.getElementById("chatName").innerText =
    window.activeGirl.name;

  document.getElementById("chatWidget").style.display = "block";
  document.getElementById("pModal").style.display = "none";
}

function closeChat() {
  document.getElementById("chatWidget").style.display = "none";
}
