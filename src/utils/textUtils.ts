export const toUppercase = (text: string) => text.toUpperCase();

export const toLowercase = (text: string) => text.toLowerCase();

export const toTitleCase = (text: string) =>
  text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export const toSentenceCase = (text: string) =>
  text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

export const removeExtraSpaces = (text: string) => text.replace(/\s+/g, ' ').trim();

export const removeLineBreaks = (text: string) => text.replace(/\n/g, ' ');

// Pro functions
export const removeEmojis = (text: string) => text.replace(/[\u{1F600}-\u{1F6FF}]/gu, '');
export const removeSpecialChars = (text: string) => text.replace(/[^\w\s\n]/gi, '');
export const removeDuplicateWords = (text: string) => {
  const words = text.split(/\s+/);
  return [...new Set(words)].join(' ');
};
