// assets/js/chat.js

let personalMaster = []; // G1_G25_One_Line_Answers.csv
let pqMaster = [];       // PQ_Master_List.csv
let personalityBank = []; // e.g., type_B1_very_shy.csv

async function initBrain(girlId, personalityFile) {
    // 1. Load PQ Master (The Question IDs)
    const pqRes = await fetch('data/questions/PQ_Master_List.csv');
    pqMaster = parseCSV(await pqRes.text());

    // 2. Load Personal Master (The Unique Answers)
    const pmRes = await fetch('data/answers/personal_master.csv');
    personalMaster = parseCSV(await pmRes.text());

    // 3. Load Personality Bank (The "Voice")
    const pbRes = await fetch(`data/answers/${personalityFile}`);
    personalityBank = parseCSV(await pbRes.text());
}

function getFinalResponse(userInput, girlId) {
    const input = userInput.toLowerCase().trim();

    // STEP A: Search for a Master Question Match (Personal)
    const masterMatch = pqMaster.find(m => input.includes(m.Question_Text.toLowerCase()));
    
    if (masterMatch) {
        const girlRow = personalMaster.find(row => row.Profile_ID === girlId);
        if (girlRow && girlRow[masterMatch.Q_ID]) {
            return girlRow[masterMatch.Q_ID]; // Returns Luna's specific age/job/city
        }
    }

    // STEP B: Search for Personality Match (General Chat)
    const personalityMatch = personalityBank.find(p => input.includes(p.Question.toLowerCase()));
    
    return personalityMatch ? personalityMatch.Response : "I'm not sure how to answer that... 🌸";
}
