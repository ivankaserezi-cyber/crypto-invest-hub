import React, { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'ru' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  'nav.home': { ru: 'Главная', en: 'Home' },
  'nav.deposit': { ru: 'Депозит', en: 'Deposit' },
  'nav.referrals': { ru: 'Рефералы', en: 'Referrals' },
  'nav.withdraw': { ru: 'Вывод', en: 'Withdraw' },
  'nav.documents': { ru: 'Документы', en: 'Documents' },
  'nav.top': { ru: 'Топ инвесторы', en: 'Top Investors' },
  'nav.rates': { ru: 'Тарифы', en: 'Rates' },
  'nav.contacts': { ru: 'Контакты', en: 'Contacts' },
  'nav.dashboard': { ru: 'Кабинет', en: 'Dashboard' },
  'nav.trading': { ru: 'Торговля', en: 'Trading' },
  'nav.about': { ru: 'О нас', en: 'About Us' },

  // Auth
  'auth.login': { ru: 'Войти', en: 'Log In' },
  'auth.register': { ru: 'Регистрация', en: 'Register' },
  'auth.login_title': { ru: 'Вход в аккаунт', en: 'Log In' },
  'auth.login_subtitle': { ru: 'Войдите для управления инвестициями', en: 'Log in to manage your investments' },
  'auth.register_title': { ru: 'Создать аккаунт', en: 'Create Account' },
  'auth.register_subtitle': { ru: 'Начните инвестировать уже сегодня', en: 'Start investing today' },
  'auth.password': { ru: 'Пароль', en: 'Password' },
  'auth.name': { ru: 'Имя', en: 'Name' },
  'auth.password_placeholder': { ru: 'Минимум 6 символов', en: 'At least 6 characters' },
  'auth.no_account': { ru: 'Нет аккаунта?', en: "Don't have an account?" },
  'auth.has_account': { ru: 'Уже есть аккаунт?', en: 'Already have an account?' },
  'auth.login_error': { ru: 'Неверный email или пароль', en: 'Invalid email or password' },
  'auth.register_error': { ru: 'Ошибка регистрации', en: 'Registration error' },
  'auth.password_short': { ru: 'Пароль слишком короткий', en: 'Password too short' },
  'auth.check_email': { ru: 'Проверьте вашу почту для подтверждения', en: 'Check your email for confirmation' },

  // Dashboard
  'dashboard.welcome': { ru: 'Добро пожаловать', en: 'Welcome' },
  'dashboard.subtitle': { ru: 'Управляйте вашими инвестициями', en: 'Manage your investments' },
  'dashboard.balance': { ru: 'Общий баланс', en: 'Total Balance' },
  'dashboard.profit_24h': { ru: 'Прибыль за 24ч', en: '24h Profit' },
  'dashboard.transactions': { ru: 'Транзакции', en: 'Transactions' },
  'dashboard.total': { ru: 'всего', en: 'total' },
  'dashboard.chart_title': { ru: 'График доходности', en: 'Profit Chart' },
  'dashboard.history': { ru: 'История транзакций', en: 'Transaction History' },
  'dashboard.no_transactions': { ru: 'Транзакций пока нет', en: 'No transactions yet' },
  'dashboard.type': { ru: 'Тип', en: 'Type' },
  'dashboard.amount': { ru: 'Сумма', en: 'Amount' },
  'dashboard.status': { ru: 'Статус', en: 'Status' },
  'dashboard.date': { ru: 'Дата', en: 'Date' },
  'dashboard.deposit': { ru: 'Депозит', en: 'Deposit' },
  'dashboard.withdrawal': { ru: 'Вывод', en: 'Withdrawal' },
  'dashboard.pending': { ru: 'Ожидание', en: 'Pending' },
  'dashboard.completed': { ru: 'Выполнено', en: 'Completed' },
  'dashboard.rejected': { ru: 'Отклонено', en: 'Rejected' },
  'dashboard.logout': { ru: 'Выйти', en: 'Log Out' },

  // Home
  'home.title': { ru: 'Инвестируйте в будущее с AI', en: 'Invest in the Future with AI' },
  'home.subtitle': { ru: 'Алгоритмы искусственного интеллекта управляют вашими инвестициями в криптовалюту, обеспечивая максимальную доходность', en: 'Artificial intelligence algorithms manage your crypto investments, ensuring maximum returns' },
  'home.cta': { ru: 'Начать инвестировать', en: 'Start Investing' },
  'home.stats.investors': { ru: 'Активных инвесторов', en: 'Active Investors' },
  'home.stats.managed': { ru: 'Под управлением', en: 'Assets Managed' },
  'home.stats.returns': { ru: 'Средняя доходность', en: 'Average Returns' },
  'home.stats.countries': { ru: 'Стран', en: 'Countries' },
  'home.why': { ru: 'Почему выбирают нас', en: 'Why Choose Us' },
  'home.why.ai': { ru: 'AI-алгоритмы', en: 'AI Algorithms' },
  'home.why.ai.desc': { ru: 'Нейросети анализируют рынок 24/7 и принимают решения за миллисекунды', en: 'Neural networks analyze markets 24/7 and make decisions in milliseconds' },
  'home.why.security': { ru: 'Безопасность', en: 'Security' },
  'home.why.security.desc': { ru: 'Многоуровневая система защиты ваших средств и данных', en: 'Multi-level security system for your funds and data' },
  'home.why.profit': { ru: 'Высокая доходность', en: 'High Returns' },
  'home.why.profit.desc': { ru: 'До 15% ежемесячно благодаря AI-оптимизации портфеля', en: 'Up to 15% monthly thanks to AI portfolio optimization' },
  'home.why.support': { ru: 'Поддержка 24/7', en: '24/7 Support' },
  'home.why.support.desc': { ru: 'Команда экспертов всегда готова помочь вам', en: 'Our expert team is always ready to help' },

  // Deposit
  'deposit.title': { ru: 'Внести депозит', en: 'Make a Deposit' },
  'deposit.subtitle': { ru: 'Выберите валюту и переведите средства', en: 'Choose a currency and transfer funds' },
  'deposit.amount_label': { ru: 'Сумма перевода', en: 'Transfer amount' },
  'deposit.confirm': { ru: 'Подтвердить депозит', en: 'Confirm Deposit' },
  'deposit.success': { ru: 'Заявка на депозит создана!', en: 'Deposit request created!' },
  'deposit.error': { ru: 'Ошибка. Попробуйте позже.', en: 'Error. Try again later.' },
  'deposit.enter_amount': { ru: 'Введите сумму', en: 'Enter an amount' },
  'deposit.copied': { ru: 'Адрес скопирован!', en: 'Address copied!' },

  // Withdraw
  'withdraw.title': { ru: 'Вывод средств', en: 'Withdraw Funds' },
  'withdraw.subtitle': { ru: 'Быстрый и безопасный вывод', en: 'Fast and secure withdrawal' },
  'withdraw.min': { ru: 'Мин: 50 USDT', en: 'Min: 50 USDT' },
  'withdraw.time': { ru: 'До 24 часов', en: 'Up to 24 hours' },
  'withdraw.fee': { ru: 'Комиссия: 0%', en: 'Fee: 0%' },
  'withdraw.network': { ru: 'Сеть', en: 'Network' },
  'withdraw.wallet_label': { ru: 'Адрес кошелька', en: 'Wallet address' },
  'withdraw.wallet_placeholder': { ru: 'Введите адрес кошелька', en: 'Enter wallet address' },
  'withdraw.amount_label': { ru: 'Сумма вывода (USDT)', en: 'Withdrawal amount (USDT)' },
  'withdraw.submit': { ru: 'Вывести средства', en: 'Withdraw Funds' },
  'withdraw.success': { ru: 'Заявка на вывод создана!', en: 'Withdrawal request created!' },
  'withdraw.error': { ru: 'Ошибка. Попробуйте позже.', en: 'Error. Try again later.' },
  'withdraw.min_error': { ru: 'Минимальная сумма — 50 USDT', en: 'Minimum is 50 USDT' },
  'withdraw.wallet_required': { ru: 'Введите адрес кошелька', en: 'Enter wallet address' },
  'withdraw.networks': { ru: 'Поддерживаемые сети', en: 'Supported Networks' },

  // Trading
  'trading.title': { ru: 'Торговля', en: 'Trading' },
  'trading.subtitle': { ru: 'Торгуйте криптовалютой в реальном времени', en: 'Trade cryptocurrency in real time' },
  'trading.spot': { ru: 'Спот', en: 'Spot' },
  'trading.futures': { ru: 'Фьючерсы', en: 'Futures' },
  'trading.margin': { ru: 'Маржа', en: 'Margin' },
  'trading.market_cap': { ru: 'Капитализация', en: 'Market Cap' },
  'trading.price': { ru: 'Цена', en: 'Price' },
  'trading.change': { ru: 'Изменение', en: 'Change' },
  'trading.select_pair': { ru: 'Выберите пару', en: 'Select a pair' },
  'trading.select_coin': { ru: 'Выберите монету из списка', en: 'Select a coin from the list' },
  'trading.buy': { ru: 'Купить', en: 'Buy' },
  'trading.sell': { ru: 'Продать', en: 'Sell' },
  'trading.quantity': { ru: 'Количество', en: 'Quantity' },
  'trading.total': { ru: 'Итого', en: 'Total' },

  // About
  'about.title': { ru: 'О нас', en: 'About Us' },
  'about.subtitle': { ru: 'Узнайте больше о CryptoAI Invest', en: 'Learn more about CryptoAI Invest' },
  'about.mission_title': { ru: 'Наша миссия', en: 'Our Mission' },
  'about.mission_desc': { ru: 'Мы создали платформу, которая делает инвестиции в криптовалюту доступными для каждого. Наши AI-алгоритмы работают круглосуточно, анализируя рынок и принимая оптимальные решения для максимальной доходности.', en: 'We built a platform that makes crypto investing accessible to everyone. Our AI algorithms work 24/7, analyzing the market and making optimal decisions for maximum returns.' },
  'about.why_us': { ru: 'Почему именно наша биржа', en: 'Why Choose Our Exchange' },
  'about.fact1_title': { ru: 'Защита активов', en: 'Asset Protection' },
  'about.fact1_desc': { ru: '95% активов хранятся в холодных кошельках с мультиподписью. Страховой фонд покрывает до $150M.', en: '95% of assets are stored in cold wallets with multi-signature. Insurance fund covers up to $150M.' },
  'about.fact2_title': { ru: 'Скорость исполнения', en: 'Execution Speed' },
  'about.fact2_desc': { ru: 'Движок торговли обрабатывает до 1.4 млн ордеров в секунду с задержкой менее 1мс.', en: 'Trading engine processes up to 1.4M orders/sec with latency under 1ms.' },
  'about.fact3_title': { ru: 'Глобальный охват', en: 'Global Reach' },
  'about.fact3_desc': { ru: 'Работаем в 45+ странах, поддерживаем 15+ фиатных валют и 200+ криптовалютных пар.', en: 'Operating in 45+ countries, supporting 15+ fiat currencies and 200+ crypto pairs.' },
  'about.fact4_title': { ru: 'Лицензии', en: 'Licensed' },
  'about.fact4_desc': { ru: 'Лицензия MSB в Канаде и регистрация в FinCEN. Полное соответствие KYC/AML.', en: 'MSB license in Canada and FinCEN registration. Full KYC/AML compliance.' },
  'about.fact5_title': { ru: 'Сообщество', en: 'Community' },
  'about.fact5_desc': { ru: 'Более 12,500 активных трейдеров доверяют нам свои средства. Рейтинг 4.8/5 на Trustpilot.', en: 'Over 12,500 active traders trust us with their funds. Rated 4.8/5 on Trustpilot.' },
  'about.fact6_title': { ru: 'AI-торговля', en: 'AI Trading' },
  'about.fact6_desc': { ru: 'Собственные нейросети с точностью прогнозирования 87.3%. Обучение на 5+ лет исторических данных.', en: 'Proprietary neural networks with 87.3% prediction accuracy. Trained on 5+ years of historical data.' },
  'about.fact7_title': { ru: 'Прозрачность', en: 'Transparency' },
  'about.fact7_desc': { ru: 'Ежемесячные аудиты от Chainalysis. Proof-of-Reserves публикуется каждую неделю.', en: 'Monthly audits by Chainalysis. Proof-of-Reserves published weekly.' },
  'about.fact8_title': { ru: 'Поддержка 24/7', en: '24/7 Support' },
  'about.fact8_desc': { ru: 'Среднее время ответа — 3 минуты. VIP-клиенты получают персонального менеджера.', en: 'Average response time — 3 minutes. VIP clients get a personal manager.' },
  'about.stat_founded': { ru: 'Год основания', en: 'Founded' },
  'about.stat_users': { ru: 'Пользователей', en: 'Users' },
  'about.stat_volume': { ru: 'Объём торгов', en: 'Trade Volume' },
  'about.stat_countries': { ru: 'Стран', en: 'Countries' },

  // Referrals
  'referrals.title': { ru: 'Реферальная программа', en: 'Referral Program' },
  'referrals.subtitle': { ru: 'Приглашайте друзей и зарабатывайте вместе', en: 'Invite friends and earn together' },
  'referrals.level1': { ru: '1 уровень — 7%', en: 'Level 1 — 7%' },
  'referrals.level2': { ru: '2 уровень — 3%', en: 'Level 2 — 3%' },
  'referrals.level3': { ru: '3 уровень — 1%', en: 'Level 3 — 1%' },
  'referrals.how': { ru: 'Как это работает', en: 'How It Works' },
  'referrals.step1': { ru: 'Поделитесь вашей реферальной ссылкой', en: 'Share your referral link' },
  'referrals.step2': { ru: 'Друг регистрируется и вносит депозит', en: 'Friend registers and makes a deposit' },
  'referrals.step3': { ru: 'Вы получаете процент от его дохода', en: 'You receive a percentage of their income' },

  // Documents
  'documents.title': { ru: 'Документы', en: 'Documents' },
  'documents.subtitle': { ru: 'Правовая документация и лицензии', en: 'Legal documentation and licenses' },

  // Top Investors
  'top.title': { ru: 'Топ инвесторы', en: 'Top Investors' },
  'top.subtitle': { ru: 'Лучшие инвесторы нашей платформы', en: 'Best investors on our platform' },
  'top.investor': { ru: 'Инвестор', en: 'Investor' },
  'top.profit': { ru: 'Доход', en: 'Profit' },
  'top.invested': { ru: 'Инвестировано', en: 'Invested' },

  // Rates
  'rates.title': { ru: 'Инвестиционные планы', en: 'Investment Plans' },
  'rates.subtitle': { ru: 'Выберите оптимальный план для ваших инвестиций', en: 'Choose the optimal plan for your investments' },
  'rates.daily': { ru: 'в день', en: 'per day' },
  'rates.period': { ru: 'Срок', en: 'Period' },
  'rates.days': { ru: 'дней', en: 'days' },
  'rates.min': { ru: 'Мин. депозит', en: 'Min. deposit' },

  // Contacts
  'contacts.title': { ru: 'Контакты', en: 'Contacts' },
  'contacts.subtitle': { ru: 'Свяжитесь с нами любым удобным способом', en: 'Contact us in any convenient way' },
  'contacts.email': { ru: 'Электронная почта', en: 'Email' },
  'contacts.telegram': { ru: 'Телеграм', en: 'Telegram' },
  'contacts.support': { ru: 'Поддержка', en: 'Support' },

  // Footer
  'footer.rights': { ru: '© 2026 CryptoAI Invest. Все права защищены.', en: '© 2026 CryptoAI Invest. All rights reserved.' },
  'footer.risk': { ru: 'Инвестиции связаны с рисками. Прошлые результаты не гарантируют будущих доходов.', en: 'Investments involve risks. Past results do not guarantee future returns.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('ru');

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
};
