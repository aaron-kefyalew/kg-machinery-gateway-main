import shareImage from "@/assets/home-share.jpg";

// Determine canonical public origin. When deployed on Koyeb / Render or custom domain,
// set VITE_PUBLIC_ORIGIN (e.g. https://kefyalewgirma.com or https://kg-machinery.koyeb.app).
export const DEFAULT_SITE_URL = "https://kefyalewgirma.com";
export const publicOrigin =
  import.meta.env["VITE_PUBLIC_ORIGIN"]?.replace(/\/$/, "") || DEFAULT_SITE_URL;

export function getCanonicalUrl(path = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${publicOrigin}${cleanPath === "/" ? "" : cleanPath}`;
}

export const shareImageUrl = publicOrigin ? `${publicOrigin}${shareImage}` : shareImage;

export const homeTitle = "Machinery Rental & Land Transport in Addis Ababa | Kefyalew Girma";
export const homeDescription =
  "Reliable heavy machinery rental and land transport in Addis Ababa, Ethiopia. Hire excavators, wheel loaders, dump trucks and lowbeds with certified operators. Request a free quote.";

export const localBusiness = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "GeneralContractor"],
  "@id": `${getCanonicalUrl("/")}/#organization`,
  name: "Kefyalew Girma Machinery Rental & Land Transport",
  alternateName: [
    "KG Machinery",
    "ከፍያለው ግርማ ማሽነሪ ኪራይ እና የየብስ ትራንስፖርት",
  ],
  description: homeDescription,
  url: getCanonicalUrl("/"),
  telephone: "+251993936962",
  email: "info@kefyalewgirma.com",
  priceRange: "$$",
  image: shareImageUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Addis Ababa",
    addressRegion: "Addis Ababa",
    addressCountry: "ET",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 9.032,
    longitude: 38.742,
  },
  areaServed: [
    { "@type": "City", name: "Addis Ababa" },
    { "@type": "Country", name: "Ethiopia" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Heavy Equipment Rental & Transportation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Excavator Rental (ኤክስካቫተር ኪራይ)",
          description:
            "Heavy crawler and wheel excavator hire for earthmoving, trenching and quarry works in Ethiopia.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wheel Loader Rental (ሎደር ኪራይ)",
          description:
            "High-capacity wheel loaders for material handling, aggregate loading and site clearing.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dump Truck Rental (ዳምፕ ትራክ / ሲኖትራክ ኪራይ)",
          description:
            "Heavy-duty tipper dump trucks for hauling bulk aggregate, rock, and earthwork materials.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lowbed Land Transportation (ሎቤድ የየብስ ትራንስፖርት)",
          description:
            "Permitted heavy haulage and lowbed transportation for heavy plant and machinery across Ethiopia.",
        },
      },
    ],
  },
};

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

export function getServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: "Kefyalew Girma Machinery Rental & Land Transport",
      telephone: "+251993936962",
      url: getCanonicalUrl("/"),
    },
    areaServed: {
      "@type": "Country",
      name: "Ethiopia",
    },
    url: getCanonicalUrl(path),
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
