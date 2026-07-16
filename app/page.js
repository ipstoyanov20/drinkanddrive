'use client';

import { useState, useEffect } from 'react';

// Neighborhood Data (Bulgarian Only)
const neighborhoods = {
  center: 'Център',
  lazur: 'ж.к. Лазур',
  sea_garden: 'Морска градина',
  meden_rudnik: 'ж.к. Меден рудник',
  slaveykov: 'ж.к. Славейков',
  izgrev: 'ж.к. Изгрев',
  sarafovo: 'кв. Сарафово',
  kraimorie: 'кв. Крайморие',
  vetren: 'кв. Ветрен / Банево'
};

// Distance matrix in km
const distanceMatrix = {
  'center_center': 0,
  'center_lazur': 2,
  'center_sea_garden': 1.5,
  'center_meden_rudnik': 9,
  'center_slaveykov': 5,
  'center_izgrev': 6,
  'center_sarafovo': 11,
  'center_kraimorie': 12,
  'center_vetren': 15,
  
  'lazur_lazur': 0,
  'lazur_sea_garden': 1,
  'lazur_meden_rudnik': 10,
  'lazur_slaveykov': 4,
  'lazur_izgrev': 3,
  'lazur_sarafovo': 9,
  'lazur_kraimorie': 13,
  'lazur_vetren': 14,
  
  'sea_garden_sea_garden': 0,
  'sea_garden_meden_rudnik': 10.5,
  'sea_garden_slaveykov': 5,
  'sea_garden_izgrev': 4,
  'sea_garden_sarafovo': 9.5,
  'sea_garden_kraimorie': 13.5,
  'sea_garden_vetren': 14.5,
  
  'meden_rudnik_meden_rudnik': 0,
  'meden_rudnik_slaveykov': 12,
  'meden_rudnik_izgrev': 13,
  'meden_rudnik_sarafovo': 19,
  'meden_rudnik_kraimorie': 15,
  'meden_rudnik_vetren': 21,
  
  'slaveykov_slaveykov': 0,
  'slaveykov_izgrev': 2.5,
  'slaveykov_sarafovo': 10.5,
  'slaveykov_kraimorie': 15.5,
  'slaveykov_vetren': 11,
  
  'izgrev_izgrev': 0,
  'izgrev_sarafovo': 8,
  'izgrev_kraimorie': 16.5,
  'izgrev_vetren': 12.5,
  
  'sarafovo_sarafovo': 0,
  'sarafovo_kraimorie': 22,
  'sarafovo_vetren': 20,
  
  'kraimorie_kraimorie': 0,
  'kraimorie_vetren': 24,
  
  'vetren_vetren': 0
};

// Helper function to get distance between two keys (handles symmetry)
function getDistance(loc1, loc2) {
  if (loc1 === loc2) return 0;
  const key = [loc1, loc2].sort().join('_');
  return distanceMatrix[key] || 5; // Default to 5 km if undefined
}

export default function Home() {
  // --- States ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Calculator States
  const [startLoc, setStartLoc] = useState('center');
  const [endLoc, setEndLoc] = useState('sarafovo');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Contact Form States
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // --- Effects ---
  // Ensure body language class is set for styles
  useEffect(() => {
    document.body.className = 'lang-bg';
  }, []);

  // Scroll listener for sticky header height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Calculated Pricing Values ---
  const distance = getDistance(startLoc, endLoc);
  const timeEst = Math.ceil(distance * 1.8 + 5);
  
  let price = 10; // Base price for first 3 km
  if (distance > 3) {
    price += (distance - 3) * 3.0; // 3 BGN per additional km
  }
  if (startLoc === endLoc) {
    price = 10; // Minimum local charge
  }
  
  const priceEur = (price * 0.51129).toFixed(2);
  const priceText = `${price.toFixed(2)} BGN`;

  // Pre-filled WhatsApp Text in Bulgarian
  const startName = neighborhoods[startLoc] || '';
  const endName = neighborhoods[endLoc] || '';
  const whatsappMsg = `Здравейте LuxeDrive! Бих искал да поръчам Дринк енд Драйв шофьор от: ${startName} до: ${endName}. (Прогнозна цена: ${priceText}, Разстояние: ${distance} km).`;
  
  const whatsappUrl = `https://wa.me/359888888888?text=${encodeURIComponent(whatsappMsg)}`;

  // --- Handlers ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry details:', { name: formName, phone: formPhone, message: formMessage });
    
    // Clear form and trigger banner
    setFormName('');
    setFormPhone('');
    setFormMessage('');
    setFormSuccess(true);
    
    setTimeout(() => {
      setFormSuccess(false);
    }, 6000);
  };

  return (
    <>
      {/* Floating Grid Background Overlay */}
      <div className="grid-overlay"></div>

      {/* HEADER / NAVIGATION */}
      <header className={`fixed top-0 left-0 w-full z-50 bg-header border-b border-muted backdrop-blur-md transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display font-extrabold text-2xl tracking-wider text-accent transition-colors duration-300">
              LUXE<span className="text-primary font-light">DRIVE</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="nav-link">Как работи</a>
            <a href="#calculator" className="nav-link">Калкулатор</a>
            <a href="#why-us" className="nav-link">Защо ние</a>
            <a href="#reviews" className="nav-link">Отзиви</a>
            <a href="#contact" className="nav-link">Контакти</a>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-4">
            {/* Call Button */}
            <a href="tel:+359888888888" className="btn-primary font-display font-semibold text-sm tracking-wider uppercase transition-colors duration-300">
              Позвъни Сега
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              id="menu-toggle" 
              aria-label="Toggle Menu" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-between w-6 h-4 bg-transparent border-none cursor-pointer"
            >
              <span className="w-full h-0.5 bg-primary transition-transform duration-300" style={isMenuOpen ? {transform: 'translateY(6px) rotate(45deg)'} : {}}></span>
              <span className="w-full h-0.5 bg-primary transition-opacity duration-300" style={isMenuOpen ? {opacity: 0} : {}}></span>
              <span className="w-full h-0.5 bg-primary transition-transform duration-300" style={isMenuOpen ? {transform: 'translateY(-6px) rotate(-45deg)'} : {}}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div id="mobile-menu" className={`fixed inset-0 z-40 bg-primary border-l border-muted flex flex-col justify-center items-center gap-8 transform transition-transform duration-500 md:hidden ${isMenuOpen ? 'active' : 'translate-x-full'}`}>
        <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link text-2xl font-display">Как работи</a>
        <a href="#calculator" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link text-2xl font-display">Калкулатор</a>
        <a href="#why-us" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link text-2xl font-display">Защо ние</a>
        <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link text-2xl font-display">Отзиви</a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link text-2xl font-display">Контакти</a>
        
        <a href="tel:+359888888888" className="btn-primary px-8 py-4 font-display font-semibold tracking-wider uppercase mt-4">
          Звънни за Шофьор
        </a>
      </div>

      <main className="pt-20">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center py-20 px-6 overflow-hidden border-b border-muted">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/hero_bg.jpg')` }}></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
          {/* Subtle light overlay to fit the white theme */}
          <div className="absolute inset-0 z-0 bg-white/75"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/5 px-4 py-2 w-fit">
                <span className="w-2 h-2 bg-accent animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                  24/7 Дринк енд Драйв в Бургас
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-tight uppercase text-primary">
                Вие пиете.<br />Ние караме.<br /><span className="text-accent">Вашата кола.</span>
              </h1>
              
              <p className="text-secondary text-lg max-w-xl">
                Професионално, сигурно и достъпно прибиране с Вашия собствен автомобил. Доверете се на опитните шофьори на LuxeDrive Burgas. Пристигаме до 15 минути.
              </p>

              <div className="flex flex-wrap gap-4 mt-4">
                <a href="tel:+359888888888" className="btn-primary font-display font-semibold tracking-wider uppercase transition-colors duration-300">
                  Поръчай по Телефона
                </a>
                <a href="#calculator" className="btn-secondary font-display font-semibold tracking-wider uppercase transition-colors duration-300">
                  Изчисли Цена
                </a>
              </div>

              {/* Trustpilot Header Banner in Hero */}
              <div className="flex items-center gap-4 mt-8 p-4 bg-secondary/80 border border-muted w-fit backdrop-blur-sm">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold tracking-wider text-primary">Trustpilot</span>
                    <div className="flex gap-0.5">
                      <span className="tp-star-mini"></span>
                      <span className="tp-star-mini"></span>
                      <span className="tp-star-mini"></span>
                      <span className="tp-star-mini"></span>
                      <span className="tp-star-mini"></span>
                    </div>
                  </div>
                  <p className="text-xs text-secondary mt-1">
                    Оценка <strong>4.8/5</strong> въз основа на 142 отзива
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contacts widget / Right column */}
            <div className="lg:col-span-5 bg-secondary border border-muted p-8 relative flex flex-col gap-6 w-full max-w-md mx-auto card-spacious">
              <div className="border-b border-muted pb-4">
                <h2 className="text-xl font-display font-bold uppercase tracking-wider text-primary">
                  Бърза Връзка
                </h2>
                <p className="text-xs text-secondary mt-1">
                  Свържете се с диспечер веднага
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a href="tel:+359888888888" className="quick-contact-btn flex items-center justify-between border border-muted hover:border-accent hover:bg-accent/5 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="text-accent text-xl">📞</span>
                    <div className="text-left">
                      <p className="text-xs text-secondary">Телефонна линия</p>
                      <p className="font-bold font-display tracking-wider text-primary">+359 88 888 8888</p>
                    </div>
                  </div>
                  <span className="text-accent">➔</span>
                </a>

                <a href="https://wa.me/359888888888" target="_blank" rel="noopener noreferrer" className="quick-contact-btn flex items-center justify-between border border-muted hover:border-accent hover:bg-accent/5 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="text-[#25D366] text-xl">💬</span>
                    <div className="text-left">
                      <p className="text-xs text-secondary">WhatsApp</p>
                      <p className="font-bold font-display tracking-wider text-primary">Чат в реално време</p>
                    </div>
                  </div>
                  <span className="text-accent">➔</span>
                </a>

                <a href="viber://chat?number=%2B359888888888" className="quick-contact-btn flex items-center justify-between border border-muted hover:border-accent hover:bg-accent/5 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="text-[#7360F2] text-xl">📱</span>
                    <div className="text-left">
                      <p className="text-xs text-secondary">Viber</p>
                      <p className="font-bold font-display tracking-wider text-primary">Пишете ни във Viber</p>
                    </div>
                  </div>
                  <span className="text-accent">➔</span>
                </a>
              </div>

              <p className="text-[10px] text-muted text-center uppercase tracking-widest">
                Средно време за отговор: 3 минути
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-24 px-6 border-b border-muted">
          <div className="max-w-7xl mx-auto text-center flex flex-col gap-16">
            <div className="flex flex-col gap-4 max-w-xl mx-auto">
              <h2 className="text-xs uppercase tracking-widest text-accent font-semibold">
                Лесни Стъпки
              </h2>
              <p className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-wider text-primary">
                Как работи услугата?
              </p>
              <div className="w-20 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-secondary border border-muted flex flex-col gap-4 text-left transition-all duration-300 hover:border-accent group card-spacious">
                <span className="font-display font-extrabold text-5xl text-accent/20 group-hover:text-accent transition-colors duration-500">01</span>
                <h3 className="text-xl font-display font-bold uppercase tracking-wider text-primary">
                  Свържете се с нас
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Обадете ни се по телефона или ни изпратете съобщение във Viber / WhatsApp с текущото Ви местоположение в Бургас и крайната Ви дестинация.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-secondary border border-muted flex flex-col gap-4 text-left transition-all duration-300 hover:border-accent group card-spacious">
                <span className="font-display font-extrabold text-5xl text-accent/20 group-hover:text-accent transition-colors duration-500">02</span>
                <h3 className="text-xl font-display font-bold uppercase tracking-wider text-primary">
                  Шофьорът пристига
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Наш професионален, опитен и проверен шофьор ще бъде при Вас до 15-20 минути, облечен с фирмено облекло за лесна идентификация.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-secondary border border-muted flex flex-col gap-4 text-left transition-all duration-300 hover:border-accent group card-spacious">
                <span className="font-display font-extrabold text-5xl text-accent/20 group-hover:text-accent transition-colors duration-500">03</span>
                <h3 className="text-xl font-display font-bold uppercase tracking-wider text-primary">
                  Комфортно прибиране
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Вие се настанявате удобно в колата си, докато нашият шофьор ви кара до дома Ви безопасно и спазвайки всички правила за движение.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PRICE CALCULATOR */}
        <section id="calculator" className="py-24 px-6 border-b border-muted bg-secondary/30 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Info Column */}
              <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                <h2 className="text-xs uppercase tracking-widest text-accent font-semibold">
                  Онлайн изчисление
                </h2>
                <p className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-wider text-primary">
                  Калкулатор на цената
                </p>
                <div className="w-16 h-1 bg-accent"></div>
                
                <p className="text-secondary text-sm leading-relaxed">
                  Планирайте бюджета си предварително! Ние нямаме скрити такси. Нашата тарифа е прозрачна и се базира на разстоянието между кварталите в Бургас. Изберете начална и крайна точка за мигновена оценка.
                </p>
                
                <div className="flex flex-col gap-3 mt-2 text-xs uppercase tracking-wider text-secondary font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Начална такса: 10.00 лв. (вкл. първите 3 км)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Всеки следващ километър: 3.00 лв.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">•</span>
                    <span>Втори шофьор (придружаващ автомобил) включен в цената</span>
                  </div>
                </div>
              </div>

              {/* Calculator Widget */}
              <div className="lg:col-span-7 bg-secondary border border-muted w-full card-spacious">
                <h3 className="text-lg font-display font-bold uppercase tracking-wider border-b border-muted pb-4 mb-6 text-primary">
                  Калкулиране на маршрут
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Start Location Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="calc-start" className="text-xs uppercase tracking-widest text-secondary font-semibold">
                      От (Квартал / Място)
                    </label>
                    <select 
                      id="calc-start" 
                      value={startLoc} 
                      onChange={(e) => setStartLoc(e.target.value)}
                      className="calc-select"
                    >
                      {Object.keys(neighborhoods).map(key => (
                        <option key={key} value={key}>
                          {neighborhoods[key]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* End Location Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="calc-end" className="text-xs uppercase tracking-widest text-secondary font-semibold">
                      До (Квартал / Място)
                    </label>
                    <select 
                      id="calc-end" 
                      value={endLoc} 
                      onChange={(e) => setEndLoc(e.target.value)}
                      className="calc-select"
                    >
                      {Object.keys(neighborhoods).map(key => (
                        <option key={key} value={key}>
                          {neighborhoods[key]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Output Box */}
                <div className="mt-8 p-6 bg-primary border border-muted flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <p className="text-xs text-secondary uppercase tracking-widest">
                      Приблизителна цена
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span id="calc-price-bgn" className="text-3xl font-display font-black text-accent">{priceText}</span>
                      <span id="calc-price-eur" className="text-sm text-secondary">(~{priceEur} EUR)</span>
                    </div>
                    <p className="text-[10px] text-muted uppercase tracking-widest mt-1">
                      Разстояние: <span id="calc-dist">{distance} km</span> | Време: ~<span id="calc-time">{timeEst} мин</span>
                    </p>
                  </div>

                  <button 
                    id="book-calc-ride" 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto btn-primary font-display font-semibold tracking-wider text-xs uppercase transition-colors duration-300"
                  >
                    Поръчай този курс
                  </button>
                </div>
                
                <p className="text-[10px] text-muted mt-4">
                  * Посочените цени са прогнозни. Извънградски курсове или изчакване се таксуват допълнително по договаряне.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* WHY CHOOSE US (FEATURES) */}
        <section id="why-us" className="py-24 px-6 border-b border-muted">
          <div className="max-w-7xl mx-auto text-center flex flex-col gap-16">
            <div className="flex flex-col gap-4 max-w-xl mx-auto">
              <h2 className="text-xs uppercase tracking-widest text-accent font-semibold">
                Нашите Предимства
              </h2>
              <p className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-wider text-primary">
                Защо да изберете LuxeDrive?
              </p>
              <div className="w-20 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-secondary border border-muted text-left flex flex-col gap-4 hover:border-accent transition-colors duration-300 card-spacious">
                <span className="text-3xl text-accent">👮‍♂️</span>
                <h3 className="text-lg font-display font-bold uppercase tracking-wider text-primary">
                  Опитни Шофьори
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Всички наши шофьори имат дългогодишен стаж, чисти досиета и са преминали строг тест за професионално шофиране.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-secondary border border-muted text-left flex flex-col gap-4 hover:border-accent transition-colors duration-300 card-spacious">
                <span className="text-3xl text-accent">⚡</span>
                <h3 className="text-lg font-display font-bold uppercase tracking-wider text-primary">
                  Бързо Пристигане
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Разполагаме с екипи, разпределени в ключови точки на Бургас, което гарантира минимално време за чакане (15-20 минути).
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-secondary border border-muted text-left flex flex-col gap-4 hover:border-accent transition-colors duration-300 card-spacious">
                <span className="text-3xl text-accent">🛡️</span>
                <h3 className="text-lg font-display font-bold uppercase tracking-wider text-primary">
                  Пълна Застраховка
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Услугата е напълно застрахована. Докато шофираме Вашия автомобил, той е напълно защитен и обезпечен при евентуален инцидент.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-secondary border border-muted text-left flex flex-col gap-4 hover:border-accent transition-colors duration-300 card-spacious">
                <span className="text-3xl text-accent">💶</span>
                <h3 className="text-lg font-display font-bold uppercase tracking-wider text-primary">
                  Разумни Цени
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Най-добрата цена в Бургас за професионална грижа. Без неочаквани надценки за нощни тарифи или уикенди.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTPILOT REVIEWS SECTION */}
        <section id="reviews" className="py-24 px-6 border-b border-muted bg-secondary/30">
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            
            {/* Trustpilot Overall Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-muted pb-8">
              <div className="text-left flex flex-col gap-4">
                <h2 className="text-xs uppercase tracking-widest text-accent font-semibold">
                  Какво казват клиентите
                </h2>
                <p className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-wider text-primary">
                  Отзиви в Trustpilot
                </p>
                <div className="w-16 h-1 bg-accent"></div>
              </div>

              {/* Rating Widget */}
              <div className="flex items-center gap-6 p-6 bg-primary border border-muted">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-extrabold text-2xl tracking-wider text-[#00B67A]">Trustpilot</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="tp-star"></span>
                    <span className="tp-star"></span>
                    <span className="tp-star"></span>
                    <span className="tp-star"></span>
                    <span className="tp-star"></span>
                  </div>
                </div>
                <div className="h-10 w-px bg-muted"></div>
                <div className="text-left">
                  <p className="font-bold text-lg leading-none text-primary">4.8 / 5</p>
                  <p className="text-xs text-secondary mt-1 font-semibold">
                    Оценка: <strong>Отличен</strong>
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">
                    Въз основа на 142 реални мнения
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Trustpilot Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-primary border border-muted flex flex-col justify-between gap-6 hover:border-accent transition-colors duration-300 card-spacious">
                <div className="flex flex-col gap-4">
                  {/* Rating Stars and Date */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                    </div>
                    <span className="text-xs text-muted font-medium">2 дни преди</span>
                  </div>
                  
                  {/* Review text */}
                  <div className="text-left">
                    <h4 className="font-bold text-base uppercase tracking-wider mb-2 text-primary">
                      Най-добрата дринк услуга!
                    </h4>
                    <p className="text-secondary text-sm leading-relaxed font-light">
                      „Поръчах LuxeDrive от Bar Caribi в Морската градина до Меден рудник. Шофьорът пристигна точно след 12 минути, изключително любезен и възпитан. Караше моето BMW много внимателно и плавно. Цената беше точно колкото калкулатора показа!“
                    </p>
                  </div>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3 border-t border-muted/50 pt-4 text-left">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center font-bold text-accent text-sm">IS</div>
                  <div>
                    <p className="font-semibold text-sm text-primary">Иван Стоянов</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[#00B67A] text-xs">✓</span>
                      <span className="text-[10px] text-[#00B67A] uppercase tracking-wider font-bold">Потвърден клиент</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-primary border border-muted flex flex-col justify-between gap-6 hover:border-accent transition-colors duration-300 card-spacious">
                <div className="flex flex-col gap-4">
                  {/* Rating Stars and Date */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                    </div>
                    <span className="text-xs text-muted font-medium">1 седмица преди</span>
                  </div>
                  
                  {/* Review text */}
                  <div className="text-left">
                    <h4 className="font-bold text-base uppercase tracking-wider mb-2 text-primary">
                      Изключително професионални
                    </h4>
                    <p className="text-secondary text-sm leading-relaxed font-light">
                      „Бяхме на рожден ден в ж.к. Лазур и трябваше да се приберем в Сарафово. За първи път ползвахме LuxeDrive. Шофьорът ни помогна с багажа и се държа изключително професионално. Колата ни е чисто нова и се притеснявахме, но той я управляваше страхотно.“
                    </p>
                  </div>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3 border-t border-muted/50 pt-4 text-left">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center font-bold text-accent text-sm">EK</div>
                  <div>
                    <p className="font-semibold text-sm text-primary">Елена Колева</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[#00B67A] text-xs">✓</span>
                      <span className="text-[10px] text-[#00B67A] uppercase tracking-wider font-bold">Потвърден клиент</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-primary border border-muted flex flex-col justify-between gap-6 hover:border-accent transition-colors duration-300 card-spacious">
                <div className="flex flex-col gap-4">
                  {/* Rating Stars and Date */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                      <span className="tp-star"></span>
                    </div>
                    <span className="text-xs text-muted font-medium">2 седмици преди</span>
                  </div>
                  
                  {/* Review text */}
                  <div className="text-left">
                    <h4 className="font-bold text-base uppercase tracking-wider mb-2 text-primary">
                      Препоръчвам с две ръце!
                    </h4>
                    <p className="text-secondary text-sm leading-relaxed font-light">
                      „Бърза реакция и много добри цени. Пътувах от Центъра на Бургас до Крайморие след вечерно излизане с приятели. Шофьорът пристигна бързо, колата беше паркирана перфектно пред вкъщи. Много коректно отношение, ще ползвам отново.“
                    </p>
                  </div>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3 border-t border-muted/50 pt-4 text-left">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center font-bold text-accent text-sm">SD</div>
                  <div>
                    <p className="font-semibold text-sm text-primary">Стефан Димитров</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[#00B67A] text-xs">✓</span>
                      <span className="text-[10px] text-[#00B67A] uppercase tracking-wider font-bold">Потвърден клиент</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trustpilot Disclaimer */}
            <p className="text-[10px] text-muted text-center tracking-wider font-medium">
              * Посочените по-горе отзиви са илюстративни с цел демонстрация на качеството на услугата ни съгласно стандартите на Trustpilot.
            </p>
          </div>
        </section>

        {/* BOOKING / CONTACT FORM */}
        <section id="contact" className="py-24 px-6 border-b border-muted">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Contact details */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-8 text-left bg-secondary border border-muted p-8 card-spacious">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xs uppercase tracking-widest text-accent font-semibold">
                    Свържете се с нас
                  </h2>
                  <h3 className="text-3xl font-display font-extrabold uppercase tracking-wider text-primary">
                    Имате въпроси?
                  </h3>
                  <div className="w-16 h-1 bg-accent"></div>
                  
                  <p className="text-secondary text-sm leading-relaxed mt-2">
                    Ако имате нужда от дългосрочен личен шофьор, трансфер до летище Бургас или София, или корпоративни услуги, не се колебайте да ни изпратите съобщение или да се обадите.
                  </p>
                </div>

                <div className="flex flex-col gap-4 border-t border-muted/50 pt-6">
                  <div className="flex items-center gap-3">
                    <span className="text-accent text-lg">📍</span>
                    <div>
                      <p className="text-[10px] text-muted uppercase tracking-widest">Офис / Район</p>
                      <p className="text-sm font-bold text-primary">г. Бургас, България</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-accent text-lg">✉️</span>
                    <div>
                      <p className="text-[10px] text-muted uppercase tracking-widest">Email</p>
                      <p className="text-sm font-bold text-primary">office@luxedrive-burgas.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-accent text-lg">📞</span>
                    <div>
                      <p className="text-[10px] text-muted uppercase tracking-widest">Телефон за поръчки</p>
                      <p className="text-sm font-bold text-primary">+359 88 888 8888</p>
                    </div>
                  </div>
                </div>

                {/* Active hours indicator */}
                <div className="bg-primary border border-muted p-4 flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
                  <p className="text-xs text-secondary font-bold tracking-wide uppercase">
                    Шофьори на разположение в момента
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-7 bg-secondary border border-muted p-8 flex flex-col gap-6 card-spacious">
                <h3 className="text-xl font-display font-bold uppercase tracking-wider border-b border-muted pb-4 text-primary">
                  Изпратете ни Запитване
                </h3>
                
                <form id="contact-form" onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-name" className="text-xs uppercase tracking-widest text-secondary font-semibold">
                        Вашето Име
                      </label>
                      <input 
                        type="text" 
                        id="form-name" 
                        required 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="form-input" 
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-phone" className="text-xs uppercase tracking-widest text-secondary font-semibold">
                        Телефонен Номер
                      </label>
                      <input 
                        type="tel" 
                        id="form-phone" 
                        required 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="form-input" 
                      />
                    </div>
                  </div>

                  {/* Message/Details */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="form-message" className="text-xs uppercase tracking-widest text-secondary font-semibold">
                      Подробности за курс / Съобщение
                    </label>
                    <textarea 
                      id="form-message" 
                      rows="4" 
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="form-textarea resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn-primary w-full font-display font-semibold tracking-wider text-sm uppercase transition-colors duration-300">
                    Изпрати Запитване
                  </button>
                </form>
                
                {formSuccess && (
                  <div id="form-success" className="p-4 bg-accent/10 border border-accent text-accent text-center text-sm font-semibold uppercase tracking-wider">
                    Благодарим Ви! Вашето съобщение беше изпратено. Ще се свържем с Вас съвсем скоро.
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-primary border-t border-muted py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display font-extrabold text-xl tracking-wider text-accent">
              LUXE<span className="text-primary font-light">DRIVE</span>
            </span>
            <p className="text-xs text-muted font-medium">
              © 2026 LuxeDrive Burgas. Всички права запазени.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest text-secondary font-bold">
            <a href="#how-it-works" className="hover:text-accent transition-colors duration-300">Как работи</a>
            <a href="#calculator" className="hover:text-accent transition-colors duration-300">Калкулатор</a>
            <a href="#why-us" className="hover:text-accent transition-colors duration-300">Предимства</a>
            <a href="#reviews" className="hover:text-accent transition-colors duration-300">Отзиви</a>
            <a href="#contact" className="hover:text-accent transition-colors duration-300">Контакти</a>
          </nav>
        </div>
      </footer>

      {/* Booking Overlay Modal */}
      <div id="booking-modal" className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6 transition-opacity duration-300 ${isModalOpen ? 'active' : 'pointer-events-none opacity-0'}`}>
        <div className="bg-secondary border border-muted p-8 max-w-md w-full relative flex flex-col gap-6 card-spacious">
          <button 
            id="close-modal" 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-secondary hover:text-primary text-xl bg-transparent border-none cursor-pointer"
          >
            ✕
          </button>
          
          <div className="border-b border-muted pb-4">
            <h3 className="text-lg font-display font-bold uppercase tracking-wider text-accent">
              Потвърждение на курс
            </h3>
            <p className="text-xs text-secondary mt-1">
              Вашата селекция от калкулатора
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm text-left">
            <div>
              <span className="text-xs text-muted uppercase tracking-widest font-semibold">От</span>
              <p id="modal-start-loc" className="font-bold text-primary">{startName}</p>
            </div>
            <div>
              <span className="text-xs text-muted uppercase tracking-widest font-semibold">До</span>
              <p id="modal-end-loc" className="font-bold text-primary">{endName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-muted/50 pt-4">
              <div>
                <span className="text-xs text-muted uppercase tracking-widest font-semibold">Разстояние</span>
                <p id="modal-dist" className="font-bold text-primary">{distance} km</p>
              </div>
              <div>
                <span className="text-xs text-muted uppercase tracking-widest font-semibold">Цена</span>
                <p id="modal-price" className="font-extrabold text-accent font-display text-xl">{priceText}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <a 
              id="modal-call-btn" 
              href="tel:+359888888888" 
              className="btn-primary w-full text-center font-display font-bold tracking-wider text-xs uppercase transition-colors duration-300"
            >
              Обади се за поръчка
            </a>
            <a 
              id="modal-whatsapp-btn" 
              target="_blank" 
              rel="noopener noreferrer"
              href={whatsappUrl} 
              className="btn-secondary w-full text-center font-display font-bold tracking-wider text-xs uppercase transition-colors duration-300"
            >
              Поръчай чрез WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
