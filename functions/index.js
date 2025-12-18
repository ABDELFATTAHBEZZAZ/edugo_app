const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp();

// Import controllers
const summaryController = require("./controllers/summary.controller");
const quizController = require("./controllers/quiz.controller");
const keywordsController = require("./controllers/keywords.controller");
const pdfController = require("./controllers/pdf.controller");
const mindmapController = require("./controllers/mindmap.controller");
const examController = require("./controllers/exam.controller");
const ttsController = require("./controllers/tts.controller");

// Export Firebase Cloud Functions
exports.generateSummary = functions.https.onRequest(summaryController.generateSummary);
exports.generateQuiz = functions.https.onRequest(quizController.generateQuiz);
exports.extractKeywords = functions.https.onRequest(keywordsController.extractKeywords);
exports.extractPdfText = functions.https.onRequest(pdfController.extractPdfText);
exports.generateMindMap = functions.https.onRequest(mindmapController.generateMindMap);
exports.generateExam = functions.https.onRequest(examController.generateExam);
exports.textToSpeech = functions.https.onRequest(ttsController.textToSpeech);
