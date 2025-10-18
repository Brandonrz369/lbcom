"use client";

import UtilityBar from "./UtilityBar";
import MainNav from "./MainNav";

export default function Navigation() {
  return (
    <header id="site-header" className="sticky top-0 z-50 bg-white/80 backdrpop-blur">
      <UtilityBar />
      <MainNav />
    </header>
  );
}
