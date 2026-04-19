import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  link: z.string().trim().min(5).max(500).url({ message: "Please provide a valid URL" }),
});

export type Platform =
  | "instagram"
  | "twitter"
  | "youtube"
  | "tiktok"
  | "facebook"
  | "linkedin"
  | "unknown";

export interface PredictionResult {
  platform: Platform;
  level: "low" | "medium" | "high";
  score: number;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    reach: number;
  };
  breakdown: { name: string; value: number }[];
  trend: { day: string; engagement: number }[];
  insights: string[];
}

function detectPlatform(url: string): Platform {
  const u = url.toLowerCase();
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("twitter.com") || u.includes("x.com")) return "twitter";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("tiktok.com")) return "tiktok";
  if (u.includes("facebook.com") || u.includes("fb.com")) return "facebook";
  if (u.includes("linkedin.com")) return "linkedin";
  return "unknown";
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function rand(seed: number, min: number, max: number): number {
  const x = Math.sin(seed) * 10000;
  const r = x - Math.floor(x);
  return Math.floor(min + r * (max - min));
}

export const predictByLink = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<PredictionResult> => {
    await new Promise((r) => setTimeout(r, 1200));

    const platform = detectPlatform(data.link);
    const seed = hash(data.link);

    const baseMultiplier = platform === "youtube" ? 8 : platform === "tiktok" ? 6 : 1;
    const likes = rand(seed + 1, 200, 25000) * baseMultiplier;
    const comments = rand(seed + 2, 20, 1800);
    const shares = rand(seed + 3, 10, 1200);
    const views = likes * rand(seed + 4, 8, 30);
    const reach = views + rand(seed + 5, 5000, 80000);

    const score = Math.min(
      100,
      Math.round(((likes * 1 + comments * 3 + shares * 5) / reach) * 100 * 4),
    );

    const level: PredictionResult["level"] = score >= 65 ? "high" : score >= 35 ? "medium" : "low";

    const breakdown = [
      { name: "Likes", value: likes },
      { name: "Comments", value: comments },
      { name: "Shares", value: shares },
    ];

    const trend = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({
      day: d,
      engagement: rand(seed + 10 + i, 20, 100),
    }));

    const insights: string[] = [];
    if (score >= 65) {
      insights.push("Outstanding performance - content resonates strongly with your audience.");
      insights.push("Best posting window detected: 6-9 PM local time.");
    } else if (score >= 35) {
      insights.push("Solid engagement, with room to grow through better hooks.");
      insights.push("Consider adding a clear CTA in the first 3 seconds.");
    } else {
      insights.push("Engagement is below benchmark - try a stronger visual hook.");
      insights.push("Captions under 125 characters tend to perform 22% better.");
    }
    insights.push(`Detected platform: ${platform === "unknown" ? "Generic" : platform}.`);

    return {
      platform,
      level,
      score,
      metrics: { likes, comments, shares, views, reach },
      breakdown,
      trend,
      insights,
    };
  });
