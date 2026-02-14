import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Headphones, MapPin } from 'lucide-react';

const Contacts = () => {
  const { t, lang } = useLanguage();

  const contacts = [
    { icon: Mail, title: t('contacts.email'), value: 'support@cryptoai-invest.com' },
    { icon: MessageCircle, title: t('contacts.telegram'), value: '@CryptoAI_Support' },
    { icon: Headphones, title: t('contacts.support'), value: lang === 'ru' ? 'Круглосуточная поддержка' : '24/7 Support Line' },
    { icon: MapPin, title: lang === 'ru' ? 'Адрес' : 'Address', value: 'Dubai, UAE — Business Bay' },
  ];

  return (
    <div>
      <PageHeader title={t('contacts.title')} subtitle={t('contacts.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {contacts.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-card border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <c.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{c.title}</h3>
                <p className="text-muted-foreground text-sm">{c.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
