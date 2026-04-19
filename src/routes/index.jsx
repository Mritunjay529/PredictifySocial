import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  BarChart3,
  Sparkles,
  TrendingUp,
  Target,
  Globe,
  ShieldCheck,
  ChartNoAxesCombined,
} from "lucide-react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PulseAI - Predict Social Media Engagement Instantly" },
      {
        name: "description",
        content:
          "Drop any social media link and get AI-powered engagement predictions, scores, and insights in seconds.",
      },
      { property: "og:title", content: "PulseAI - Predict Social Media Engagement" },
      {
        property: "og:description",
        content: "AI-powered engagement predictions for Instagram, X, YouTube and more.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: Zap,
    title: "Instant Predictions",
    desc: "Get engagement scores in under 2 seconds - paste, click, done.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    desc: "Beautiful charts breaking down likes, shares, and reach trends.",
  },
  {
    icon: Target,
    title: "Actionable Insights",
    desc: "AI-generated tips tailored to your content and platform.",
  },
  {
    icon: Globe,
    title: "Multi-Platform",
    desc: "Works with Instagram, X, YouTube, TikTok, LinkedIn, and more.",
  },
];

const stats = [
  { value: "2.4M+", label: "Posts Analyzed" },
  { value: "94%", label: "Prediction Accuracy" },
  { value: "<2s", label: "Average Response" },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Confident Planning",
    desc: "Publish with clearer expectations before your campaign goes live.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Executive Signals",
    desc: "Translate noisy platform activity into metrics teams can act on fast.",
  },
  {
    icon: Sparkles,
    title: "Creative Guidance",
    desc: "Pair prediction scores with practical prompts to improve post performance.",
  },
];

function Home() {
  return (
    <Layout>
      <section className="relative overflow-hidden px-6 pt-16 pb-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI-powered | Trained on 10M+ posts
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl lg:text-8xl"
            >
              Predict your post&apos;s
              <br />
              <span className="text-gradient">engagement</span> before you publish.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl lg:mx-0"
            >
              Paste any social media link and get instant AI predictions on likes, comments, shares,
              and overall engagement score.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Link
                to="/analyze"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 animate-pulse-glow"
              >
                Start Analyzing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-8 py-4 text-base font-semibold transition-colors hover:bg-card"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-6">
                  <div className="font-display text-3xl font-bold text-gradient md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-aurora opacity-70 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] glass p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Live forecasting panel
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-foreground">Campaign outlook</h3>
                </div>
                <div className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                  Updated in real time
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-border/70 bg-background/65 p-5">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Projected engagement score</span>
                    <span>High confidence</span>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="font-display text-6xl text-foreground">82</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Above category benchmark
                      </div>
                    </div>
                    <div className="h-24 w-24 rounded-full border border-border/80 bg-gradient-primary p-[10px] shadow-glow">
                      <div className="flex h-full items-center justify-center rounded-full bg-background/90 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        Growth
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {pillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.45 + index * 0.08 }}
                      className="rounded-2xl border border-border/70 bg-background/55 p-5"
                    >
                      <pillar.icon className="h-5 w-5 text-primary" />
                      <h4 className="mt-3 font-semibold text-foreground">{pillar.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{pillar.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Built for <span className="text-gradient">creators</span> who win.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Everything you need to understand and predict content performance.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary transition-transform group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl glass p-12 text-center md:p-16"
        >
          <div className="absolute inset-0 bg-gradient-aurora opacity-50" />
          <div className="absolute -right-12 top-8 h-40 w-40 rounded-full border border-white/20 bg-white/10 blur-2xl dark:bg-white/5" />
          <div className="relative">
            <TrendingUp className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              Ready to predict your next viral post?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Free to try. No signup required. Get instant insights now.
            </p>
            <Link
              to="/analyze"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Analyze a Link <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
