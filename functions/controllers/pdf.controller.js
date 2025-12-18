const cors = require("cors")({origin: true});
const pdfService = require("../services/pdf.service");

/**
 * Handle PDF text extraction request
 */
async function extractPdfText(req, res) {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send({error: "Method Not Allowed"});
      }

      const {pdfBase64} = req.body;
      if (!pdfBase64) {
        return res.status(400).send({error: "PDF data is required"});
      }

      // Decode base64 to buffer
      const pdfBuffer = Buffer.from(pdfBase64, "base64");
      
      // Extract text from PDF
      const text = await pdfService.extractTextFromPdf(pdfBuffer);

      res.status(200).send({text});
    } catch (error) {
      console.error("Error extracting PDF text:", error.message);
      res.status(500).send({
        error: "Failed to extract PDF text: " + error.message
      });
    }
  });
}

module.exports = {
  extractPdfText
};

