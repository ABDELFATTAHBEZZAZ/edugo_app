const { callAI } = require("../utils/ai.util");
const { detectLanguage } = require("../utils/language.util");

/**
 * Generate a summary from text using AI
 * @param {string} text - Text to summarize
 * @returns {Promise<string>} - Generated summary
 */
async function generateSummary(text) {
  const textSample = text.substring(0, 500);
  const { detectedLanguage, languageInstruction } = detectLanguage(textSample);

  const prompt = `You are an expert educational content summarizer. The text is in ${detectedLanguage}.

${languageInstruction}

Create a comprehensive and well-structured summary of the following text IN ${detectedLanguage}.

**Requirements:**
- Write the ENTIRE summary in ${detectedLanguage}
- Use **bold** for key terms and important concepts
- Use bullet points (•) for listing multiple items
- Include section headers where appropriate
- Make the summary detailed enough to be useful for studying (at least 3-4 paragraphs)
- Highlight the main ideas, key concepts, and important details

**Text to summarize:**
${text}

**Provide a detailed summary in ${detectedLanguage}:**`;

  return await callAI(prompt);
}

module.exports = {
  generateSummary
};

