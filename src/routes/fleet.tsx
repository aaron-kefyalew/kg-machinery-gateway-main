import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { fleet } from "@/components/site/fleet";
import {
  getCanonicalUrl,
  getBreadcrumbSchema,
  getServiceSchema,
  shareImageUrl,
} from "@/lib/site-seo";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Heavy Machinery Rental Fleet | Excavators, Loaders & Trucks in Addis Ababa" },
      {
        name: "description",
        content:
          "Rent high-performance crawler excavators, wheel loaders, dump trucks and lowbeds in Ethiopia. Verified machinery with certified operators and on-site servicing.",
      },
      { property: "og:title", content: "Heavy Machinery Fleet | Kefyalew Girma Machinery Rental" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getCanonicalUrl("/fleet") },
      { property: "og:image", content: shareImageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: shareImageUrl },
      {
        property: "og:description",
        content:
          "Excavators, wheel loaders, dump trucks and lowbed transport for hire across Addis Ababa and Ethiopia.",
      },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/fleet") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Fleet", path: "/fleet" },
          ]),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getServiceSchema({
            name: "Heavy Construction Machinery Hire (የኮንስትራክሽን ማሽነሪ ኪራይ)",
            description:
              "Crawler excavators, wheel loaders, dump trucks, rollers and heavy machinery for rent with trained operators across Ethiopia.",
            path: "/fleet",
          }),
        ),
      },
    ],
  }),
  component: FleetPage,
});

function FleetPage() {
  return (
    <>
      <section className="bg-forest">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Our Fleet</p>
          <h1 className="mt-3 max-w-3xl text-4xl text-forest-foreground sm:text-5xl">
            Heavy equipment ready for hire
          </h1>
          <p className="mt-4 max-w-2xl text-base text-forest-foreground/80">
            Every machine is inspected, serviced and dispatched with the support you need to keep
            production moving.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-14 px-4 py-20">
        {fleet.map((item, i) => (
          <article
            key={item.slug}
            id={item.slug}
            className="grid items-center gap-8 md:grid-cols-2"
          >
            <div className={`overflow-hidden rounded-lg shadow-card ${i % 2 ? "md:order-2" : ""}`}>
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                width={item.width}
                height={item.height}
                className="aspect-4/3 size-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl">{item.title}</h2>
              <p className="mt-3 text-muted-foreground">{item.summary}</p>
              <ul className="mt-6 space-y-3">
                {item.specs.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm font-medium">
                    <Check className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-8 inline-flex rounded-md bg-primary px-6 py-4 text-base font-bold text-primary-foreground hover:bg-primary/90"
              >
                Request a Quote
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
