import { Download } from "lucide-react";
import resume from "@/assets/resume.pdf.asset.json";

export function ResumeButton({
  className = "",
  label = "Resume",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={resume.url}
      download="Divyanshu_Tiwari_Resume.pdf"
      aria-label="Download Divyanshu Tiwari's resume (PDF)"
      className={`group inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary ${className}`}
    >
      <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      {label}
    </a>
  );
}
