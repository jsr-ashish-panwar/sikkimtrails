const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const translationsStart = content.indexOf('const translations =');
const translationsEnd = content.indexOf('const App: React.FC =');
const translationsObj = content.substring(translationsStart, translationsEnd);

console.log('Translations Object Length:', translationsObj.length);

function checkBraces(str) {
    let stack = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '{') stack.push('{');
        else if (str[i] === '}') {
            if (stack.length === 0) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}

console.log('Braces Match:', checkBraces(translationsObj));
