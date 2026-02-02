export type Review = {
  quote: string;
  author: string;
  date: string;
};

export const stripOuterQuotes = (text: string) => {
  const trimmed = text.trim();
  return trimmed.replace(/^["“'‘]+/, "").replace(/["”'’]+$/, "");
};

export const balanceForTwoColumnGrid = <T>(
  items: readonly T[],
  getText: (item: T) => string,
) => {
  const sorted = [...items].sort(
    (a, b) => getText(a).length - getText(b).length,
  );
  const longHalf = sorted.slice(Math.ceil(sorted.length / 2)).reverse();
  const shortHalf = sorted.slice(0, Math.ceil(sorted.length / 2));
  const balanced: T[] = [];
  const shortQueue = [...shortHalf];

  for (const item of longHalf) {
    balanced.push(item);
    const shortItem = shortQueue.shift();
    if (shortItem !== undefined) balanced.push(shortItem);
  }

  return balanced;
};

export const orderReviewsForGrid = (reviews: readonly Review[]) => {
  const balanced = balanceForTwoColumnGrid(reviews, (review) =>
    stripOuterQuotes(review.quote),
  );

  // Preserve historical “swap” that improves visual balance.
  const next = [...balanced];
  const julesIndex = next.findIndex((review) => review.author === "Jules D");
  const anyiIndex = next.findIndex((review) => review.author === "Anyi F");
  if (julesIndex !== -1 && anyiIndex !== -1) {
    const julesReview = next[julesIndex];
    const anyiReview = next[anyiIndex];
    if (julesReview && anyiReview) {
      next[julesIndex] = anyiReview;
      next[anyiIndex] = julesReview;
    }
  }

  return next;
};
