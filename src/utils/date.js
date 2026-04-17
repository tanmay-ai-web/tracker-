export const next7Days = (isoDate) => {
  const now = new Date('2026-04-17T00:00:00Z');
  const date = new Date(isoDate);
  const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
};

export const prettyDate = (isoDate) => new Date(isoDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
