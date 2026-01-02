let girlId = sessionStorage.getItem("girlId");
let answerFile = sessionStorage.getItem("answerFile");

let PQ = [];
let PQ_ANS = [];
let PERSONALITY = [];

function parseCSV(text) {
  const rows = [];
  let row = [], cell = "", inside = false;
  for (let c of text) {
    if (c === '"') inside = !inside;
    else if (c === ',' && !inside) {
      row.push(cell); cell = "";
    } else if (c === '\n') {
      row.push(cell); rows.push(row);
      row = []; cell = "";
    } else cell += c;
  }
  row.push(cell); rows.push(row);
  return rows;
}

Promise.all([
  fetch("data/questions/PQ_40_Personal_Questions.csv").then(r=>r.text()),
  fetch("data/questions/PQ_40_Personal_Answer.csv").then(r=>r.text()),
  fetch(`data/answers/${answerFile}`).then(r=>r.text())
]).then(([pq, ans, per]) => {
  PQ = parseCSV(pq);
  PQ_ANS = parseCSV(ans);
  PERSONALITY = parseCSV(per);
});

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.toLowerCase();
  input.value = "";
  addChat("You", text);

  let reply = doubleScan(text);
  addChat("Her", reply);
}

function doubleScan(text) {
  // SCAN 1 – PERSONAL QUESTIONS
  for (let i=1;i<PQ.length;i++) {
    if (text.includes(PQ[i][1].toLowerCase())) {
      for (let j=1;j<PQ_ANS.length;j++) {
        if (PQ_ANS[j][0] === PQ[i][0] &&
            PQ_ANS[j][1] === girlId) {
          return PQ_ANS[j][2];
        }
      }
    }
  }

  // SCAN 2 – PERSONALITY FILE
  for (let i=1;i<PERSONALITY.length;i++) {
    if (text.includes(PERSONALITY[i][0].toLowerCase())) {
      return PERSONALITY[i][1];
    }
  }

  return "Hmm… tell me more.";
}

function addChat(sender, text) {
  const box = document.getElementById("chatBox");
  box.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
}

function showSuggestions() {
  const val = document.getElementById("userInput").value.toLowerCase();
  const sug = document.getElementById("suggestions");
  sug.innerHTML = "";

  PQ.forEach((r,i)=>{
    if (i>0 && r[1].toLowerCase().includes(val)) {
      sug.innerHTML += `<div>${r[1]}</div>`;
    }
  });
}
