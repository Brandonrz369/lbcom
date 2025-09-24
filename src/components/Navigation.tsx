"use client";

import { useEffect, useRef } from "react";
import UtilityBar from "./UtilityBar";
import MainNav from "./MainNav";

export default function Navigation() {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const headerElement = headerRef.current;
    if (!headerElement) return;

    const root = document.documentElement;

    const updateHeaderOffset = () => {
      const height = headerElement.offsetHeight;
      root.style.setProperty("--site-header-height", `${height}px`);
      root.style.scrollPaddingTop = `${height}px`;
    };

    const handleResize = () => {
      window.requestAnimationFrame(updateHeaderOffset);
    };

    updateHeaderOffset();

    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(headerElement);
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
      root.style.removeProperty("--site-header-height");
      root.style.scrollPaddingTop = "";
    };
  }, []);

  return (
    <header
      ref={headerRef}
      id="site-header"
      className="sticky top-0 z-50 bg-white/80 backdrop-blur"
    >
      <UtilityBar />
      <MainNav />
    </header>
  );
}

