import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Copy, Wallet, Bitcoin } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const WALLETS = [
  { currency: 'USDT (ERC-20)', address: '0x66E8b231d0B935cEc2327Ce5bedBA5a00E230aF3', icon: '💵' },
  { currency: 'BTC', address: 'bc1qdndyl3cf2a4j6qu0k0xdnhg3u07ulmuhpfzdf7', icon: '₿' },
  { currency: 'ETH', address: '0x66E8b231d0B935cEc2327Ce5bedBA5a00E230aF3', icon: 'Ξ' },
  { currency: 'BNB (BEP-20)', address: '0x66E8b231d0B935cEc2327Ce5bedBA5a00E230aF3', icon: '🔶' },
  { currency: 'USDT (TRC-20)', address: 'TJfoNYKWa6hRwRyrpfXb1mcwn3fRSojsBP', icon: '💲' },
  { currency: 'SOL', address: '4EnMkdj1xPpBxTVnhmp9zTb8neZ5X5EFPS9jjeDvt1nm', icon: '◎' },
];

const Deposit = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selected, setSelected] = useState(0);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error(t('deposit.enter_amount'));
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('transactions').insert({
        user_id: user.id,
        type: 'deposit',
        amount: parseFloat(amount),
        currency: WALLETS[selected].currency,
        wallet_address: WALLETS[selected].address,
        status: 'pending',
      });

      if (error) throw error;

      const text = `💰 Новая заявка на депозит!\n\n👤 ${user.email}\n💵 Сумма: ${amount} ${WALLETS[selected].currency}\n👛 Адрес: ${WALLETS[selected].address}`;
      await supabase.functions.invoke('send-telegram', { body: { text } });

      toast.success(t('deposit.success'));
      setAmount('');
    } catch {
      toast.error(t('deposit.error'));
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(WALLETS[selected].address);
    toast.success(t('deposit.copied'));
  };

  return (
    <div>
      <PageHeader title={t('deposit.title')} subtitle={t('deposit.subtitle')} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Currency selector */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
            {WALLETS.map((w, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(i)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selected === i
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-gradient-card text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="text-2xl mb-1">{w.icon}</div>
                <div className="text-xs font-medium truncate">{w.currency.split(' ')[0]}</div>
              </motion.button>
            ))}
          </div>

          {/* Wallet address */}
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-card border border-border mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">{WALLETS[selected].currency}</h3>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm break-all select-all">
                {WALLETS[selected].address}
              </code>
              <button
                onClick={copyAddress}
                className="p-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all shrink-0"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Amount input and submit */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-gradient-card border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">{t('deposit.amount_label')}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all mb-4"
            />
            <button
              onClick={handleDeposit}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow-primary disabled:opacity-50"
            >
              {loading ? '...' : t('deposit.confirm')}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Deposit;
