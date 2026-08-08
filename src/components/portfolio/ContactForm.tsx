import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";

const INBOX = "divyanshutiwari337@gmail.com";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in every field.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Portfolio enquiry from ${name}`,
          name,
          email,
          message,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      toast.success("Message sent — it's in my inbox. I'll reply soon!");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      toast.message("Opening your mail app instead…");
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur sm:p-6"
    >
      <p className="font-display text-lg font-bold">Send a message</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Straight to my inbox — usually a reply within a day.
      </p>


      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className="rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-highlight/60 focus-visible:ring-2 focus-visible:ring-highlight/25"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your email"
          aria-label="Your email"
          className="rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-highlight/60 focus-visible:ring-2 focus-visible:ring-highlight/25"
        />
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        placeholder="What are we building?"
        aria-label="Message"
        className="mt-3 w-full resize-none rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-highlight/60 focus-visible:ring-2 focus-visible:ring-highlight/25"
      />
      <button
        type="submit"
        disabled={sending}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send message"}
        {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
      </button>

    </form>
  );
}
