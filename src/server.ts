import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { renderErrorPage } from "./lib/error-page";

export default createServerEntry({
  async fetch(request, opts) {
    try {
      return await handler.fetch(request, opts);
    } catch (error) {
      console.error("Server fetch error:", error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
});

