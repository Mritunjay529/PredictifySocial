import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Brain, Lock, Zap, Globe, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - PulseAI" },
      {
        name: "description",
        content:
          "Learn how PulseAI predicts social media engagement using machine learning trained on millions of posts.",
      },
      { property: "og:title", content: "About PulseAI" },
      {
        property: "og:description",
        content: "The story and tech behind the engagement predictor.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: Brain,
    title: "ML-driven",
    desc: "Trained on 10M+ posts across major platforms with continuous learning.",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    desc: "Predictions delivered in under 2 seconds via edge infrastructure.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    desc: "We never store your links or personal data - predictions are stateless.",
  },
  {
    icon: Globe,
    title: "Multi-platform",
    desc: "Instagram, X, YouTube, TikTok, LinkedIn, Facebook - all supported.",
  },
];

function About() {
  return (
    <Layout>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Built for creators, brands, and teams
            </p>
            <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
              About <span className="text-gradient">PulseAI</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We help creators, marketers, and brands understand how content will perform before
              they hit publish. No guesswork, just data-driven predictions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12 grid gap-4 md:grid-cols-3"
          >
            {[
              { value: "10M+", label: "Posts modeled" },
              { value: "24/7", label: "Forecast availability" },
              { value: "3", label: "Core planning layers" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl glass p-6 text-center">
                <div className="font-display text-4xl text-foreground">{item.value}</div>
                <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 rounded-3xl glass p-8 md:p-12"
          >
            <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">Our mission</h2>
            <p className="leading-relaxed text-muted-foreground">
              Social media is noisy. Algorithms shift. Audiences are unpredictable. PulseAI cuts
              through the chaos with predictions that combine signal patterns, content semantics,
              and platform-specific trends, giving you confidence before every post.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                  <value.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Try the Predictor <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
