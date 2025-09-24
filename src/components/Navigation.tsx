"use client";

import { useEffect, useRef } from "react";
import UtilityBar from "./UtilityBar";
import MainNav from "./MainNav";

const isBrowser = typeof window !== "undefined";

export default function Navigation() {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isBrowser) return;

    const headerEl = headerRef.current;
    if (!headerEl) return;

    const root = document.documentElement;
    const body = document.body;

    const updateHeaderMeasurements = () => {
      const height = headerEl.offsetHeight;
      const clampedHeight = Math.max(0, Math.round(height));

      root.style.setProperty("--site-header-height", `${clampedHeight}px`);
      root.style.setProperty(
        "--site-header-scroll-offset",
        `${clampedHeight + 16}px`,
      );
      body.style.scrollPaddingTop = `${clampedHeight + 16}px`;
    };

    updateHeaderMeasurements();

    let resizeObserver: ResizeObserver | undefined;

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => {
        updateHeaderMeasurements();
      });
      resizeObserver.observe(headerEl);
    }

    window.addEventListener("resize", updateHeaderMeasurements);

    return () => {
      window.removeEventListener("resize", updateHeaderMeasurements);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      root.style.removeProperty("--site-header-height");
      root.style.removeProperty("--site-header-scroll-offset");
      body.style.removeProperty("scroll-padding-top");
    };
  }, []);

  return (
    <header
      ref={headerRef}
      id="site-header"
      className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <UtilityBar />
      <MainNav />
    </header>
  );
}

