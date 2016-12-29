const fs = require('fs');
const MarkdownFiles = {
    Readme: fs.readFileSync(__dirname + '/../../README.md', 'utf8'),
    Guidelines: fs.readFileSync(__dirname + '/../../GUIDELINES.md', 'utf8')
};
module.exports = MarkdownFiles;
