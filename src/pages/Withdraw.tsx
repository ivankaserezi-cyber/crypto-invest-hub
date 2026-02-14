import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Percent, Wifi } from 'lucide-react';

const networks = ['TRC-20 (USDT)', 'ERC-20 (USDT)', 'BEP-20 (USDT)', 'Bitcoin (BTC)'];

const Withdraw = () => {
  const { t } = useLanguage();

  const info = [
    { icon: DollarSign, text: t('withdraw.min') },
    { icon: Clock, text: t('withdraw.time') },
    { icon: Percent, text: t('withdraw.fee') },
  ];

  return (
    <div>
      <PageHeader title={t('withdraw.title')} subtitle={t('withdraw.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {info.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-card border border-border text-center card-hover"
              >
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-foreground font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="text-xl font-display font-bold text-center mb-6 text-foreground">{t('withdraw.networks')}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {networks.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-card border border-border"
              >
                <Wifi className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{n}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Withdraw;
