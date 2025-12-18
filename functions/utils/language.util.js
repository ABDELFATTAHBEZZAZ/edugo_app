
/**
 * Detect language from text sample
 * @param {string} textSample - Sample of text to analyze
 * @returns {Object} - {language: string, instruction: string}
 */
function detectLanguage(textSample) {
  const textLower = textSample.toLowerCase();
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  
  let detectedLanguage = "the same language as the text";
  let languageInstruction = "";
  
  if (arabicPattern.test(textSample)) {
    detectedLanguage = "ARABIC (العربية)";
    languageInstruction = "IMPORTANT: Write the ENTIRE summary in ARABIC (العربية). Do NOT translate to English or French.";
  } else if (
    textLower.includes(" le ") || 
    textLower.includes(" la ") || 
    textLower.includes(" les ") || 
    textLower.includes(" est ") || 
    textLower.includes(" sont ") || 
    textLower.includes(" dans ")
  ) {
    detectedLanguage = "FRENCH (Français)";
    languageInstruction = "IMPORTANT: Write the ENTIRE summary in FRENCH (Français). Do NOT translate to English.";
  } else if (
    textLower.includes(" the ") || 
    textLower.includes(" is ") || 
    textLower.includes(" are ") || 
    textLower.includes(" and ")
  ) {
    detectedLanguage = "ENGLISH";
    languageInstruction = "Write the summary in ENGLISH.";
  }
  
  return { detectedLanguage, languageInstruction };
}

/**
 * Detect language for quiz/exam generation (simpler version)
 * @param {string} textSample - Sample of text to analyze
 * @returns {string} - Detected language name
 */
function detectLanguageSimple(textSample) {
  const textLower = textSample.toLowerCase();
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  
  if (arabicPattern.test(textSample)) {
    return "ARABIC (العربية)";
  } else if (
    textLower.includes(" le ") || 
    textLower.includes(" la ") || 
    textLower.includes(" les ") || 
    textLower.includes(" est ")
  ) {
    return "FRENCH (Français)";
  } else if (
    textLower.includes(" the ") || 
    textLower.includes(" is ") || 
    textLower.includes(" are ")
  ) {
    return "ENGLISH";
  }
  
  return "the same language as the text";
}

/**
 * Detect language for exam generation (with more French patterns)
 * @param {string} contentSample - Sample of content to analyze
 * @returns {string} - Detected language name
 */
function detectLanguageForExam(contentSample) {
  const contentLower = contentSample.toLowerCase();
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  
  if (arabicPattern.test(contentSample)) {
    return "ARABIC (العربية)";
  } else if (
    contentLower.includes(" le ") || 
    contentLower.includes(" la ") || 
    contentLower.includes(" les ") || 
    contentLower.includes(" est ") || 
    contentLower.includes(" sont ") || 
    contentLower.includes(" dans ") || 
    contentLower.includes(" pour ")
  ) {
    return "FRENCH (Français)";
  } else if (
    contentLower.includes(" the ") || 
    contentLower.includes(" is ") || 
    contentLower.includes(" are ") || 
    contentLower.includes(" and ") || 
    contentLower.includes(" with ")
  ) {
    return "ENGLISH";
  }
  
  return "the same language as the content";
}

module.exports = {
  detectLanguage,
  detectLanguageSimple,
  detectLanguageForExam
};

