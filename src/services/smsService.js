const mockSmsInbox = [
  { id: 'm1', body: 'INR 499 debited for Netflix subscription renewal on 17 Apr.', sender: 'HDFCBK', timestamp: 1713301000000 },
  { id: 'm2', body: 'Your Spotify Premium of Rs.119 will be renewed tomorrow.', sender: 'SPTFY', timestamp: 1713309000000 },
  { id: 'm3', body: 'Notion billed ₹800 for monthly plan.', sender: 'NOTION', timestamp: 1713312000000 },
  { id: 'm4', body: 'Reminder: iCloud+ 75 INR auto-debit successful.', sender: 'APPLE', timestamp: 1713381000000 }
];

export const requestSmsPermission = async () => {
  return { granted: true, source: 'mock' };
};

export const fetchInboxSms = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return mockSmsInbox;
};
