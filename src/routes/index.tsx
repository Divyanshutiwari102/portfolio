import { createFileRoute } from "@tanstack/react-router";

import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/sections/hero";
import SkillsSection from "@/components/sections/skills";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import { config } from "@/data/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: config.title },
      { name: "description", content: config.description.long },
      { property: "og:title", content: config.title },
      { property: "og:description", content: config.description.short },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: config.author,
          email: config.email,
          jobTitle: "Backend-focused Full Stack Developer",
          url: config.site,
          sameAs: [config.social.github, config.social.linkedin, config.social.leetcode],
        }),
      },
    ],
  }),
  component: MainPage,
});

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main className={cn("bg-slate-100 dark:bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
