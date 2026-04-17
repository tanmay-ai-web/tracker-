const amountRegex = /(₹|INR|Rs\.?)(\s?)(\d+(?:\.\d+)?)/i;
const keywordRegex = /(debited|subscription|renewal|auto-debit|billed)/gi;
const merchantCandidates = ['Netflix', 'Spotify', 'Notion', 'iCloud+', 'YouTube', 'Amazon Prime', 'ChatGPT'];

export const parseSms = (sms) => {
  const amountMatch = sms.body.match(amountRegex);
  const amount = amountMatch ? Number(amountMatch[3]) : null;
  const keywords = [...new Set((sms.body.match(keywordRegex) || []).map((x) => x.toLowerCase()))];
  const merchant = merchantCandidates.find((name) => sms.body.toLowerCase().includes(name.toLowerCase())) || sms.sender;
  return {
    id: sms.id,
    rawText: sms.body,
    amount,
    merchant,
    keywords,
    timestamp: sms.timestamp
  };
};
