import React from 'react';
import { Sun, Moon, Menu, LogIn, LogOut, UserPlus } from 'lucide-react';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  currentLanguage: string;
  setCurrentLanguage: (lang: any) => void;
  translations: any;
  currentUser: any;
  handleLogout: () => void;
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  setIsLoginOpen: (open: boolean) => void;
  setIsSignupOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  currentLanguage,
  setCurrentLanguage,
  translations,
  currentUser,
  handleLogout,
  scrollToSection,
  activeSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setIsLoginOpen,
  setIsSignupOpen
}) => {
  const t = translations[currentLanguage];

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
      theme === 'dark' 
        ? 'bg-slate-900/80 border-slate-800 backdrop-blur-md' 
        : 'bg-white/80 border-orange-100 backdrop-blur-md'
    } shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative">
              <img
                src="/tours.png"
                alt="Logo"
                className="h-12 w-12 object-contain transform group-hover:rotate-12 transition-transform duration-300"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 group-hover:opacity-40 blur transition-opacity"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-orange-400' : 'text-orange-800'}`}>
                {t.appName}
              </h1>
              <p className={`text-[10px] font-medium uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-red-600'}`}>
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {Object.entries(t.nav).map(([key, label]: [string, any]) => (
              <button
                key={key}
                onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === (key === 'home' ? 'hero' : key)
                    ? 'bg-orange-500 text-white shadow-md'
                    : theme === 'dark'
                      ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                  : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Language Selector */}
            <div className="hidden sm:block">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as any)}
                className={`border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                {Object.keys(translations).map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-2 border-l pl-2 sm:pl-4 border-gray-200 dark:border-slate-800">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <div className={`hidden md:block text-right`}>
                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400">Namaste,</p>
                    <p className="text-sm font-bold text-orange-600 dark:text-orange-400">{currentUser.name}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className={`hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      theme === 'dark'
                        ? 'text-slate-200 hover:bg-slate-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Log In</span>
                  </button>
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg shadow-orange-500/20 transition-all transform active:scale-95"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                theme === 'dark' ? 'text-slate-200 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden py-4 border-t transition-all duration-300 ${
            theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-gray-100 bg-white'
          }`}>
            <div className="flex flex-col space-y-1 mb-4">
              {Object.entries(t.nav).map(([key, label]: [string, any]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === (key === 'home' ? 'hero' : key)
                      ? 'bg-orange-500 text-white'
                      : theme === 'dark'
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-gray-600 hover:bg-orange-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="px-4 py-4 border-t border-gray-100 dark:border-slate-800 flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium dark:text-slate-400">Language</span>
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value as any)}
                  className={`border rounded-lg px-2 py-1 text-sm ${
                    theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-gray-200'
                  }`}
                >
                  {Object.keys(translations).map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              {!currentUser && (
                 <button
                 onClick={() => setIsLoginOpen(true)}
                 className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl border border-orange-200 text-orange-600 font-bold dark:border-slate-700 dark:text-slate-200"
               >
                 <LogIn className="h-4 w-4" />
                 <span>Log In</span>
               </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
