const { callAI, cleanJsonResponse } = require("../utils/ai.util");
const { detectLanguageSimple } = require("../utils/language.util");
const { assignColors } = require("../utils/mindmap.util");

/**
 * Generate mind map structure from text using AI
 * @param {string} text - Text to generate mind map from
 * @param {string|null} title - Optional title for the mind map
 * @returns {Promise<Object>} - Mind map root node with colors assigned
 */
async function generateMindMap(text, title = null) {
  const textSample = text.substring(0, 500);
  const detectedLanguage = detectLanguageSimple(textSample);

  const prompt = `You are a MindMap structure generator. Analyze this educational content and create a STRICT HIERARCHICAL TREE structure.

**LANGUAGE: ${detectedLanguage}** - All text MUST be in ${detectedLanguage}.

**STRICT HIERARCHY RULES:**

LEVEL 0 - ROOT (Central Node):
- Extract the MAIN TITLE/SUBJECT of the content
- Only ONE node at this level
- This is the course/topic name

LEVEL 1 - MAIN BRANCHES (3-6 nodes):
- Extract MAIN SECTION TITLES from the content
- These are major chapters or concepts
- Connect ONLY to Level 0

LEVEL 2 - SUBSECTIONS (2-4 per Level 1):
- Extract SUB-HEADINGS from each section
- Steps, methods, categories
- Connect ONLY to their parent Level 1

LEVEL 3 - DETAILS (1-3 per Level 2):
- Extract KEY POINTS, formulas, rules
- Short phrases only (3-7 words max)
- Connect ONLY to their parent Level 2

**FORBIDDEN:**
- Cross-links between unrelated nodes
- Circular connections
- Multiple parents for one node
- Random or invented content
- Long paragraphs in labels

**Return ONLY valid JSON (no markdown, no explanation):**
{
  "rootNode": {
    "id": "root",
    "label": "Main Course Title",
    "details": "Brief description",
    "level": 0,
    "children": [
      {
        "id": "l1-1",
        "label": "Section 1",
        "details": "Section description",
        "level": 1,
        "children": [
          {
            "id": "l2-1-1",
            "label": "Subsection 1.1",
            "details": "Explanation",
            "level": 2,
            "children": [
              {"id": "l3-1-1-1", "label": "Key point", "details": "Detail", "level": 3, "children": []}
            ]
          }
        ]
      }
    ]
  }
}

**CONTENT TO ANALYZE:**
${text.substring(0, 12000)}`;

  let content = await callAI(prompt);
  content = cleanJsonResponse(content);
  
  const json = JSON.parse(content);
  const rootNode = assignColors(json.rootNode);

  return {
    rootNode,
    title: title || rootNode.label
  };
}

module.exports = {
  generateMindMap
};

