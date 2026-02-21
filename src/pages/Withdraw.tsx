import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ArrowUpCircle, Clock, DollarSign, Percent } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const NETWORKS = ['USDT (TRC-20)', 'USDT (ERC-20)', 'BTC', 'ETH', 'BNB (BEP-20)', 'SOL'];

const Withdraw = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [network, setNetwork] = useState('USDT (TRC-20)');
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) < 50) {
      toast.error(t('withdraw.min_error'));
      return;
    }
    if (!wallet.trim()) {
      toast.error(t('withdraw.wallet_required'));
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('transactions').insert({
        user_id: user.id,
        type: 'withdrawal',
        amount: parseFloat(amount),
        currency: network,
        wallet_address: wallet,
        status: 'pending',
      });
      if (error) throw error;

      const text = `💸 Заявка на вывод!\n\n👤 ${user.email}\n💵 Сумма: ${amount} ${network}\n👛 Кошелёк: ${wallet}`;
      await supabase.functions.invoke('send-telegram', { body: { text } });

      toast.success(t('withdraw.success'));
      setAmount('');
      setWallet('');
    } catch {
      toast.error(t('withdraw.error'));
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icon: DollarSign, text: t('withdraw.min') },
    { icon: Clock, text: t('withdraw.time') },
    { icon: Percent, text: t('withdraw.fee') },
  ];

  return (
    <div>
      <PageHeader title={t('withdraw.title')} subtitle={t('withdraw.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {info.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-4 rounded-2xl bg-gradient-card border border-border text-center">
                <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-foreground text-xs sm:text-sm font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleWithdraw} className="p-6 rounded-2xl bg-gradient-card border border-border space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t('withdraw.network')}</label>
              <select value={network} onChange={(e) => setNetwork(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                {NETWORKS.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t('withdraw.wallet_label')}</label>
              <input type="text" required value={wallet} onChange={(e) => setWallet(e.target.value)} placeholder={t('withdraw.wallet_placeholder')} className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t('withdraw.amount_label')}</label>
              <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="50" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow-primary disabled:opacity-50">
              {loading ? '...' : t('withdraw.submit')}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Withdraw;
