import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="pointer-events-none fixed inset-0 bg-aurora-glow" />
      <div className="pointer-events-none fixed inset-0 bg-orbital opacity-80" />
      <div className="pointer-events-none fixed inset-0 paper-fade" />
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-30 [mask-image:linear-gradient(to_bottom,white,transparent_82%)]" />
      <Navbar />
      <main className="relative flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
