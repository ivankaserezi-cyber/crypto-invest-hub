import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const PLANS = ['deposit.plan.starter', 'deposit.plan.pro', 'deposit.plan.vip'] as const;

const Deposit = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', amount: '', wallet: '', plan: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const text = `🆕 Новая заявка на депозит!\n\n👤 Имя: ${form.name}\n📧 Email: ${form.email}\n💰 Сумма: ${form.amount} USDT\n👛 Кошелёк: ${form.wallet}\n📋 План: ${form.plan}`;

    try {
      // To enable Telegram, set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
      // For now, just show success
      console.log('Deposit form data:', text);
      toast.success(t('deposit.form.success'));
      setForm({ name: '', email: '', amount: '', wallet: '', plan: '' });
    } catch {
      toast.error(t('deposit.form.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title={t('deposit.title')} subtitle={t('deposit.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-gradient-card border border-border space-y-5"
          >
            {[
              { key: 'name', label: t('deposit.form.name'), type: 'text' },
              { key: 'email', label: t('deposit.form.email'), type: 'email' },
              { key: 'amount', label: t('deposit.form.amount'), type: 'number' },
              { key: 'wallet', label: t('deposit.form.wallet'), type: 'text' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t('deposit.form.plan')}</label>
              <select
                required
                value={form.plan}
                onChange={(e) => setForm({ ...form, plan: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="" disabled>—</option>
                {PLANS.map((p) => (
                  <option key={p} value={t(p)}>{t(p)}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow-primary disabled:opacity-50"
            >
              {loading ? '...' : t('deposit.form.submit')}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Deposit;
