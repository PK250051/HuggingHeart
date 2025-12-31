// assets/js/chat.js

let lunaAnswers = [];
let masterQuestions = [];

// 1. Initialize Chat and Load Data
async function initChat() {
    try {
        // Load Luna's personality (B1)
        const respA = await fetch('data/personalities/type_B1_very_shy.csv');
        const textA = await respA.text();
        lunaAnswers = parseCSV(textA);

        // Load Master Questions for Suggestions
        const respQ = await fetch('data/questions/PQ_master.csv');
        const textQ = await respQ.text();
        masterQuestions = parseCSV(textQ);

        addMessage("Luna", "Hi! I'm Luna. I'm a bit shy... but I'd love to talk. What's on your mind?");
    } catch (err) {
        console.error("File loading failed. Check your data folder paths.", err);
    }
}

// 2. Suggestion Logic (Matches while you type)
function handleTyping(val) {
    const box = document.getElementById('suggestion-box');
    if (val.length < 2) {
        box.style.display = 'none';
        return;
    }

    const matches = masterQuestions.filter(q => 
        q.question.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 3);

    if (matches.length > 0) {
        box.innerHTML = matches.map(m => `
            <div class="sugg-item" onclick="applySuggestion('${m.question.replace(/'/g, "\\'")}')">
                ${m.question}
            </div>
        `).join('');
        box.style.display = 'block';
    } else {
        box.style.display = 'none';
    }
}

function applySuggestion(text) {
    document.getElementById('user-input').value = text;
    document.getElementById('suggestion-box').style.display = 'none';
    processUserMessage(text);
}

// 3. Messaging Logic
function processUserMessage(text) {
    addMessage("You", text);
    
    // Find the answer in the personality CSV
    const match = lunaAnswers.find(a => 
        text.toLowerCase().includes(a.question.toLowerCase())
    );

    setTimeout(() => {
        const reply = match ? match.answer : "That's a nice question... I'm not sure how to answer yet. Tell me more about you?";
        addMessage("Luna", reply);
    }, 800);
}

// 4. Helper: Parse CSV Text
function parseCSV(text) {
    return text.split('\n').slice(1).map(line => {
        const parts = line.split(',');
        return { 
            question: parts[0]?.trim(), 
            answer: parts[1]?.trim() 
        };
    }).filter(item => item.question);
}

// 5. Helper: UI Message Appending
function addMessage(sender, text) {
    const window = document.getElementById('chat-window');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender.toLowerCase()}`;
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    window.appendChild(msgDiv);
    window.scrollTop = window.scrollHeight;
}

// Event Listeners
document.getElementById('send-btn').addEventListener('click', () => {
    const input = document.getElementById('user-input');
    const val = input.value.trim();
    if(val) {
        processUserMessage(val);
        input.value = "";
    }
});

// Run on load
initChat();
