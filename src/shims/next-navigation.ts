/** Minimal next/navigation shim for this single-page TanStack app. */
export function usePathname(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

export function useSearchParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export function useRouter() {
  return {
    push: (href: string) => {
      if (typeof window !== "undefined") window.location.href = href;
    },
    replace: (href: string) => {
      if (typeof window !== "undefined") window.location.replace(href);
    },
    back: () => {
      if (typeof window !== "undefined") window.history.back();
    },
    refresh: () => {
      if (typeof window !== "undefined") window.location.reload();
    },
    prefetch: () => {},
  };
}

export function useParams<T = Record<string, string>>(): T {
  return {} as T;
}
