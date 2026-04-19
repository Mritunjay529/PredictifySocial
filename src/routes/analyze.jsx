import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Link2,
  Loader2,
  Sparkles,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Users,
  ArrowUpRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { Layout } from "@/components/Layout";
import { predictByLink } from "@/server/predict";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Analyze - PulseAI Engagement Predictor" },
      {
        name: "description",
        content:
          "Paste any social media post or profile link and get an instant engagement prediction.",
      },
      { property: "og:title", content: "Analyze a Link - PulseAI" },
      { property: "og:description", content: "Instant engagement predictions powered by AI." },
    ],
  }),
  component: Analyze,
});

const levelColors = {
  low: "var(--color-warning)",
  medium: "var(--color-cyan)",
  high: "var(--color-success)",
};

function formatNum(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

function Analyze() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const predict = useServerFn(predictByLink);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const response = await predict({ data: { link: link.trim() } });
      setResult(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message.includes("URL") ? "Please enter a valid URL." : message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Professional engagement forecasting
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              Analyze your <span className="text-gradient">link</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Paste a post or profile URL from any social platform.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl glass p-3 shadow-glow"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-input/90 px-5 py-4">
                <Link2 className="h-5 w-5 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                  placeholder="https://instagram.com/p/..."
                  maxLength={500}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground md:text-base"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !link.trim()}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Analyzing
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                    Predict
                  </>
                )}
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-5 grid gap-4 md:grid-cols-3"
          >
            {[
              { label: "Strategy review", value: "Hooks, CTA, and timing" },
              { label: "Platform signal", value: "Audience and channel mix" },
              { label: "Report output", value: "Charts and narrative summary" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/70 bg-card/50 px-5 py-4 shadow-soft"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  {item.label}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            ))}
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-10 grid gap-4 md:grid-cols-3"
              >
                {[0, 1, 2].map((index) => (
                  <div key={index} className="h-32 rounded-2xl glass p-6 animate-pulse" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>{result && !loading && <ResultCard result={result} />}</AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}

function ResultCard({ result }) {
  const color = levelColors[result.level];
  const metrics = [
    { icon: Heart, label: "Likes", value: result.metrics.likes },
    { icon: MessageCircle, label: "Comments", value: result.metrics.comments },
    { icon: Share2, label: "Shares", value: result.metrics.shares },
    { icon: Eye, label: "Views", value: result.metrics.views },
    { icon: Users, label: "Reach", value: result.metrics.reach },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 space-y-6"
    >
      <div className="relative overflow-hidden rounded-3xl glass p-8 md:p-10">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at 80% 20%, ${color}, transparent 60%)` }}
        />
        <div className="absolute right-6 top-6 h-28 w-28 rounded-full border border-border/50 bg-background/30 blur-2xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span className="capitalize">{result.platform}</span> | Prediction
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Engagement is{" "}
              <span style={{ color }} className="capitalize">
                {result.level}
              </span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our model analyzed audience signals, content patterns, and platform trends.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <ScoreRing score={result.score} color={color} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="rounded-2xl glass p-4"
          >
            <metric.icon className="mb-2 h-4 w-4 text-primary" />
            <div className="font-display text-2xl font-bold">{formatNum(metric.value)}</div>
            <div className="text-xs text-muted-foreground">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl glass p-6"
        >
          <h3 className="mb-4 flex items-center gap-2 font-display font-semibold">
            <TrendingUp className="h-4 w-4 text-primary" /> Engagement Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={result.breakdown}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.58 0.05 210)" />
                  <stop offset="100%" stopColor="oklch(0.35 0.04 55)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.82 0.015 75 / 0.65)" />
              <XAxis dataKey="name" stroke="oklch(0.5 0.018 62)" fontSize={12} />
              <YAxis stroke="oklch(0.5 0.018 62)" fontSize={12} tickFormatter={formatNum} />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.99 0.005 85)",
                  border: "1px solid oklch(0.84 0.015 72)",
                  borderRadius: "12px",
                  color: "oklch(0.24 0.02 65)",
                }}
              />
              <Bar dataKey="value" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl glass p-6"
        >
          <h3 className="mb-4 flex items-center gap-2 font-display font-semibold">
            <TrendingUp className="h-4 w-4 text-accent" /> 7-Day Trend
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={result.trend}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.58 0.05 210)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="oklch(0.58 0.05 210)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.82 0.015 75 / 0.65)" />
              <XAxis dataKey="day" stroke="oklch(0.5 0.018 62)" fontSize={12} />
              <YAxis stroke="oklch(0.5 0.018 62)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.99 0.005 85)",
                  border: "1px solid oklch(0.84 0.015 72)",
                  borderRadius: "12px",
                  color: "oklch(0.24 0.02 65)",
                }}
              />
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="oklch(0.35 0.04 55)"
                strokeWidth={2}
                fill="url(#areaGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl glass p-6"
      >
        <h3 className="mb-4 flex items-center gap-2 font-display font-semibold">
          <Sparkles className="h-4 w-4 text-primary" /> AI Insights
        </h3>
        <ul className="space-y-3">
          {result.insights.map((insight, index) => (
            <li key={index} className="flex gap-3 text-sm">
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-primary" />
              <span className="text-muted-foreground">{insight}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

function ScoreRing({ score, color }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-44 w-44">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="oklch(0.9 0.012 75)"
          strokeWidth="12"
          fill="none"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 12px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="font-display text-5xl font-bold"
        >
          {score}
        </motion.div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Score</div>
      </div>
    </div>
  );
}
