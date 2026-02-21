import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpDown, BarChart3, Star } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const generateSparkline = (trend: 'up' | 'down') => {
  const data = [];
  let val = 50;
  for (let i = 0; i < 20; i++) {
    val += (Math.random() - (trend === 'up' ? 0.35 : 0.65)) * 8;
    data.push({ v: Math.max(0, val) });
  }
  return data;
};

const COINS = [
  { symbol: 'BTC', name: 'Bitcoin', price: 104832.50, change: 2.34, mcap: '2.07T', vol: '38.2B', trend: 'up' as const },
  { symbol: 'ETH', name: 'Ethereum', price: 3891.20, change: 1.82, mcap: '468B', vol: '18.1B', trend: 'up' as const },
  { symbol: 'BNB', name: 'BNB', price: 712.45, change: -0.54, mcap: '106B', vol: '2.1B', trend: 'down' as const },
  { symbol: 'SOL', name: 'Solana', price: 198.30, change: 5.67, mcap: '91B', vol: '4.8B', trend: 'up' as const },
  { symbol: 'XRP', name: 'Ripple', price: 2.41, change: -1.23, mcap: '138B', vol: '6.2B', trend: 'down' as const },
  { symbol: 'ADA', name: 'Cardano', price: 1.12, change: 3.45, mcap: '40B', vol: '1.9B', trend: 'up' as const },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.412, change: -2.11, mcap: '60B', vol: '3.4B', trend: 'down' as const },
  { symbol: 'DOT', name: 'Polkadot', price: 9.87, change: 1.56, mcap: '14B', vol: '0.8B', trend: 'up' as const },
  { symbol: 'AVAX', name: 'Avalanche', price: 42.15, change: 4.21, mcap: '17B', vol: '1.2B', trend: 'up' as const },
  { symbol: 'LINK', name: 'Chainlink', price: 18.93, change: -0.89, mcap: '12B', vol: '0.9B', trend: 'down' as const },
  { symbol: 'MATIC', name: 'Polygon', price: 1.34, change: 2.78, mcap: '13B', vol: '0.7B', trend: 'up' as const },
  { symbol: 'UNI', name: 'Uniswap', price: 14.52, change: 1.12, mcap: '11B', vol: '0.5B', trend: 'up' as const },
];

const TABS = ['spot', 'futures', 'margin'] as const;

const Trading = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<typeof TABS[number]>('spot');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'mcap'>('mcap');
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [orderAmount, setOrderAmount] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFav = (symbol: string) => {
    setFavorites(prev => prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]);
  };

  const sorted = [...COINS].sort((a, b) => {
    if (sortBy === 'change') return Math.abs(b.change) - Math.abs(a.change);
    if (sortBy === 'price') return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <PageHeader title={t('trading.title')} subtitle={t('trading.subtitle')} />
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {TABS.map((tb) => (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  tab === tb ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {t(`trading.${tb}`)}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Coin Table */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
                <div className="flex items-center gap-4 p-4 border-b border-border">
                  <button onClick={() => setSortBy('mcap')} className={`text-xs font-medium ${sortBy === 'mcap' ? 'text-primary' : 'text-muted-foreground'}`}>{t('trading.market_cap')}</button>
                  <button onClick={() => setSortBy('price')} className={`text-xs font-medium ${sortBy === 'price' ? 'text-primary' : 'text-muted-foreground'}`}>{t('trading.price')}</button>
                  <button onClick={() => setSortBy('change')} className={`text-xs font-medium ${sortBy === 'change' ? 'text-primary' : 'text-muted-foreground'}`}>{t('trading.change')}</button>
                </div>
                <div className="divide-y divide-border/50">
                  {sorted.map((coin, i) => (
                    <motion.div
                      key={coin.symbol}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => setSelectedCoin(coin.symbol)}
                      className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${
                        selectedCoin === coin.symbol ? 'bg-primary/5' : ''
                      }`}
                    >
                      <button onClick={(e) => { e.stopPropagation(); toggleFav(coin.symbol); }} className="shrink-0">
                        <Star className={`w-4 h-4 ${favorites.includes(coin.symbol) ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                      </button>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {coin.symbol.substring(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground text-sm">{coin.symbol}</div>
                        <div className="text-xs text-muted-foreground">{coin.name}</div>
                      </div>
                      <div className="w-20 h-8 shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={generateSparkline(coin.trend)}>
                            <Line type="monotone" dataKey="v" stroke={coin.change >= 0 ? 'hsl(142 71% 45%)' : 'hsl(0 84% 60%)'} strokeWidth={1.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-semibold text-foreground text-sm">${coin.price.toLocaleString()}</div>
                        <div className={`text-xs font-medium flex items-center justify-end gap-1 ${coin.change >= 0 ? 'text-accent' : 'text-destructive'}`}>
                          {coin.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {coin.change >= 0 ? '+' : ''}{coin.change}%
                        </div>
                      </div>
                      <div className="hidden sm:block text-right shrink-0 w-20">
                        <div className="text-xs text-muted-foreground">Vol</div>
                        <div className="text-xs text-foreground">${coin.vol}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Panel */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl bg-gradient-card border border-border p-6 sticky top-24">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  {selectedCoin ? `${selectedCoin}/USDT` : t('trading.select_pair')}
                </h3>

                {selectedCoin && (
                  <>
                    <div className="flex gap-2 mb-4">
                      <button onClick={() => setOrderType('buy')} className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors ${orderType === 'buy' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>
                        {t('trading.buy')}
                      </button>
                      <button onClick={() => setOrderType('sell')} className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors ${orderType === 'sell' ? 'bg-destructive text-destructive-foreground' : 'bg-secondary text-muted-foreground'}`}>
                        {t('trading.sell')}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">{t('trading.price')} (USDT)</label>
                        <input
                          type="number"
                          value={COINS.find(c => c.symbol === selectedCoin)?.price || ''}
                          readOnly
                          className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">{t('trading.quantity')} ({selectedCoin})</label>
                        <input
                          type="number"
                          value={orderAmount}
                          onChange={(e) => setOrderAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[25, 50, 75, 100].map(pct => (
                          <button key={pct} className="py-1.5 rounded text-xs bg-secondary text-muted-foreground hover:text-foreground transition-colors">{pct}%</button>
                        ))}
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/50 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                          <span>{t('trading.total')}</span>
                          <span className="text-foreground font-medium">
                            {orderAmount ? `$${(parseFloat(orderAmount) * (COINS.find(c => c.symbol === selectedCoin)?.price || 0)).toLocaleString()}` : '$0.00'}
                          </span>
                        </div>
                      </div>
                      <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        orderType === 'buy'
                          ? 'bg-accent text-accent-foreground hover:opacity-90'
                          : 'bg-destructive text-destructive-foreground hover:opacity-90'
                      }`}>
                        {orderType === 'buy' ? t('trading.buy') : t('trading.sell')} {selectedCoin}
                      </button>
                    </div>
                  </>
                )}

                {!selectedCoin && (
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>{t('trading.select_coin')}</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trading;
