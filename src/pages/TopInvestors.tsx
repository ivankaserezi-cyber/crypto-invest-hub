import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const investors = [
  { name: 'Alexander K.', invested: '$250,000', profit: '$87,500', flag: '🇷🇺' },
  { name: 'Michael S.', invested: '$180,000', profit: '$63,000', flag: '🇺🇸' },
  { name: 'Elena V.', invested: '$150,000', profit: '$52,500', flag: '🇩🇪' },
  { name: 'James L.', invested: '$120,000', profit: '$42,000', flag: '🇬🇧' },
  { name: 'Dmitry P.', invested: '$100,000', profit: '$35,000', flag: '🇷🇺' },
  { name: 'Anna M.', invested: '$95,000', profit: '$33,250', flag: '🇫🇷' },
  { name: 'Robert W.', invested: '$85,000', profit: '$29,750', flag: '🇨🇦' },
  { name: 'Olga T.', invested: '$75,000', profit: '$26,250', flag: '🇺🇦' },
  { name: 'David H.', invested: '$70,000', profit: '$24,500', flag: '🇦🇺' },
  { name: 'Maria R.', invested: '$65,000', profit: '$22,750', flag: '🇪🇸' },
];

const TopInvestors = () => {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader title={t('top.title')} subtitle={t('top.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-3">
          {investors.map((inv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 p-5 rounded-xl bg-gradient-card border border-border card-hover"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                i === 0 ? 'bg-accent/20 text-accent' : i === 1 ? 'bg-muted text-muted-foreground' : i === 2 ? 'bg-orange-500/20 text-orange-400' : 'bg-secondary text-muted-foreground'
              }`}>
                {i < 3 ? <Trophy className="w-5 h-5" /> : i + 1}
              </div>
              <span className="text-xl">{inv.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground">{inv.name}</div>
                <div className="text-xs text-muted-foreground">{t('top.invested')}: {inv.invested}</div>
              </div>
              <div className="text-right">
                <div className="font-display font-bold text-primary">{inv.profit}</div>
                <div className="text-xs text-muted-foreground">{t('top.profit')}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopInvestors;
