import { useState, type FormEvent } from "react";
import { submitQuoteRequest } from "../../server/quote-action";

const equipment = [
  "Excavator",
  "Loader",
  "Dump Truck",
  "Lowbed Transport",
  "Roller",
  "Shower Truck",
  "Fuel Truck",
  "Grader",
  "Multiple / Not sure",
];

const fieldClass =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40 disabled:opacity-70";
const labelClass = "block text-sm font-semibold text-foreground";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      equipment: String(formData.get("equipment") || ""),
      location: String(formData.get("location") || ""),
      start: String(formData.get("start") || ""),
      end: String(formData.get("end") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      name: formData.get("name") ? String(formData.get("name")) : undefined,
      details: formData.get("details") ? String(formData.get("details")) : undefined,
    };

    try {
      await submitQuoteRequest({ data: payload });
      setSubmitted(true);
    } catch (err) {
      console.error("Quote submission error:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong while sending your request. Please try again or call us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function onReset() {
    setSubmitted(false);
    setErrorMessage(null);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-primary/40 bg-card p-8 text-center shadow-card">
        <h3 className="text-xl font-extrabold text-foreground">Request received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you. Our team will contact you within one business day with availability and
          pricing.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-border bg-card p-6 shadow-card sm:p-8"
    >
      {errorMessage && (
        <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className={labelClass} htmlFor="equipment">Equipment type</label>
          <select id="equipment" name="equipment" required disabled={isSubmitting} className={`${fieldClass} mt-2`} defaultValue="">
            <option value="" disabled>Select equipment</option>
            {equipment.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="location">Project location</label>
          <input id="location" name="location" required disabled={isSubmitting} placeholder="e.g. Bishoftu, Oromia" className={`${fieldClass} mt-2`} />
        </div>

        <div>
          <label className={labelClass} htmlFor="start">Rental start</label>
          <input id="start" name="start" type="date" required disabled={isSubmitting} className={`${fieldClass} mt-2`} />
        </div>

        <div>
          <label className={labelClass} htmlFor="end">Rental end</label>
          <input id="end" name="end" type="date" required disabled={isSubmitting} className={`${fieldClass} mt-2`} />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" type="tel" required disabled={isSubmitting} placeholder="+251 …" className={`${fieldClass} mt-2`} />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required disabled={isSubmitting} placeholder="you@example.com" className={`${fieldClass} mt-2`} />
        </div>

        {!compact && (
          <>
            <div>
              <label className={labelClass} htmlFor="name">Full name</label>
              <input id="name" name="name" required disabled={isSubmitting} className={`${fieldClass} mt-2`} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="details">Project details</label>
              <textarea id="details" name="details" rows={4} disabled={isSubmitting} className={`${fieldClass} mt-2`} placeholder="Scope of work, site access, operator needs…" />
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-md bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <span className="inline-block size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            <span>Sending request...</span>
          </>
        ) : (
          "Request Quote"
        )}
      </button>
    </form>
  );
}
