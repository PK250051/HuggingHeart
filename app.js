/* ===================================================
   HUGGINGHEART - FULL DATABASE & PERSONALITY ENGINE
   =================================================== */

const girls = [
    { id: "G001", name: "Luna Sharma", type: "B1_very_shy", img: "G001_luna.jpg" },
    { id: "G002", name: "Meera Iyer", type: "B2_shy", img: "G002_meera.jpg" },
    { id: "G003", name: "Ananya Rai", type: "B3_soft", img: "G003_ananya.jpg" },
    { id: "G004", name: "Isha Verma", type: "B4_balanced", img: "G004_isha.jpg" },
    { id: "G005", name: "Riya Kapoor", type: "B5_confident", img: "G005_riya.jpg" },
    { id: "G006", name: "Sofia Verma", type: "B6_witty", img: "G006_sofia.jpg" },
    { id: "G007", name: "Olivia Singh", type: "B7_bold", img: "G007_olivia.jpg" },
    { id: "G008", name: "Aarohi Gupta", type: "B8_daring", img: "G008_aarohi.jpg" },
    { id: "G009", name: "Emma Watson", type: "B9_gen_z", img: "G009_emma.jpg" },
    { id: "G010", name: "Amelia Chen", type: "B10_wild", img: "G010_amelia.jpg" }
];

let activeGirl = null;
let pqQuestions = [];
let pqAnswers = [];
let personalityData = [];

/**
 * ROBUST CSV PARSER
 * Handles commas inside quotes and complex sentences.
 */
function parseCSV(text) {
    const rows = text.split('\n').filter(row => row.trim() !== "");
    return rows.map(row => {
        // Regex to handle quoted strings containing commas
        const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        return matches ? matches.map(val => val.replace(/"/g, "").trim()) : row.split(',');
    });
}

/**
 * PRE-LOAD CORE DATABASES
 */
async function loadDatabases() {
    try {
        const [qRes, aRes] = await Promise.all([
            fetch('data/questions/PQ_40_Personal_Questions.csv').then(r => r.text()),
            fetch('data/questions/PQ_40_Personal_Answer.csv').then(r => r.text())
        ]);
        pqQuestions = parseCSV(qRes);
        pqAnswers = parseCSV(aRes);
        console.log("Global Databases Loaded.");
    } catch (e) {
        console.error("Critical: Could not load Question Databases.", e);
    }
}

/**
 * OPEN CHAT & LOAD PERSONALITY
 */
async function openChat() {
    closeProfile();
    const widget = document.getElementById('chatWidget');
    const windowDiv = document.getElementById('chatWindow');
    
    widget.style.display = 'flex';
    document.getElementById('chatName').innerText = activeGirl.name;
    document.getElementById('chatAvatar').src = `assets/images/girls/${activeGirl.img}`;
    windowDiv.innerHTML = "";

    // Load the specific B1-B10 file for this girl
    try {
        const pRes = await fetch(`data/answers/type_${activeGirl.type}.csv`).then(r => r.text());
        personalityData = parseCSV(pRes);
    } catch (e) {
        console.error("Personality File Missing.");
    }

    // Sequence: Hi -> Typing -> Ask Name
    addMessage(`Hi! I'm ${activeGirl.name}. 😊`, 'bot');

    setTimeout(() => {
        showTyping(true);
        showSuggestions(); // Light gray suggestions during typing
        setTimeout(() => {
            showTyping(false);
            addMessage(`I'm really glad we're talking. Before we start, what is your name?`, 'bot');
        }, 1500); 
    }, 1000);
}

/**
 * RESPONSE LOGIC (STRICT DATABASE)
 */
function generateBotResponse(userMsg) {
    const cleanMsg = userMsg.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    let botReply = "";

    // LAYER 1: Search the 40 Personal Questions (PQ_40)
    const pqMatch = pqQuestions.find(row => row[1] && row[1].toLowerCase().replace(/[^\w\s]/gi, '') === cleanMsg);
    
    if (pqMatch) {
        const qID = pqMatch[0]; // e.g. PQ13
        const girlRow = pqAnswers.find(row => row[0] === activeGirl.id);
        const qHeaders = pqAnswers[0];
        const qIndex = qHeaders.indexOf(qID);
        if (girlRow && qIndex !== -1) {
            botReply = girlRow[qIndex];
        }
    }

    // LAYER 2: Search the 100+ Personality Profile Questions (B1-B10)
    if (!botReply) {
        const persMatch = personalityData.find(row => row[0] && row[0].toLowerCase().replace(/[^\w\s]/gi, '') === cleanMsg);
        if (persMatch) {
            botReply = persMatch[1];
        }
    }

    // LAYER 3: Fallback
    if (!botReply) {
        botReply = "I... I'm not sure how to answer that yet. Ask me something from my profile?";
    }

    // Sequential Reply
    setTimeout(() => {
        showTyping(true);
        showSuggestions(); // Hint for the next interaction
        setTimeout(() => {
            showTyping(false);
            addMessage(botReply, 'bot');
        }, 1500);
    }, 800);
}

/**
 * LIGHT GRAY SUGGESTIONS
 */
function showSuggestions() {
    const windowDiv = document.getElementById('chatWindow');
    // Remove old suggestions
    const old = document.getElementById('current-suggestions');
    if(old) old.remove();

    const container = document.createElement('div');
    container.id = "current-suggestions";
    container.style = "padding: 5px 15px; display: flex; flex-wrap: wrap; gap: 10px;";

    // Select 2 random hints from the PQ_40 list
    const hints = pqQuestions.slice(1, 41).sort(() => 0.5 - Math.random()).slice(0, 2);

    hints.forEach(h => {
        const span = document.createElement('span');
        span.className = "suggestion-text";
        span.innerText = `Ask: "${h[1]}"`;
        span.onclick = () => {
            document.getElementById('chatInput').value = h[1];
            container.remove();
            handleChatInput({ key: 'Enter', target: document.getElementById('chatInput') });
        };
        container.appendChild(span);
    });

    windowDiv.appendChild(container);
    windowDiv.scrollTop = windowDiv.scrollHeight;
}

// ... helper functions (handleChatInput, addMessage, showTyping, loadGrid, etc.)

window.onload = () => {
    loadDatabases();
    loadGrid();
    document.getElementById('chatInput').addEventListener('keypress', handleChatInput);
};
