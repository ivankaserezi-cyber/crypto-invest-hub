import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { User, Lock, LogIn, UserPlus } from 'lucide-react';

const Office = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  return (
    <div>
      <PageHeader title={t('office.title')} subtitle={t('office.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-gradient-card border border-border"
          >
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-colors ${
                  tab === 'login' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <LogIn className="w-4 h-4 inline mr-2" />{t('office.login')}
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-colors ${
                  tab === 'register' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <UserPlus className="w-4 h-4 inline mr-2" />{t('office.register')}
              </button>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  <User className="w-4 h-4 inline mr-1" />{t('office.email')}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  <Lock className="w-4 h-4 inline mr-1" />{t('office.password')}
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow-primary">
                {tab === 'login' ? t('office.login') : t('office.register')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Office;
