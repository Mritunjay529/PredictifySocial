import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/analyze", label: "Analyze" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-border/60 bg-background/72 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-aurora shadow-glow transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Predictify<span className="text-gradient">Social</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-card hover:text-foreground hover:shadow-soft"
              activeProps={{ className: "bg-card text-foreground shadow-soft" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mx-2 h-6 w-px bg-border" />
          <ThemeToggle />
          <Link
            to="/analyze"
            className="ml-1 inline-flex items-center rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Try Now
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-foreground hover:bg-muted"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-col gap-2 border-t border-border bg-background/95 px-6 py-4 md:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/analyze"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Try Now
          </Link>
        </motion.nav>
      )}
    </motion.header>
  );
}
