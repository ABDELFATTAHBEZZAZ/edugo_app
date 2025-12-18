const cors = require("cors")({origin: true});
const examService = require("../services/exam.service");

/**
 * Handle exam generation request
 */
async function generateExam(req, res) {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send({error: "Method Not Allowed"});
      }

      const {content, difficulty, totalScore, numberOfQuestions} = req.body;
      
      if (!content || content.length < 50) {
        return res.status(400).send({
          error: "PDF content is required and must be substantial"
        });
      }

      const questions = await examService.generateExam(
        content,
        difficulty,
        totalScore,
        numberOfQuestions
      );

      res.status(200).send({questions});
    } catch (error) {
      console.error("Error generating exam:", error.message, error.stack);
      res.status(500).send({
        error: "Failed to generate exam: " + error.message,
        questions: []
      });
    }
  });
}

module.exports = {
  generateExam
};

