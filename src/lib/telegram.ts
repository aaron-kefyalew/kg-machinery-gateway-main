export interface QuoteNotificationPayload {
  equipment: string;
  location: string;
  start: string;
  end: string;
  phone: string;
  email: string;
  name?: string;
  details?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramQuoteNotification(payload: QuoteNotificationPayload): Promise<{
  success: boolean;
  simulated?: boolean;
  error?: string;
}> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const displayName = payload.name?.trim() || "Not specified (Quick Quote)";
  const details = payload.details?.trim() || "None provided";

  const message = [
    `🚜 <b>New Machinery Quote Request</b>`,
    ``,
    `👤 <b>Name:</b> ${escapeHtml(displayName)}`,
    `📞 <b>Phone:</b> ${escapeHtml(payload.phone)}`,
    `✉️ <b>Email:</b> ${escapeHtml(payload.email)}`,
    `📍 <b>Location:</b> ${escapeHtml(payload.location)}`,
    `🏗️ <b>Equipment:</b> ${escapeHtml(payload.equipment)}`,
    `📅 <b>Dates:</b> ${escapeHtml(payload.start)} to ${escapeHtml(payload.end)}`,
    ``,
    `📝 <b>Project Details:</b>`,
    `${escapeHtml(details)}`,
    ``,
    `⏱️ <i>Received at: ${new Date().toISOString()}</i>`,
  ].join("\n");

  if (!token || !chatId) {
    console.warn(
      "[Telegram Notification: Simulated Mode]\n" +
        "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment variables.\n" +
        "Quote payload received:\n" +
        message,
    );
    return { success: true, simulated: true };
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const data = (await response.json()) as { ok: boolean; description?: string };
    if (!data.ok) {
      console.error("[Telegram Error]", data.description);
      let errorMsg = data.description || "Telegram API rejected message";
      if (data.description?.toLowerCase().includes("chat not found")) {
        errorMsg =
          "Telegram chat not found: please open your bot on Telegram (@tgprojecttesterbot) and click START or send /start so the bot has permission to message you.";
      }
      return { success: false, error: errorMsg };
    }

    return { success: true };
  } catch (err) {
    console.error("[Telegram Network Error]", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to contact Telegram API",
    };
  }
}
