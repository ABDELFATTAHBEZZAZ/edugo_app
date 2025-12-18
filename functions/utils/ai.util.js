const fetch = require("node-fetch");

// Groq API configuration
const GROQ_API_KEY = "VOTRE_CLE_API_ICI";
const GROQ_MODEL = "llama-3.3-70b-versatile";

/**
 * Call Groq AI API with a prompt
 * @param {string} prompt - The prompt to send to AI
 * @returns {Promise<string>} - AI response content
 */
async function callAI(prompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 8192,
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Clean JSON response from AI (remove markdown code blocks)
 * @param {string} content - Raw AI response
 * @returns {string} - Cleaned JSON string
 */
function cleanJsonResponse(content) {
  let cleaned = content.replace(/```json/g, "").replace(/```/g, "").trim();

  // Find JSON object boundaries
  const jsonStart = cleaned.indexOf("{");
  const jsonEnd = cleaned.lastIndexOf("}") + 1;

  if (jsonStart !== -1 && jsonEnd > jsonStart) {
    cleaned = cleaned.substring(jsonStart, jsonEnd);
  }

  return cleaned;
}

module.exports = {
  callAI,
  cleanJsonResponse
};

