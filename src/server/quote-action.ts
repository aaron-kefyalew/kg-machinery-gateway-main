import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendTelegramQuoteNotification } from "../lib/telegram";

const quoteSchema = z.object({
  equipment: z.string().min(1, "Equipment type is required"),
  location: z.string().min(1, "Location is required"),
  start: z.string().min(1, "Start date is required"),
  end: z.string().min(1, "End date is required"),
  phone: z.string().min(3, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  details: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .validator((data: unknown) => quoteSchema.parse(data))
  .handler(async ({ data }) => {
    const result = await sendTelegramQuoteNotification(data);
    if (!result.success) {
      throw new Error(result.error || "Failed to dispatch quote request");
    }
    return { success: true };
  });
