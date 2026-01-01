let currentGirl = {}; // Stores Luna's profile
let personalityBank = []; // Stores the B1 responses
let suggestionList = []; // Stores the PQ suggestions

async function initChat() {
    try {
        // 1. Load the Profile (Luna)
        const profileRes = await fetch('profiles/G001_luna.json');
        currentGirl = await profileRes.json();

        // 2. Load the Personality (B1 Answers)
        const answerRes = await fetch(`data/answers/${currentGirl.type_file}`);
        const answerData = await answerRes.text();
        personalityBank = parseCSV(answerData);

        // 3. Load Suggestions (PQ Master)
        const suggRes = await fetch('data/questions/PQ_Master_List.csv');
        const suggData = await suggRes.text();
        suggestionList = parseCSV(suggData);

        console.log("System Ready: Chatting with " + currentGirl.name);
    } catch (err) {
        console.error("Path Error: Check if folders and files are named correctly.", err);
    }
}

// Simple CSV Parser
function parseCSV(data) {
    const rows = data.split('\n');
    return rows.slice(1).map(row => {
        const columns = row.split(',');
        return { 
            q: columns[0]?.trim().toLowerCase(), 
            a: columns[1]?.trim() 
        };
    }).filter(item => item.q);
}

// Handle User Messages
function getReply(userInput) {
    const input = userInput.toLowerCase().trim();
    // Search the personality bank for a matching question
    const match = personalityBank.find(item => input.includes(item.q) || item.q.includes(input));
    
    return match ? match.a : "i... i don't know what to say to that. 🌸";
}

initChat();
