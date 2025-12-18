/**
 * Color scheme for mind map nodes by level
 */
const LEVEL_COLORS = {
  0: 0xFF1976D2, // Blue - Root
  1: [0xFF388E3C, 0xFFD32F2F, 0xFF7B1FA2, 0xFFF57C00, 0xFF0097A7, 0xFFC2185B], // Level 1 colors
  2: 0xFF546E7A, // Level 2 - Gray blue
  3: 0xFF78909C  // Level 3 - Light gray
};

/**
 * Assign colors to mind map nodes based on their level
 * @param {Object} node - Mind map node
 * @param {number} level - Current level (default: 0)
 * @param {number|null} parentColor - Parent node color
 * @param {Object} state - State object with level1Index
 * @returns {Object} - Node with assigned color
 */
function assignColors(node, level = 0, parentColor = null, state = { level1Index: 0 }) {
  if (level === 0) {
    node.color = LEVEL_COLORS[0];
  } else if (level === 1) {
    node.color = LEVEL_COLORS[1][state.level1Index % LEVEL_COLORS[1].length];
    parentColor = node.color;
    state.level1Index++;
  } else {
    // Children inherit a lighter version of parent color
    node.color = parentColor || LEVEL_COLORS[level] || 0xFF78909C;
  }
  
  node.level = level;
  
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      assignColors(child, level + 1, node.color, state);
    });
  }
  
  return node;
}

module.exports = {
  assignColors
};

