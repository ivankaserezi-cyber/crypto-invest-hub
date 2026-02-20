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
  'nav.deposit': { ru: 'Внести депозит', en: 'Deposit' },
  'nav.referrals': { ru: 'Рефералы', en: 'Referrals' },
  'nav.withdraw': { ru: 'Вывести средства', en: 'Withdraw' },
  'nav.documents': { ru: 'Документы', en: 'Documents' },
  'nav.top': { ru: 'Топ инвесторы', en: 'Top Investors' },
  'nav.rates': { ru: 'Проценты', en: 'Rates' },
  'nav.contacts': { ru: 'Контакты', en: 'Contacts' },
  'nav.office': { ru: 'Офис', en: 'Office' },

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
  'deposit.subtitle': { ru: 'Выберите план инвестирования и начните зарабатывать', en: 'Choose your investment plan and start earning' },
  'deposit.form.name': { ru: 'Ваше имя', en: 'Your Name' },
  'deposit.form.email': { ru: 'Email', en: 'Email' },
  'deposit.form.amount': { ru: 'Сумма депозита (USDT)', en: 'Deposit Amount (USDT)' },
  'deposit.form.wallet': { ru: 'Ваш кошелёк', en: 'Your Wallet' },
  'deposit.form.plan': { ru: 'Инвестиционный план', en: 'Investment Plan' },
  'deposit.form.submit': { ru: 'Отправить заявку', en: 'Submit Application' },
  'deposit.form.success': { ru: 'Заявка отправлена! Мы свяжемся с вами.', en: 'Application sent! We will contact you.' },
  'deposit.form.error': { ru: 'Ошибка отправки. Попробуйте позже.', en: 'Sending error. Try again later.' },
  'deposit.form.captcha': { ru: 'Решите пример', en: 'Solve the equation' },
  'deposit.form.captcha_error': { ru: 'Неверный ответ на капчу', en: 'Incorrect captcha answer' },
  'deposit.plan.starter': { ru: 'Стартовый', en: 'Starter' },
  'deposit.plan.pro': { ru: 'Профессиональный', en: 'Professional' },
  'deposit.plan.vip': { ru: 'VIP', en: 'VIP' },
  'deposit.wallet_address': { ru: 'Адрес для перевода', en: 'Wallet Address for Transfer' },
  'deposit.copied': { ru: 'Адрес скопирован!', en: 'Address copied!' },

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

  // Withdraw
  'withdraw.title': { ru: 'Вывод средств', en: 'Withdraw Funds' },
  'withdraw.subtitle': { ru: 'Быстрый и безопасный вывод ваших средств', en: 'Fast and secure withdrawal of your funds' },
  'withdraw.min': { ru: 'Минимальный вывод: 50 USDT', en: 'Minimum withdrawal: 50 USDT' },
  'withdraw.time': { ru: 'Время обработки: до 24 часов', en: 'Processing time: up to 24 hours' },
  'withdraw.fee': { ru: 'Комиссия: 0%', en: 'Fee: 0%' },
  'withdraw.networks': { ru: 'Поддерживаемые сети', en: 'Supported Networks' },

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

  // Office
  'office.title': { ru: 'Личный кабинет', en: 'Personal Office' },
  'office.subtitle': { ru: 'Войдите в свой аккаунт для управления инвестициями', en: 'Log in to manage your investments' },
  'office.login': { ru: 'Войти', en: 'Log In' },
  'office.register': { ru: 'Регистрация', en: 'Register' },
  'office.email': { ru: 'Email', en: 'Email' },
  'office.password': { ru: 'Пароль', en: 'Password' },

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
