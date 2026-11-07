import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Wrench, CalendarClock, Truck, ArrowRight } from "lucide-react";

import homeBg from "@/assets/home-background.webp";
import {
  homeTitle,
  homeDescription,
  localBusiness,
  shareImageUrl,
  getCanonicalUrl,
  getFaqSchema,
} from "@/lib/site-seo";
import { HeroMarquee } from "@/components/site/HeroMarquee";
import { QuoteForm } from "@/components/site/QuoteForm";
import { fleet } from "@/components/site/fleet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: homeTitle },
      {
        name: "description",
        content: homeDescription,
      },
      { property: "og:title", content: homeTitle },
      {
        property: "og:description",
        content: homeDescription,
      },
      { property: "og:image", content: shareImageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Develon excavator in the Kefyalew Girma machinery yard" },
      { property: "og:url", content: getCanonicalUrl("/") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: shareImageUrl },
    ],
    links: [
      { rel: "canonical", href: getCanonicalUrl("/") },
      { rel: "preload", as: "image", href: homeBg, fetchPriority: "high" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusiness) },
      { type: "application/ld+json", children: JSON.stringify(getFaqSchema(faqs)) },
    ],
  }),
  component: Home,
});

const faqs = [
  {
    question: "How does heavy machinery rental work in Addis Ababa and across Ethiopia?",
    answer:
      "We provide short-term and long-term heavy equipment rental (ማሽነሪ ኪራይ) for construction, roadwork, quarrying, and civil infrastructure throughout Ethiopia. You can hire equipment on a daily, monthly, or project basis, with or without experienced operators and on-site maintenance support.",
  },
  {
    question: "What types of construction equipment are available for hire in your fleet?",
    answer:
      "Our fleet includes crawler excavators (ኤክስካቫተር), wheel loaders (ሎደር), heavy-duty dump trucks (ዳምፕ ትራክ / ሲኖትራክ), rollers, and multi-axle lowbed transport trailers. All machines are serviced on scheduled hours to guarantee optimal uptime.",
  },
  {
    question: "Do equipment rental agreements include certified operators?",
    answer:
      "Yes. We offer fully operated rentals with skilled, safety-certified operators and dedicated field mechanics, as well as bare rental agreements depending on your project requirements.",
  },
  {
    question: "Can you transport rented or client-owned heavy machinery to project sites in Ethiopia?",
    answer:
      "Yes. Our land transportation division operates heavy lowbed transport trailers with full route planning, permits, and escorts to mobilize heavy equipment anywhere in Ethiopia, including Addis Ababa, Oromia, Amhara, Somali, Afar, and regional development corridors.",
  },
  {
    question: "How can I request a quote and what information is required?",
    answer:
      "You can submit our quick quote form online with your equipment type, project location, and start/end dates, or call us directly at +251 993 936 962. We confirm availability and competitive pricing within one business day.",
  },
];

const benefits = [
  { icon: ShieldCheck, title: "Reliable equipment", body: "Well-maintained machines serviced on schedule to keep your programme on track." },
  { icon: Wrench, title: "Professional support", body: "Experienced operators, mechanics and site coordinators backing every hire." },
  { icon: CalendarClock, title: "Flexible rental", body: "Daily, weekly, monthly or project-based terms with or without an operator." },
  { icon: Truck, title: "Dependable transport", body: "Lowbed and tipper haulage with permits, routing and on-time delivery." },
];

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Single full-bleed background photo with dark overlay for readability */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <img
          src={homeBg}
          alt="Develon excavator in the machinery rental yard in Addis Ababa"
          width={1079}
          height={1920}
          fetchPriority="high"
          className="size-full object-cover"
        />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-charcoal/75" aria-hidden="true" />

      {/* Hero */}
      <section className="relative flex min-h-[88vh] flex-col">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pb-16 pt-32 text-center">
          <HeroMarquee />
          <h1 className="mt-8 max-w-3xl text-3xl text-cream sm:text-4xl lg:text-5xl">
            Reliable Machinery Rental &amp; Land Transport in Addis Ababa
          </h1>
          <p className="mt-7 max-w-2xl text-base font-medium text-cream/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-lg">
            Kefyalew Girma provides Machinery Rental &amp; Land Transport from Addis Ababa
            to sites across Ethiopia — well-maintained equipment, experienced crews,
            and dependable delivery you can trust.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-md bg-primary px-7 py-4 text-base font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Request a Quote
            </Link>
            <a
              href="tel:+251993936962"
              className="rounded-md border border-cream/40 px-7 py-4 text-base font-bold text-cream transition-colors hover:bg-cream/10"
            >
              Call +251 993 936 962
            </a>
          </div>
        </div>
      </section>

      {/* Quick quote */}
      <section className="relative z-10 -mt-14">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="rounded-lg bg-forest px-6 py-6 text-forest-foreground shadow-lift sm:px-8">
            <h2 className="text-xl font-extrabold">Get a quick quote</h2>
            <p className="mt-1 text-sm text-forest-foreground/75">
              Tell us what you need and when — we respond within one business day.
            </p>
          </div>
          <div className="mt-4">
            <QuoteForm compact />
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-gold">Our Fleet</p>
              <h2 className="mt-2 text-3xl text-cream sm:text-4xl">Our Machinery Rental Fleet</h2>
            </div>
            <Link to="/fleet" className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:gap-3">
              View full fleet <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fleet.map((item) => (
              <Link
                key={item.slug}
                to="/fleet"
                className="group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    width={item.width}
                    height={item.height}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-3xl text-cream sm:text-4xl">Land Transport Solutions</h2>
          <p className="mt-4 max-w-2xl text-cream/90">
            Move machinery between sites with lowbed transport, or arrange dump trucks
            for aggregate, sand and soil. Our Addis Ababa team coordinates loads,
            route planning and deliveries across Ethiopia.
          </p>
          <Link to="/transport" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold">
            Explore land transport <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <p className="text-sm font-bold uppercase tracking-widest text-gold">Why choose us</p>
          <h2 className="mt-2 max-w-2xl text-3xl text-cream sm:text-4xl">
            Strong equipment, steady people, on-time delivery
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-lg bg-card/95 p-6 shadow-card backdrop-blur-sm">
                <span className="grid size-12 place-items-center rounded-md bg-primary/20 text-forest">
                  <b.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="relative z-10 border-t border-cream/10 bg-background/95 py-24 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Frequently Asked Questions (ተደጋግመው የሚጠየቁ ጥያቄዎች)
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
              Heavy Equipment Hire & Land Haulage in Ethiopia
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              Essential details regarding machinery availability, certified operators, delivery terms, and rates in Addis Ababa and surrounding regions.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-colors open:border-primary/50 open:bg-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-foreground">
                  <span className="text-lg pr-4">{faq.question}</span>
                  <span className="text-primary transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl text-3xl text-cream sm:text-4xl">
            Need machinery for your next project?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-md bg-primary px-7 py-4 text-base font-bold text-primary-foreground hover:bg-primary/90"
            >
              Request a Quote
            </Link>
            <a
              href="tel:+251993936962"
              className="rounded-md border border-cream/30 px-7 py-4 text-base font-bold text-cream hover:bg-cream/10"
            >
              Call +251 993 936 962
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
