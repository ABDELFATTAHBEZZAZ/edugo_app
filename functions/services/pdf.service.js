const pdfParse = require("pdf-parse");

/**
 * Extract text from PDF buffer
 * @param {Buffer} pdfBuffer - PDF file as buffer
 * @returns {Promise<string>} - Extracted and cleaned text
 */
async function extractTextFromPdf(pdfBuffer) {
  const data = await pdfParse(pdfBuffer);
  const extractedText = data.text;

  if (!extractedText || extractedText.trim().length === 0) {
    return "No text could be extracted from this PDF. It may be an image-based PDF.";
  }

  // Clean up the text
  const cleanedText = extractedText
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();

  return cleanedText;
}

module.exports = {
  extractTextFromPdf
};

