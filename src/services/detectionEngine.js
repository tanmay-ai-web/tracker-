const normalizeName = (name) => name.toLowerCase().replace(/[^a-z0-9+]/g, '');

const predictFrequency = (text) => {
  if (/year|annual/i.test(text)) return 'Yearly';
  if (/week/i.test(text)) return 'Weekly';
  return 'Monthly';
};

const confidenceScore = (parsed) => {
  let score = 0.45;
  if (parsed.amount) score += 0.2;
  if (parsed.keywords.length >= 2) score += 0.2;
  if (parsed.merchant && parsed.merchant.length > 2) score += 0.1;
  return Math.min(0.99, score);
};

export const detectSubscriptions = (parsedMessages) => {
  const grouped = new Map();

  parsedMessages.forEach((p) => {
    const key = normalizeName(p.merchant);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(p);
  });

  return [...grouped.entries()].map(([key, items], index) => {
    const latest = items[items.length - 1];
    const score = confidenceScore(latest);
    return {
      id: `det-${index + 1}`,
      name: latest.merchant,
      normalized: key,
      amount: latest.amount || 0,
      frequency: predictFrequency(latest.rawText),
      confidence: Number(score.toFixed(2)),
      status: 'Active',
      renewalDate: '2026-04-30',
      category: /netflix|spotify|youtube/i.test(key) ? 'Entertainment' : 'Utilities'
    };
  });
};
