import { PropsWithChildren } from "react";
import { useAppContext } from "../context/AppContext";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export function Layout({ children }: PropsWithChildren) {
  const { state } = useAppContext();
  const accessibilityClasses = [
    state.accessibility.highContrast ? "contrast-125 saturate-125" : "",
    state.accessibility.fontScale === "large" ? "text-[17px]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`min-h-screen bg-aura ${accessibilityClasses}`}>
      <NavBar />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-mesh opacity-80" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-cyan-400/8 to-transparent" />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">{children}</main>
      <Footer />
    </div>
  );
}
