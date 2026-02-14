import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent blur-[80px]" />
    </div>
    <div className="container mx-auto px-4 text-center relative z-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-lg text-muted-foreground max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  </section>
);

export default PageHeader;
