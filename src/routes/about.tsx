import { createFileRoute, Link } from "@tanstack/react-router";

import teamImg from "@/assets/about-yard.jpg";
import { getBreadcrumbSchema, getCanonicalUrl, shareImageUrl } from "@/lib/site-seo";
const teamImage = teamImg;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Kefyalew Girma Machinery Rental & Land Transport" },
      {
        name: "description",
        content:
          "Based in Addis Ababa, Kefyalew Girma supplies heavy construction equipment and land transport to contractors, quarries and infrastructure projects across Ethiopia.",
      },
      { property: "og:title", content: "About Kefyalew Girma Machinery Rental & Land Transport" },
      {
        property: "og:description",
        content: "An Ethiopian machinery rental and heavy haulage company built on reliability and practical support.",
      },
      { property: "og:image", content: shareImageUrl },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getCanonicalUrl("/about") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: shareImageUrl },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/about") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ]),
        ),
      },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { value: "10+", label: "Years on Ethiopian sites" },
  { value: "40+", label: "Machines & trucks dispatched" },
  { value: "24/7", label: "Site support line" },
];

function AboutPage() {
  return (
    <div className="relative">
      {/* Full-bleed background photo with dark overlay for readability */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src={teamImage}
          alt="Develon excavator and equipment at the Kefyalew Girma machinery rental yard"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-gold">About Us</p>
          <h1 className="mt-3 text-4xl sm:text-5xl text-cream">Built for the work Ethiopia is doing</h1>
          <p className="mt-5 text-cream/80">
            Kefyalew Girma Machinery Rental & Land Transport is an Ethiopian company supplying
            heavy construction equipment and land transportation to contractors, quarries, real
            estate developers and infrastructure projects.
          </p>
          <p className="mt-4 text-cream/80">
            We operate from Addis Ababa and mobilise nationwide. Our approach is practical: keep the
            machines serviced, keep the crews skilled, and keep clients informed from the first quote
            to the final offload.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-md bg-primary px-6 py-4 text-base font-bold text-primary-foreground hover:bg-primary/90"
          >
            Work with us
          </Link>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg bg-card/90 p-8 text-center shadow-card backdrop-blur-sm"
            >
              <p className="text-4xl font-extrabold text-gold">{s.value}</p>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
