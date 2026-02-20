import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Copy, Wallet } from 'lucide-react';

const PLANS = ['deposit.plan.starter', 'deposit.plan.pro', 'deposit.plan.vip'] as const;

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

const Deposit = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', amount: '', wallet: '', plan: '' });
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');

  const resetCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parseInt(captchaInput) !== captcha.answer) {
      toast.error(t('deposit.form.captcha_error'));
      resetCaptcha();
      return;
    }

    setLoading(true);

    const text = `🆕 Новая заявка на депозит!\n\n👤 Имя: ${form.name}\n📧 Email: ${form.email}\n💰 Сумма: ${form.amount} USDT\n👛 Кошелёк: ${form.wallet}\n📋 План: ${form.plan}`;

    try {
      const { data, error } = await supabase.functions.invoke('send-telegram', {
        body: { text },
      });

      if (error) throw error;

      toast.success(t('deposit.form.success'));
      setForm({ name: '', email: '', amount: '', wallet: '', plan: '' });
      resetCaptcha();
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-6 rounded-2xl bg-gradient-card border border-border"
          >
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">{t('deposit.wallet_address')}</h3>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm break-all select-all">
                0x66E8b231d0B935cEc2327Ce5bedBA5a00E230aF3
              </code>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('0x66E8b231d0B935cEc2327Ce5bedBA5a00E230aF3');
                  toast.success(t('deposit.copied'));
                }}
                className="p-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all shrink-0"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

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

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {t('deposit.form.captcha')}: <span className="font-bold text-primary">{captcha.question}</span>
              </label>
              <input
                type="number"
                required
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
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
