import { ArrowRight, MapPin } from "lucide-react";
import { SocialDock } from "./SocialDock";
import heroKeypad from "@/assets/hero-keypad.jpg";
import { profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="eyebrow">{profile.location}</span>
          </div>

          <p className="mt-8 text-base text-muted-foreground">Hi, I am</p>
          <h1 className="mt-2 font-display text-[clamp(2.75rem,10vw,6.5rem)] leading-[0.92] font-bold">
            {profile.first}
            <br />
            {profile.last}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {profile.role}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground/80">
            {profile.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              See my work <ArrowRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Get in touch
            </a>
          </div>

          <SocialDock />
        </div>

        <div className="relative [perspective:1200px]">
          <div
            aria-hidden
            className="absolute inset-8 rounded-full blur-3xl"
            style={{ boxShadow: "var(--shadow-glow)" }}
          />
          <img
            src={heroKeypad}
            alt="3D render of a mechanical keypad with keycaps showing Java, Spring, Docker, React, PostgreSQL, Redis, Python, TypeScript, Next.js, AWS, Git and Linux logos"
            width={1280}
            height={1280}
            style={{
              maskImage:
                "radial-gradient(closest-side, #000 60%, transparent 92%)",
              WebkitMaskImage:
                "radial-gradient(closest-side, #000 60%, transparent 92%)",
            }}
            className="keypad-orbit relative mx-auto w-full max-w-lg select-none"
          />
        </div>

      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="eyebrow">scroll</span>
        <span className="grid h-9 w-6 place-items-start rounded-full border border-border pt-1.5">
          <span className="scroll-hint mx-auto block h-1.5 w-1 rounded-full bg-highlight" />
        </span>
      </a>
    </section>
  );
}
