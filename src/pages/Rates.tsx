import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const plans = [
  { name: 'Starter', min: '100 USDT', rate: '0.8%', period: 30, popular: false },
  { name: 'Professional', min: '1,000 USDT', rate: '1.2%', period: 60, popular: true },
  { name: 'VIP', min: '10,000 USDT', rate: '1.5%', period: 90, popular: false },
  { name: 'Premium', min: '50,000 USDT', rate: '2.0%', period: 120, popular: false },
];

const Rates = () => {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader title={t('rates.title')} subtitle={t('rates.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl bg-gradient-card border card-hover ${
                  plan.popular ? 'border-primary glow-primary' : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    Popular
                  </div>
                )}
                <h3 className="text-xl font-display font-bold text-foreground mb-4">{plan.name}</h3>
                <div className="text-4xl font-display font-bold text-gradient-primary mb-1">{plan.rate}</div>
                <div className="text-sm text-muted-foreground mb-6">{t('rates.daily')}</div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('rates.period')}</span>
                    <span className="text-foreground font-medium">{plan.period} {t('rates.days')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('rates.min')}</span>
                    <span className="text-foreground font-medium">{plan.min}</span>
                  </div>
                </div>
                <Link
                  to="/deposit"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                >
                  {t('home.cta')} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rates;
