import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, XCircle, Clock, Users, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  wallet_address: string | null;
  created_at: string | null;
  profile?: { display_name: string | null; email: string | null };
}

const Admin = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [profiles, setProfiles] = useState<Record<string, { display_name: string | null; email: string | null }>>({});
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'rejected'>('all');

  useEffect(() => {
    if (!user) return;
    checkAdmin();
  }, [user]);

  const checkAdmin = async () => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user!.id)
      .eq('role', 'admin')
      .maybeSingle();
    
    if (data) {
      setIsAdmin(true);
      await loadData();
    }
    setLoading(false);
  };

  const loadData = async () => {
    const { data: txs } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: profs } = await supabase
      .from('profiles')
      .select('user_id, display_name, email');

    if (profs) {
      const map: Record<string, { display_name: string | null; email: string | null }> = {};
      profs.forEach((p) => { map[p.user_id] = p; });
      setProfiles(map);
    }
    setTransactions(txs || []);
  };

  const updateStatus = async (id: string, status: 'completed' | 'rejected') => {
    const { error } = await supabase
      .from('transactions')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({ title: t('admin.error'), variant: 'destructive' });
      return;
    }

    toast({ title: status === 'completed' ? t('admin.approved') : t('admin.rejected_msg') });
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, status } : tx));
  };

  const filtered = filter === 'all' ? transactions : transactions.filter(tx => tx.status === filter);

  const stats = {
    total: transactions.length,
    pending: transactions.filter(tx => tx.status === 'pending').length,
    totalVolume: transactions.filter(tx => tx.status === 'completed').reduce((s, tx) => s + tx.amount, 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">{t('admin.access_denied')}</h1>
          <p className="text-muted-foreground">{t('admin.no_permission')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="py-8 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">{t('admin.title')}</h1>
              <p className="text-muted-foreground">{t('admin.subtitle')}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-gradient-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">{t('admin.pending_count')}</span>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{stats.pending}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl bg-gradient-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">{t('admin.total_tx')}</span>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{stats.total}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-5 rounded-2xl bg-gradient-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">{t('admin.volume')}</span>
              </div>
              <div className="text-2xl font-display font-bold text-accent">${stats.totalVolume.toFixed(2)}</div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(['all', 'pending', 'completed', 'rejected'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {t(`admin.filter_${f}`)}
              </button>
            ))}
          </div>

          {/* Transaction Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">{t('admin.user')}</th>
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">{t('dashboard.type')}</th>
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">{t('dashboard.amount')}</th>
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">{t('admin.wallet')}</th>
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">{t('dashboard.status')}</th>
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">{t('dashboard.date')}</th>
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">{t('admin.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tx) => {
                    const profile = profiles[tx.user_id];
                    return (
                      <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="text-foreground font-medium">{profile?.display_name || '—'}</div>
                          <div className="text-xs text-muted-foreground">{profile?.email || tx.user_id.slice(0, 8)}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={tx.type === 'deposit' ? 'text-accent' : 'text-destructive'}>
                            {tx.type === 'deposit' ? '↓ ' + t('dashboard.deposit') : '↑ ' + t('dashboard.withdrawal')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-foreground font-medium">{tx.amount} {tx.currency}</td>
                        <td className="py-3 px-4">
                          <span className="text-xs text-muted-foreground font-mono">
                            {tx.wallet_address ? tx.wallet_address.slice(0, 10) + '...' : '—'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            tx.status === 'completed' ? 'default' :
                            tx.status === 'rejected' ? 'destructive' : 'secondary'
                          } className={
                            tx.status === 'completed' ? 'bg-accent/20 text-accent border-accent/30' :
                            tx.status === 'rejected' ? '' :
                            'bg-primary/20 text-primary border-primary/30'
                          }>
                            {tx.status === 'completed' ? t('dashboard.completed') :
                             tx.status === 'rejected' ? t('dashboard.rejected') :
                             t('dashboard.pending')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {tx.created_at ? new Date(tx.created_at).toLocaleDateString() : '—'}
                        </td>
                        <td className="py-3 px-4">
                          {tx.status === 'pending' ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateStatus(tx.id, 'completed')}
                                className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                                title={t('admin.approve')}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateStatus(tx.id, 'rejected')}
                                className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                                title={t('admin.reject')}
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-muted-foreground">{t('dashboard.no_transactions')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
