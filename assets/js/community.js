let activeGirl = null;

document.addEventListener("DOMContentLoaded", loadGirls);

async function loadGirls() {
  const grid = document.getElementById("girlGrid");
  if (!grid) {
    console.error("girlGrid not found");
    return;
  }

  const ids = [
    "G001","G002","G003","G004","G005",
    "G006","G007","G008","G009","G010"
  ];

  for (let id of ids) {
    try {
      const res = await fetch(`profiles/${id}.json`);
      const girl = await res.json();

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

      await new Promise(r => setTimeout(r, 400));
    } catch (e) {
      console.error("Failed loading", id, e);
    }
  }
}

function openProfile(girl) {
  activeGirl = girl;

  document.getElementById("mImg").src =
    `assets/images/girls/${girl.image}`;
  document.getElementById("mName").innerText = girl.name;
  document.getElementById("mBio").innerText = girl.bio;

  document.getElementById("pModal").style.display = "flex";
}

function closeProfile() {
  document.getElementById("pModal").style.display = "none";
}

function openChat() {
  if (!activeGirl) return;

  document.getElementById("chatName").innerText = activeGirl.name;
  document.getElementById("chatWidget").style.display = "block";
  closeProfile();
}

function closeChat() {
  document.getElementById("chatWidget").style.display = "none";
}
