import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as RouteIcon, PackageCheck, FileCheck2, Clock } from "lucide-react";

import transportImg from "@/assets/transport.jpg";

import {
  getBreadcrumbSchema,
  getCanonicalUrl,
  getServiceSchema,
  shareImageUrl,
} from "@/lib/site-seo";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Land Transportation & Heavy Haulage in Ethiopia | Kefyalew Girma" },
      {
        name: "description",
        content:
          "Heavy haulage and land transportation across Ethiopia (የየብስ ትራንስፖርት): lowbed machinery moves, bulk aggregate hauling, oversize permits and reliable delivery.",
      },
      { property: "og:title", content: "Land Transportation & Heavy Haulage | Kefyalew Girma" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getCanonicalUrl("/transport") },
      { property: "og:image", content: shareImageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: shareImageUrl },
      {
        property: "og:description",
        content: "Lowbed machinery moves and bulk haulage across Ethiopia with permits and routing handled.",
      },
    ],
    links: [{ rel: "canonical", href: getCanonicalUrl("/transport") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Land Transportation", path: "/transport" },
          ]),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getServiceSchema({
            name: "Heavy Haulage & Lowbed Transport (የየብስ ትራንስፖርት)",
            description:
              "Permitted heavy plant transport, lowbed equipment haulage, and bulk material transport across Addis Ababa and regional Ethiopia.",
            path: "/transport",
          }),
        ),
      },
    ],
  }),
  component: TransportPage,
});

const services = [
  { icon: PackageCheck, title: "Machinery relocation", body: "Lowbed transport of excavators, loaders, rollers and plant between project sites." },
  { icon: RouteIcon, title: "Bulk material hauling", body: "Aggregate, sand, soil and spoil hauled at volume with planned truck cycles." },
  { icon: FileCheck2, title: "Permits & compliance", body: "Route surveys, oversize permits and escort coordination arranged for you." },
  { icon: Clock, title: "Scheduled dispatch", body: "Fixed delivery windows with progress updates from loading to offloading." },
];

function TransportPage() {
  return (
    <>
      <section className="relative isolate">
        <img
          src={transportImg}
          alt="Heavy haulage trucks for land transport and machinery relocation"
          width={1600}
          height={900}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-charcoal/70" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 py-28">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Land Transportation</p>
          <h1 className="mt-3 max-w-3xl text-4xl text-cream sm:text-5xl">
            Moving heavy loads across Ethiopia
          </h1>
          <p className="mt-4 max-w-2xl text-cream/80">
            From a single machine relocation to continuous aggregate haulage, our trucks and crews
            keep material and equipment flowing to site.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="rounded-lg border border-border bg-card p-7 shadow-card">
              <span className="grid size-12 place-items-center rounded-md bg-primary/20 text-forest">
                <s.icon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-extrabold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-lg bg-forest px-6 py-12 text-center text-forest-foreground sm:px-12">
          <h2 className="text-3xl">Planning a heavy move?</h2>
          <p className="mx-auto mt-3 max-w-xl text-forest-foreground/80">
            Share your load dimensions, origin and destination and we will return a transport plan
            with pricing.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-md bg-primary px-7 py-4 text-base font-bold text-primary-foreground hover:bg-primary/90"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
