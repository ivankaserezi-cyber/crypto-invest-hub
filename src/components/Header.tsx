import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Globe, TrendingUp, LogIn, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { t, lang, setLang } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const publicNav = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.trading', path: '/trading' },
    { key: 'nav.rates', path: '/rates' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.contacts', path: '/contacts' },
  ];

  const authNav = [
    { key: 'nav.dashboard', path: '/dashboard' },
    { key: 'nav.deposit', path: '/deposit' },
    { key: 'nav.withdraw', path: '/withdraw' },
    { key: 'nav.referrals', path: '/referrals' },
    { key: 'nav.trading', path: '/trading' },
  ];

  const navItems = user ? authNav : publicNav;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Crypto<span className="text-gradient-primary">AI</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang === 'ru' ? 'EN' : 'RU'}
          </button>

          {!user && (
            <Link to="/login" className="hidden lg:flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all">
              <LogIn className="w-4 h-4" />
              {t('auth.login')}
            </Link>
          )}

          {user && (
            <Link to="/dashboard" className="hidden lg:flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all">
              <LayoutDashboard className="w-4 h-4" />
              {t('nav.dashboard')}
            </Link>
          )}

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              {!user && (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-md text-sm font-medium text-primary">
                  {t('auth.login')}
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
