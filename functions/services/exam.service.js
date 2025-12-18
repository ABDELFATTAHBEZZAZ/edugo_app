const { callAI, cleanJsonResponse } = require("../utils/ai.util");
const { detectLanguageForExam } = require("../utils/language.util");

/**
 * Generate exam questions from content using AI
 * @param {string} content - Content to generate exam from
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @param {number} totalScore - Total score for the exam
 * @param {number} numberOfQuestions - Number of questions to generate
 * @returns {Promise<Array>} - Array of exam questions
 */
async function generateExam(content, difficulty, totalScore, numberOfQuestions) {
  const total = parseInt(totalScore) || 20;
  const numQuestions = parseInt(numberOfQuestions) || 10;
  const difficultyLevel = difficulty || "medium";

  // Determine question style based on difficulty
  let questionStyle = "";
  if (difficultyLevel === "easy") {
    questionStyle = `Create DEFINITION and DIRECT RECALL questions using: "What is...", "Define...", "List...", "Name..."`;
  } else if (difficultyLevel === "medium") {
    questionStyle = `Create APPLICATION questions using: "Explain...", "Compare...", "Describe...", "How does..."`;
  } else {
    questionStyle = `Create ANALYSIS questions using: "Analyze...", "Evaluate...", "Why...", "What would happen if..."`;
  }

  // Calculate points per question
  const pointsPerQuestion = Math.round((total / numQuestions) * 100) / 100;

  // Detect language from content
  const contentSample = content.substring(0, 500);
  const detectedLanguage = detectLanguageForExam(contentSample);

  const prompt = `You are creating an exam. The content is in ${detectedLanguage}.

**ABSOLUTE REQUIREMENT: ALL questions and answers MUST be written in ${detectedLanguage}. DO NOT translate to English if the content is in French.**

Generate exactly ${numQuestions} exam questions.

RULES:
1. WRITE ALL QUESTIONS IN ${detectedLanguage} - THIS IS MANDATORY
2. Questions MUST be based ONLY on the content below
3. ${questionStyle}
4. Total points = ${total}, approximately ${pointsPerQuestion} pts per question

Return ONLY JSON (no markdown):
{"questions":[{"question":"question in ${detectedLanguage}","points":${pointsPerQuestion},"expectedAnswer":"answer in ${detectedLanguage}"}]}

CONTENT (in ${detectedLanguage}):
${content.substring(0, 12000)}`;

  let responseText = await callAI(prompt);
  responseText = cleanJsonResponse(responseText);
  
  const json = JSON.parse(responseText);
  let questions = json.questions || json;

  // Ensure we have the exact number of questions requested
  while (questions.length < numQuestions && questions.length > 0) {
    const lastQ = questions[questions.length - 1];
    questions.push({
      question: lastQ.question.replace("?", " in more detail?"),
      points: lastQ.points,
      expectedAnswer: lastQ.expectedAnswer
    });
  }
  
  if (questions.length > numQuestions) {
    questions = questions.slice(0, numQuestions);
  }

  // Adjust points to match total exactly
  const currentTotal = questions.reduce((sum, q) => sum + (parseFloat(q.points) || 0), 0);
  if (currentTotal > 0 && Math.abs(currentTotal - total) > 0.01) {
    const factor = total / currentTotal;
    let runningTotal = 0;
    questions.forEach((q, i) => {
      if (i === questions.length - 1) {
        q.points = Math.round((total - runningTotal) * 100) / 100;
      } else {
        q.points = Math.round(parseFloat(q.points) * factor * 100) / 100;
        runningTotal += q.points;
      }
    });
  }

  return questions;
}

module.exports = {
  generateExam
};

