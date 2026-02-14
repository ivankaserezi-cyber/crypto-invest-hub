import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Shield, TrendingUp, Headphones, ArrowRight, Zap, BarChart3, Users } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '12,500+', label: t('home.stats.investors'), icon: Users },
    { value: '$85M+', label: t('home.stats.managed'), icon: BarChart3 },
    { value: '12.5%', label: t('home.stats.returns'), icon: TrendingUp },
    { value: '45+', label: t('home.stats.countries'), icon: Zap },
  ];

  const features = [
    { icon: Brain, title: t('home.why.ai'), desc: t('home.why.ai.desc') },
    { icon: Shield, title: t('home.why.security'), desc: t('home.why.security.desc') },
    { icon: TrendingUp, title: t('home.why.profit'), desc: t('home.why.profit.desc') },
    { icon: Headphones, title: t('home.why.support'), desc: t('home.why.support.desc') },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-accent/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(192 85% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(192 85% 55%) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">AI-Powered Trading Platform</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-foreground">{t('home.title').split('AI')[0]}</span>
              <span className="text-gradient-primary">AI</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              {t('home.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/deposit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all glow-primary"
              >
                {t('home.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/rates"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-semibold text-lg hover:bg-secondary transition-all"
              >
                {t('nav.rates')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-card border border-border"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-foreground">
            {t('home.why')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
        </div>
      </section>
    </div>
  );
};

export default Index;
