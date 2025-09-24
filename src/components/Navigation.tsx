"use client";

import UtilityBar from "./UtilityBar";
import MainNav from "./MainNav";

export default function Navigation() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <UtilityBar />
      <MainNav />
    </header>
  );
}

