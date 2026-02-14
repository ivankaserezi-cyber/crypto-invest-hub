import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Users, Share2, DollarSign } from 'lucide-react';

const Referrals = () => {
  const { t } = useLanguage();

  const levels = [
    { label: t('referrals.level1'), color: 'text-primary', pct: '7%' },
    { label: t('referrals.level2'), color: 'text-accent', pct: '3%' },
    { label: t('referrals.level3'), color: 'text-muted-foreground', pct: '1%' },
  ];

  const steps = [
    { icon: Share2, text: t('referrals.step1') },
    { icon: Users, text: t('referrals.step2') },
    { icon: DollarSign, text: t('referrals.step3') },
  ];

  return (
    <div>
      <PageHeader title={t('referrals.title')} subtitle={t('referrals.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {levels.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-card border border-border text-center card-hover"
              >
                <div className={`text-4xl font-display font-bold mb-2 ${l.color}`}>{l.pct}</div>
                <div className="text-foreground font-medium">{l.label}</div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-center mb-10 text-foreground">{t('referrals.how')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-display font-bold text-muted-foreground mb-2">{i + 1}</div>
                <p className="text-foreground">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Referrals;
