const cors = require("cors")({origin: true});
const mindmapService = require("../services/mindmap.service");

/**
 * Handle mind map generation request
 */
async function generateMindMap(req, res) {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send({error: "Method Not Allowed"});
      }

      const {text, title} = req.body;
      if (!text) {
        return res.status(400).send({error: "Text is required"});
      }

      const result = await mindmapService.generateMindMap(text, title);
      res.status(200).send(result);
    } catch (error) {
      console.error("Error generating mind map:", error);
      res.status(500).send({
        error: "Failed to generate mindmap: " + error.message
      });
    }
  });
}

module.exports = {
  generateMindMap
};

