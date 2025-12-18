const { callAI, cleanJsonResponse } = require("../utils/ai.util");
const { detectLanguageSimple } = require("../utils/language.util");

/**
 * Extract keywords from text using AI
 * @param {string} text - Text to extract keywords from
 * @returns {Promise<Array<string>>} - Array of keywords
 */
async function extractKeywords(text) {
  const textSample = text.substring(0, 500);
  const detectedLanguage = detectLanguageSimple(textSample);

  const prompt = `Extract 5 main keywords from this ${detectedLanguage} text. Keywords must be in ${detectedLanguage}. Return JSON only: {"keywords":["keyword1","keyword2","keyword3","keyword4","keyword5"]}\n\nText:\n${text}`;

  let content = await callAI(prompt);
  content = cleanJsonResponse(content);
  
  const json = JSON.parse(content);
  return json.keywords || [];
}

module.exports = {
  extractKeywords
};

