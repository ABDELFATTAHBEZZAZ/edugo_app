const cors = require("cors")({origin: true});
const summaryService = require("../services/summary.service");

/**
 * Handle summary generation request
 */
async function generateSummary(req, res) {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send({error: "Method Not Allowed"});
      }

      const {text} = req.body;
      if (!text) {
        return res.status(400).send({error: "Text is required"});
      }

      const summary = await summaryService.generateSummary(text);
      res.status(200).send({summary});
    } catch (error) {
      console.error("Error generating summary:", error);
      res.status(200).send({
        summary: "⚠️ AI Generation Failed: " + error.message + ". \n\nFallback Summary: This text discusses important concepts about the provided topic. (This is a placeholder because the AI service returned an error)."
      });
    }
  });
}

module.exports = {
  generateSummary
};

