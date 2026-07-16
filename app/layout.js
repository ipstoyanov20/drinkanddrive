import './globals.css';

export const metadata = {
  title: 'LuxeDrive Бургас | Премиум Дринк енд Драйв Услуги 24/7',
  description: 'Професионални дринк енд драйв услуги в град Бургас и региона. Ние прибираме Вас и Вашия автомобил безопасно, сигурно и бързо. Изчислете цена онлайн и поръчайте шофьор веднага!',
  keywords: 'дринк и драйв бургас, drink and drive burgas, денонощен шофьор бургас, прибиране с кола бургас, пил съм бургас, drink drive burgas, шофьор под наем бургас, такси бургас',
  authors: [{ name: 'LuxeDrive Burgas' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://luxedrive-burgas.com/',
    title: 'LuxeDrive Бургас | Премиум Дринк енд Драйв Услуги 24/7',
    description: 'Безопасно и луксозно прибиране с Вашия собствен автомобил в град Бургас и региона. Изчислете цена онлайн и поръчайте за 15 минути.',
    images: [
      {
        url: '/hero_bg.jpg',
        width: 1200,
        height: 630,
        alt: 'LuxeDrive Бургас',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxeDrive Бургас | Премиум Дринк енд Драйв',
    description: 'Безопасно и луксозно прибиране с Вашия собствен автомобил в град Бургас и региона. Изчислете цена онлайн и поръчайте за 15 минути.',
    images: ['/hero_bg.jpg'],
  },
};

export default function RootLayout({ children }) {
  // LocalBusiness structured JSON-LD schema (Optimized for Bulgarian local search)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "LuxeDrive Бургас",
    "image": "https://luxedrive-burgas.com/hero_bg.jpg",
    "@id": "https://luxedrive-burgas.com/#service",
    "url": "https://luxedrive-burgas.com/",
    "telephone": "+359888888888",
    "priceRange": "BGN",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Морска градина",
      "addressLocality": "Бургас",
      "postalCode": "8000",
      "addressCountry": "BG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.5048,
      "longitude": 27.4626
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/luxedriveburgas",
      "https://www.instagram.com/luxedriveburgas"
    ],
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Бургас"
    }
  };

  return (
    <html lang="bg" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
