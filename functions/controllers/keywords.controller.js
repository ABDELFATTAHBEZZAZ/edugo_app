const cors = require("cors")({origin: true});
const keywordsService = require("../services/keywords.service");

/**
 * Handle keywords extraction request
 */
async function extractKeywords(req, res) {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send({error: "Method Not Allowed"});
      }

      const {text} = req.body;
      if (!text) {
        return res.status(400).send({error: "Text is required"});
      }

      const keywords = await keywordsService.extractKeywords(text);
      res.status(200).send({keywords});
    } catch (error) {
      console.error("Error extracting keywords:", error);
      res.status(200).send({
        keywords: ["topic", "concept", "learning", "education", "summary"]
      });
    }
  });
}

module.exports = {
  extractKeywords
};

