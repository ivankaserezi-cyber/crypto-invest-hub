import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Award, Users, TrendingUp, Lock, Clock } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const facts = [
    { icon: Shield, title: t('about.fact1_title'), desc: t('about.fact1_desc') },
    { icon: Zap, title: t('about.fact2_title'), desc: t('about.fact2_desc') },
    { icon: Globe, title: t('about.fact3_title'), desc: t('about.fact3_desc') },
    { icon: Award, title: t('about.fact4_title'), desc: t('about.fact4_desc') },
    { icon: Users, title: t('about.fact5_title'), desc: t('about.fact5_desc') },
    { icon: TrendingUp, title: t('about.fact6_title'), desc: t('about.fact6_desc') },
    { icon: Lock, title: t('about.fact7_title'), desc: t('about.fact7_desc') },
    { icon: Clock, title: t('about.fact8_title'), desc: t('about.fact8_desc') },
  ];

  return (
    <div>
      <PageHeader title={t('about.title')} subtitle={t('about.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Mission */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">{t('about.mission_title')}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{t('about.mission_desc')}</p>
          </motion.div>

          {/* Facts grid */}
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-foreground mb-4">{t('about.why_us')}</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facts.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl bg-gradient-card border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '2019', label: t('about.stat_founded') },
              { value: '12,500+', label: t('about.stat_users') },
              { value: '$85M+', label: t('about.stat_volume') },
              { value: '45+', label: t('about.stat_countries') },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-xl bg-gradient-card border border-border">
                <div className="text-3xl font-display font-bold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
