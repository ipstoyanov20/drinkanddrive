import './globals.css';

export const metadata = {
  title: 'Drink and drive Burgas | Денонощен Дринк енд Драйв / Drink and Drive Burgas 24/7',
  description: 'Премиум дринк енд драйв (drink and drive) услуги в Бургас, Поморие, Созопол, Несебър, Приморско, Царево, Средец, Руен и Сунгурларе 24/7. Изчислете цена онлайн!',
  keywords: 'drink and drive burgas, дринк енд драйв бургас, дринк анд драйв бургас, дринк и драйв бургас, drink drive burgas, денонощен шофьор бургас, прибиране с кола бургас, такси бургас, дринк енд драйв поморие, дринк енд драйв созопол, дринк енд драйв несебър, дринк енд драйв приморско, дринк енд драйв царево, drink and drive pomorie, sozopol, nesebar, primorsko, tsarevo, sredets, ruen, sungurlare',
  authors: [{ name: 'Drink and drive Burgas' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://drinkanddrive-burgas.com/',
    title: 'Drink and drive Burgas | Денонощен Дринк енд Драйв / Drink and Drive Burgas 24/7',
    description: 'Премиум дринк енд драйв (drink and drive) услуги в Бургас, Поморие, Созопол, Несебър, Приморско, Царево, Средец, Руен и Сунгурларе 24/7. Изчислете цена онлайн!',
    images: [
      {
        url: '/hero_bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Drink and drive Burgas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drink and drive Burgas | Денонощен Дринк енд Драйв / Drink and Drive Burgas',
    description: 'Премиум дринк енд драйв (drink and drive) услуги в Бургас, Поморие, Созопол, Несебър, Приморско, Царево, Средец, Руен и Сунгурларе 24/7. Изчислете цена онлайн!',
    images: ['/hero_bg.jpg'],
  },
};

export default function RootLayout({ children }) {
  // LocalBusiness structured JSON-LD schema (Optimized for Bulgarian local search)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Drink and drive Burgas",
    "image": "https://drinkanddrive-burgas.com/hero_bg.jpg",
    "@id": "https://drinkanddrive-burgas.com/#service",
    "url": "https://drinkanddrive-burgas.com/",
    "telephone": "+359886611719",
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
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Бургас" },
      { "@type": "AdministrativeArea", "name": "Поморие" },
      { "@type": "AdministrativeArea", "name": "Созопол" },
      { "@type": "AdministrativeArea", "name": "Несебър" },
      { "@type": "AdministrativeArea", "name": "Приморско" },
      { "@type": "AdministrativeArea", "name": "Царево" },
      { "@type": "AdministrativeArea", "name": "Средец" },
      { "@type": "AdministrativeArea", "name": "Руен" },
      { "@type": "AdministrativeArea", "name": "Сунгурларе" }
    ]
  };

  return (
    <html lang="bg" className="scroll-smooth">
      <head>
        {/* <link rel="icon" href="/favicon.ico" type="image/png" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
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
