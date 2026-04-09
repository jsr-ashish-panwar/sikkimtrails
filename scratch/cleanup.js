const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8').split('\n');
const part1 = content.slice(0, 670); // lines 1-670 (0-669)
const part2 = content.slice(1041);   // lines 1042-end (1041 is line 1042)
const newContent = part1.join('\n') + '\n  }\n};\n' + part2.join('\n');
fs.writeFileSync('src/App.tsx', newContent);
