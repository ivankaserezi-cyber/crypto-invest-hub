import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, ArrowDownCircle, ArrowUpCircle, Users, LogOut, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Пн', profit: 1.2 },
  { day: 'Вт', profit: 2.1 },
  { day: 'Ср', profit: 1.8 },
  { day: 'Чт', profit: 3.2 },
  { day: 'Пт', profit: 2.8 },
  { day: 'Сб', profit: 3.5 },
  { day: 'Вс', profit: 4.1 },
];

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('*').eq('user_id', user.id).single().then(({ data }) => setProfile(data));
    supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10).then(({ data }) => setTransactions(data || []));
  }, [user]);

  const balance = profile?.balance || 0;

  return (
    <div className="min-h-screen">
      <section className="py-8 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {t('dashboard.welcome')}, {profile?.display_name || user?.email?.split('@')[0]}
              </h1>
              <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
            </div>
            <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.logout')}</span>
            </button>
          </div>

          {/* Widgets */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-gradient-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t('dashboard.balance')}</span>
              </div>
              <div className="text-3xl font-display font-bold text-foreground">${balance.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground mt-1">USDT</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl bg-gradient-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">{t('dashboard.profit_24h')}</span>
              </div>
              <div className="text-3xl font-display font-bold text-accent">+${(balance * 0.005).toFixed(2)}</div>
              <div className="text-sm text-accent">+0.5%</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-gradient-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t('dashboard.transactions')}</span>
              </div>
              <div className="text-3xl font-display font-bold text-foreground">{transactions.length}</div>
              <div className="text-sm text-muted-foreground">{t('dashboard.total')}</div>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Link to="/deposit" className="flex items-center justify-center gap-2 p-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow-primary">
              <ArrowDownCircle className="w-5 h-5" />{t('nav.deposit')}
            </Link>
            <Link to="/withdraw" className="flex items-center justify-center gap-2 p-4 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-all">
              <ArrowUpCircle className="w-5 h-5" />{t('nav.withdraw')}
            </Link>
            <Link to="/referrals" className="flex items-center justify-center gap-2 p-4 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-all">
              <Users className="w-5 h-5" />{t('nav.referrals')}
            </Link>
          </div>

          {/* Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-2xl bg-gradient-card border border-border mb-8">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">{t('dashboard.chart_title')}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                  <XAxis dataKey="day" stroke="hsl(215 20% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 20% 55%)" fontSize={12} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(222 40% 10%)', border: '1px solid hsl(222 30% 18%)', borderRadius: '8px', color: 'hsl(210 40% 95%)' }}
                    formatter={(value: number) => [`${value}%`, 'Прибыль']}
                  />
                  <Line type="monotone" dataKey="profit" stroke="hsl(192 85% 55%)" strokeWidth={2} dot={{ fill: 'hsl(192 85% 55%)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Transaction History */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-2xl bg-gradient-card border border-border mb-8">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">{t('dashboard.history')}</h3>
            {transactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">{t('dashboard.no_transactions')}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">{t('dashboard.type')}</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">{t('dashboard.amount')}</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">{t('dashboard.status')}</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">{t('dashboard.date')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-border/50">
                        <td className="py-3 px-2">
                          <span className={tx.type === 'deposit' ? 'text-accent' : 'text-destructive'}>
                            {tx.type === 'deposit' ? '↓ ' + t('dashboard.deposit') : '↑ ' + t('dashboard.withdrawal')}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-foreground">{tx.amount} {tx.currency}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tx.status === 'completed' ? 'bg-accent/20 text-accent' :
                            tx.status === 'rejected' ? 'bg-destructive/20 text-destructive' :
                            'bg-primary/20 text-primary'
                          }`}>
                            {tx.status === 'completed' ? t('dashboard.completed') :
                             tx.status === 'rejected' ? t('dashboard.rejected') :
                             t('dashboard.pending')}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Referral Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 rounded-2xl bg-gradient-card border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-foreground">{t('dashboard.referral_title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('dashboard.referral_desc')}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <div className="text-2xl font-display font-bold text-primary">7%</div>
                  <div className="text-xs text-muted-foreground">{t('referrals.level1')}</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <div className="text-2xl font-display font-bold text-accent">3%</div>
                  <div className="text-xs text-muted-foreground">{t('referrals.level2')}</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <div className="text-2xl font-display font-bold text-muted-foreground">1%</div>
                  <div className="text-xs text-muted-foreground">{t('referrals.level3')}</div>
                </div>
              </div>

              {profile?.referral_code && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">{t('dashboard.your_link')}</label>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={`${window.location.origin}/register?ref=${profile.referral_code}`}
                      className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm font-mono"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/register?ref=${profile.referral_code}`);
                        toast({ title: t('deposit.copied') });
                      }}
                      className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow-primary"
                    >
                      {t('dashboard.copy')}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">{t('dashboard.referral_hint')}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
