let currentProfile = {};
let personalityAnswers = [];
let personalAnswers = [];
let pqMaster = [];

async function initChat() {
    const params = new URLSearchParams(window.location.search);
    const girlId = params.get('id') || 'G001';

    try {
        // Load the specific profile
        const profileRes = await fetch(`profiles/${girlId}.json`);
        currentProfile = await profileRes.json();

        // Load PQ Master List (To find Question IDs)
        const pqRes = await fetch('data/questions/PQ_Master_List.csv');
        pqMaster = parseCSV(await pqRes.text());

        // Load Personal Answers (G1-G25 Master)
        const personalRes = await fetch('data/questions/PQ_40_Personal_Questions.csv');
        personalAnswers = parseCSV(await personalRes.text());

        // Load her specific Personality Voice
        const voiceRes = await fetch(`data/answers/${currentProfile.answer_file}`);
        personalityAnswers = parseCSV(await voiceRes.text());

        console.log(`Chatting with ${currentProfile.name} (${currentProfile.personality_type})`);
    } catch (err) {
        console.error("Path Error! Check folder names:", err);
    }
}

function getReply(userInput) {
    const text = userInput.toLowerCase().trim();

    // 1. Try to find a Personal Answer first
    const pqMatch = pqMaster.find(m => text.includes(m.Question_Text.toLowerCase()));
    if (pqMatch) {
        const girlData = personalAnswers.find(row => row.Profile_ID === currentProfile.id);
        if (girlData && girlData[pqMatch.Q_ID]) {
            return girlData[pqMatch.Q_ID]; 
        }
    }

    // 2. Fallback to Personality Voice
    const voiceMatch = personalityAnswers.find(v => 
        text.includes(v.Question?.toLowerCase()) || 
        text.includes(v['Common Question']?.toLowerCase())
    );

    return voiceMatch ? (voiceMatch.Response || voiceMatch[Object.keys(voiceMatch)[1]]) : "I'm not sure how to say that... 🌸";
}

// Simple CSV Helper
function parseCSV(text) {
    const lines = text.split('\n').filter(l => l.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((h, i) => obj[h] = values[i]?.trim());
        return obj;
    });
}

initChat();
