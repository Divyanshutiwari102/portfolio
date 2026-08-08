import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const bodySchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(2000),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;"
  );

export const Route = createFileRoute("/api/send")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ error: "Invalid JSON body" }, 400);
        }

        const parsed = bodySchema.safeParse(payload);
        if (!parsed.success) {
          return json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, 400);
        }
        const { fullName, email, message } = parsed.data;

        const apiKey = process.env["RESEND_API_KEY"];
        const to = process.env["CONTACT_EMAIL"] ?? "divyanshutiwari337@gmail.com";

        // No mail provider configured yet — tell the client so it can fall back
        // to opening the visitor's mail app instead of showing a hard error.
        if (!apiKey) {
          return json({ error: "Email service not configured", fallback: "mailto" }, 503);
        }

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env["CONTACT_FROM"] ?? "Portfolio <onboarding@resend.dev>",
            to: [to],
            reply_to: email,
            subject: `Portfolio contact — ${fullName}`,
            html: `<p><strong>From:</strong> ${escapeHtml(fullName)} (${escapeHtml(email)})</p><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
          }),
        });

        if (!res.ok) {
          const detail = await res.text();
          console.error("Resend error", res.status, detail);
          return json({ error: "Could not send the message right now" }, 502);
        }

        return json({ ok: true });
      },
    },
  },
});
