const { callAI, cleanJsonResponse } = require("../utils/ai.util");
const { detectLanguageSimple } = require("../utils/language.util");

/**
 * Generate quiz questions from text using AI
 * @param {string} text - Text to generate quiz from
 * @param {number} numberOfQuestions - Number of questions to generate
 * @returns {Promise<Array>} - Array of quiz questions
 */
async function generateQuiz(text, numberOfQuestions = 5) {
  const numQuestions = Math.min(Math.max(parseInt(numberOfQuestions) || 5, 1), 20);
  const textSample = text.substring(0, 500);
  const detectedLanguage = detectLanguageSimple(textSample);

  const prompt = `You are an expert teacher. The text is in ${detectedLanguage}.

Create exactly ${numQuestions} multiple choice questions IN ${detectedLanguage}.

IMPORTANT: All questions and options MUST be written in ${detectedLanguage}.

**Requirements:**
- Write questions and options in ${detectedLanguage}
- Each question should test understanding of key concepts
- Provide 4 options for each question
- Include a mix of factual and conceptual questions

**Return ONLY valid JSON** (no markdown):
{"questions":[{"question":"Question in ${detectedLanguage}?","options":["Option A","Option B","Option C","Option D"],"correctAnswer":0}]}

**Text:**
${text}`;

  let content = await callAI(prompt);
  content = cleanJsonResponse(content);
  
  const json = JSON.parse(content);
  // Handle various JSON structures
  return json.questions || json.quiz || json;
}

module.exports = {
  generateQuiz
};

