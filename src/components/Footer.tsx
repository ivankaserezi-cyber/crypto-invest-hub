import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Crypto<span className="text-gradient-primary">AI</span>
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link to="/documents" className="hover:text-foreground transition-colors">{t('nav.documents')}</Link>
            <Link to="/contacts" className="hover:text-foreground transition-colors">{t('nav.contacts')}</Link>
            <Link to="/rates" className="hover:text-foreground transition-colors">{t('nav.rates')}</Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center space-y-2">
          <p className="text-sm text-muted-foreground">{t('footer.rights')}</p>
          <p className="text-xs text-muted-foreground/70">{t('footer.risk')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
