import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { FileText, Shield, Award } from 'lucide-react';

const Documents = () => {
  const { t, lang } = useLanguage();

  const docs = [
    {
      icon: FileText,
      title: lang === 'ru' ? 'Пользовательское соглашение' : 'Terms of Service',
      desc: lang === 'ru' ? 'Условия использования платформы CryptoAI Invest' : 'Platform usage terms and conditions',
    },
    {
      icon: Shield,
      title: lang === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy',
      desc: lang === 'ru' ? 'Как мы собираем, используем и защищаем ваши данные' : 'How we collect, use, and protect your data',
    },
    {
      icon: Award,
      title: lang === 'ru' ? 'Лицензия и регуляция' : 'License & Regulation',
      desc: lang === 'ru' ? 'Информация о лицензировании и регуляторном статусе' : 'Licensing and regulatory status information',
    },
    {
      icon: FileText,
      title: lang === 'ru' ? 'Политика AML/KYC' : 'AML/KYC Policy',
      desc: lang === 'ru' ? 'Противодействие отмыванию денег и идентификация клиентов' : 'Anti-money laundering and customer identification',
    },
    {
      icon: Shield,
      title: lang === 'ru' ? 'Политика возврата средств' : 'Refund Policy',
      desc: lang === 'ru' ? 'Условия и процедура возврата инвестиций' : 'Terms and procedures for investment returns',
    },
  ];

  return (
    <div>
      <PageHeader title={t('documents.title')} subtitle={t('documents.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-4">
          {docs.map((doc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-gradient-card border border-border card-hover cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <doc.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">{doc.title}</h3>
                <p className="text-sm text-muted-foreground">{doc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Documents;
