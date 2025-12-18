const cors = require("cors")({origin: true});
const quizService = require("../services/quiz.service");

/**
 * Handle quiz generation request
 */
async function generateQuiz(req, res) {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send({error: "Method Not Allowed"});
      }

      const {text, numberOfQuestions = 5} = req.body;
      if (!text) {
        return res.status(400).send({error: "Text is required"});
      }

      const questions = await quizService.generateQuiz(text, numberOfQuestions);
      res.status(200).send({questions});
    } catch (error) {
      console.error("Error generating quiz:", error);
      res.status(200).send({
        questions: [
          {
            question: "What is the main topic discussed in this text?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: 0
          }
        ]
      });
    }
  });
}

module.exports = {
  generateQuiz
};

