const STOP_WORDS = new Set([
  "yang", "dan", "dalam", "dengan", "untuk", "dari", "sebagai", "pada",
  "dalam", "menuju", "melalui", "menjadi", "sebuah", "setiap", "ini",
  "itu", "the", "of", "and", "to", "a", "an", "pg", "6101",
]);

function tokenize(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function jaccardSimilarity(left, right) {
  const a = new Set(left);
  const b = new Set(right);
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  const union = a.size + b.size - intersection;
  return union ? intersection / union : 0;
}

function buildTfidfVectors(videos) {
  const tokenLists = videos.map((video) => tokenize(
    `${video.title || ""} ${video.performanceName || ""} ${video.description || ""} ${(video.tags || []).join(" ")} ${video.collectionName || ""}`
  ));
  const documentFrequency = new Map();

  for (const tokens of tokenLists) {
    for (const token of new Set(tokens)) {
      documentFrequency.set(token, (documentFrequency.get(token) || 0) + 1);
    }
  }

  const totalDocuments = Math.max(videos.length, 1);
  return tokenLists.map((tokens) => {
    const counts = new Map();
    for (const token of tokens) counts.set(token, (counts.get(token) || 0) + 1);
    const vector = new Map();
    const length = Math.max(tokens.length, 1);

    for (const [token, count] of counts) {
      const df = documentFrequency.get(token) || 0;
      const idf = Math.log(1 + totalDocuments / (1 + df));
      vector.set(token, (count / length) * idf);
    }
    return vector;
  });
}

function cosineSimilarity(a, b) {
  if (!a?.size || !b?.size) return 0;
  let dot = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  for (const value of a.values()) magnitudeA += value * value;
  for (const value of b.values()) magnitudeB += value * value;
  for (const [token, value] of a) dot += value * (b.get(token) || 0);
  const denominator = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);
  return denominator ? dot / denominator : 0;
}

/**
 * Content-based recommendation (heuristic, not an external generative AI model).
 * Weighted signals:
 * - 30% category match, when both videos have a category
 * - 25% same collection
 * - 20% token overlap (Jaccard)
 * - 25% TF-IDF cosine similarity
 * Missing category metadata is excluded and the remaining weights are normalized.
 */
export function recommendRelatedVideos(currentVideo, catalog, limit = 4) {
  if (!currentVideo || !Array.isArray(catalog) || catalog.length === 0) return [];

  const videos = catalog.filter((video) => video.performanceId !== currentVideo.performanceId);
  const corpus = [currentVideo, ...videos];
  const vectors = buildTfidfVectors(corpus);
  const currentVector = vectors[0];
  const currentTokens = tokenize(
    `${currentVideo.title || ""} ${currentVideo.performanceName || ""} ${currentVideo.description || ""} ${(currentVideo.tags || []).join(" ")} ${currentVideo.collectionName || ""}`
  );

  const scored = videos.map((candidate, index) => {
    const candidateTokens = tokenize(
      `${candidate.title || ""} ${candidate.performanceName || ""} ${candidate.description || ""} ${(candidate.tags || []).join(" ")} ${candidate.collectionName || ""}`
    );
    const signals = [];

    if (currentVideo.category && candidate.category) {
      signals.push({ value: currentVideo.category.toLowerCase() === candidate.category.toLowerCase() ? 1 : 0, weight: 0.30 });
    }
    if (currentVideo.collectionId && candidate.collectionId) {
      signals.push({ value: currentVideo.collectionId === candidate.collectionId ? 1 : 0, weight: 0.25 });
    }
    signals.push({ value: jaccardSimilarity(currentTokens, candidateTokens), weight: 0.20 });
    signals.push({ value: cosineSimilarity(currentVector, vectors[index + 1]), weight: 0.25 });

    const totalWeight = signals.reduce((sum, signal) => sum + signal.weight, 0);
    const normalizedScore = totalWeight
      ? signals.reduce((sum, signal) => sum + signal.value * signal.weight, 0) / totalWeight
      : 0;

    return {
      ...candidate,
      relevanceScore: Math.round(normalizedScore * 100),
    };
  });

  return scored
    .sort((a, b) => b.relevanceScore - a.relevanceScore || a.title.localeCompare(b.title))
    .slice(0, Math.max(0, limit));
}
