const ones = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];

const tens = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
];

const twoDigitToWords = (num) => {
  if (num < 20) return ones[num];
  const t = Math.floor(num / 10);
  const o = num % 10;
  return `${tens[t]}${o ? " " + ones[o] : ""}`;
};

const threeDigitToWords = (num) => {
  const hundred = Math.floor(num / 100);
  const rest = num % 100;
  let str = "";
  if (hundred) str += `${ones[hundred]} Hundred`;
  if (rest) str += `${str ? " " : ""}${twoDigitToWords(rest)}`;
  return str;
};

// Pakistani numbering system: Crore (1,00,00,000) / Lakh (1,00,000) / Thousand / Hundred
export const numberToWords = (num) => {
  if (num === null || num === undefined || num === "" || isNaN(num)) return "";

  let n = Math.floor(Number(num));
  if (n === 0) return "Zero Rupees Only";
  if (n < 0) return "";

  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  const hundred = n;

  let words = "";
  if (crore) words += `${threeDigitToWords(crore)} Crore `;
  if (lakh) words += `${threeDigitToWords(lakh)} Lakh `;
  if (thousand) words += `${threeDigitToWords(thousand)} Thousand `;
  if (hundred) words += `${threeDigitToWords(hundred)}`;

  return `${words.trim()} Rupees Only`;
};

export default numberToWords;