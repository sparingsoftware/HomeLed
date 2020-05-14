const path = require('path');

// Mocks every media file to return its filename. Makes it possible to test that
// the correct images are loaded for components.

// https://github.com/facebook/jest/issues/2838

module.exports = {
  process: (_, filename) =>
    `module.exports = '${JSON.stringify(path.basename(filename))}';`
};
