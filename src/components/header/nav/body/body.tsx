import { motion } from "motion/react";
import Link from "@/shims/next-link";
import styles from "./style.module.scss";
import { blur, translate } from "../../anim";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";
import { useParams } from "@/shims/next-navigation";
import { useEffect, useState } from "react";
import FunnyThemeToggle from "@/components/theme/funny-theme-toggle";
import { useLenis } from "@/lib/lenis";

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: LinkType[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
}: BodyProps) {
  const params = useParams();
  const lenis = useLenis();
  const [currentHref, setCurrentHref] = useState("/");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname, hash } = window.location;
    setCurrentHref(pathname + hash);
  }, [params]);

  const getChars = (word: string) => {
    let chars: React.JSX.Element[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          className="pointer-events-none"
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div className={cn(styles.body, "flex flex-col items-end md:flex-row")}>
      <FunnyThemeToggle className="w-6 h-6 mr-6 flex md:hidden" />
      {links.map((link, index) => {
        const { title, href, target } = link;

        return (
          <Link
            key={`l_${index}`}
            href={href}
            target={target}
            className="cursor-can-hover rounded-lg"
            onClick={(e) => {
              if (target === "_blank") return;
              const hashIndex = href.indexOf("#");
              setIsActive(false);
              if (hashIndex === -1) {
                if (href === "/" && typeof window !== "undefined") {
                  e.preventDefault();
                  setCurrentHref("/");
                  window.history.replaceState(null, "", "/");
                  setTimeout(() => {
                    if (lenis) lenis.scrollTo(0);
                    else window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 400);
                }
                return;
              }
              const id = href.slice(hashIndex + 1);
              const el =
                typeof document !== "undefined"
                  ? document.getElementById(id)
                  : null;
              if (!el) return;
              e.preventDefault();
              setCurrentHref(href);
              window.history.replaceState(null, "", `#${id}`);
              // wait for the overlay close animation to release scroll lock
              setTimeout(() => {
                if (lenis) lenis.scrollTo(el, { offset: -80 });
                else el.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 400);
            }}
          >
            <motion.p
              className={cn(
                "font-display rounded-lg",
                currentHref !== href ? "text-muted-foreground" : "underline"
              )}
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
