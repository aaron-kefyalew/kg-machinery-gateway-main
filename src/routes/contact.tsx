import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import heroImg from "@/assets/hero-site.jpg";
import { QuoteForm } from "@/components/site/QuoteForm";
import {
  getBreadcrumbSchema,
  getCanonicalUrl,
  shareImageUrl,
} from "@/lib/site-seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Request a Quote | Kefyalew Girma, Addis Ababa" },
      {
        name: "description",
        content:
          "Request a machinery rental or land transport quote in Ethiopia. Call +251 993 936 962 or send project requirements for rapid quotation within one business day.",
      },
      { property: "og:title", content: "Contact & Request a Quote | Kefyalew Girma" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getCanonicalUrl("/contact") },
      { property: "og:image", content: shareImageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: shareImageUrl },
      {
        property: "og:description",
        content: "Tell us your equipment, location and dates — our Addis Ababa team responds within one business day.",
      },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/contact") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact & Quote", path: "/contact" },
          ]),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Kefyalew Girma Machinery Rental & Land Transport",
          url: getCanonicalUrl("/contact"),
          mainEntity: {
            "@type": "LocalBusiness",
            name: "Kefyalew Girma Machinery Rental & Land Transport",
            telephone: "+251993936962",
            email: "info@kefyalewgirma.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Addis Ababa",
              addressCountry: "ET",
            },
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

const details = [
  { icon: MapPin, label: "Office", value: "Addis Ababa, Ethiopia" },
  { icon: Phone, label: "Phone", value: "+251 993 936 962", href: "tel:+251993936962" },
  { icon: Mail, label: "Email", value: "info@kefyalewgirma.com", href: "mailto:info@kefyalewgirma.com" },
  { icon: Clock, label: "Hours", value: "Mon – Sat, 2:00 AM – 11:00 AM (EAT)" },
];

function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-charcoal/70" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-20">
      <p className="text-sm font-bold uppercase tracking-widest text-primary">Contact</p>
      <h1 className="mt-3 max-w-2xl text-4xl text-cream sm:text-5xl">Request a quote</h1>
      <p className="mt-4 max-w-2xl text-cream/80">
        Send us your equipment needs, project location and rental dates. Our team will confirm
        availability and pricing within one business day.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <QuoteForm />

        <aside className="space-y-4">
          {details.map((d) => (
            <div key={d.label} className="rounded-lg border border-border bg-card p-5 shadow-card">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <d.icon className="size-4 text-forest" aria-hidden="true" />
                {d.label}
              </span>
              {d.href ? (
                <a href={d.href} className="mt-2 block font-semibold hover:text-forest">
                  {d.value}
                </a>
              ) : (
                <p className="mt-2 font-semibold">{d.value}</p>
              )}
            </div>
          ))}
        </aside>
      </div>
      </div>
    </section>
  );
}
