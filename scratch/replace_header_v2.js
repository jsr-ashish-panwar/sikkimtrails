const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8').split('\n');
const replacement = `      {/* Premium Header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        translations={translations}
        currentUser={currentUser}
        handleLogout={handleLogout}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
      />`;
const part1 = content.slice(0, 1141); // 0 to 1140 (lines 1 to 1141)
const part2 = content.slice(1212);   // index 1212 is line 1213
const newContent = part1.join('\n') + '\n' + replacement + '\n' + part2.join('\n');
fs.writeFileSync('src/App.tsx', newContent);
