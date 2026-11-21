import { describe, expect, it } from "vitest";
import { recommendRelatedVideos } from "./videoRecommendation";

const catalog = [
  { performanceId: "hadroh", slug: "hadroh", title: "PG 6101 HADROH", performanceName: "Hadroh", collectionId: "aurora", collectionName: "Aurora Vanguard", category: "Seni Musik", description: "lantunan musik religi dan irama" },
  { performanceId: "choir", slug: "choir", title: "PG 6101 CHOIR", performanceName: "Choir 6101", collectionId: "nusantara", collectionName: "Nusantara Legacy", category: "Seni Musik", description: "harmoni suara musik bersama" },
  { performanceId: "kabaret", slug: "kabaret", title: "PG 6101 KABARET", performanceName: "Kabaret 1", collectionId: "aurora", collectionName: "Aurora Vanguard", category: "Teater", description: "cerita humor dan drama panggung" },
  { performanceId: "kecak", slug: "kecak", title: "PG 6101 KECAK", performanceName: "Kecak Modern", collectionId: "nusantara", collectionName: "Nusantara Legacy", category: "Seni Tari", description: "ritme tradisi dan budaya" },
];

describe("recommendRelatedVideos", () => {
  it("does not recommend the currently opened performance", () => {
    const result = recommendRelatedVideos(catalog[0], catalog, 4);
    expect(result.some((item) => item.performanceId === "hadroh")).toBe(false);
  });

  it("returns no more than the requested limit", () => {
    expect(recommendRelatedVideos(catalog[0], catalog, 2)).toHaveLength(2);
  });

  it("prioritizes candidates that share category or collection signals", () => {
    const result = recommendRelatedVideos(catalog[0], catalog, 3);
    expect(result[0].relevanceScore).toBeGreaterThanOrEqual(result.at(-1).relevanceScore);
  });
});
