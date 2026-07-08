function formatAmount(number = 0) {
  if (number === null || number === undefined || isNaN(number)) return "0";

  let numberStr = number.toString();
  const parts = numberStr.split(".");

  let integerPart = parts[0];
  let decimalPart = parts[1] || "";

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // limit decimal to max 2 digits
  if (decimalPart.length > 2) {
    decimalPart = decimalPart.slice(0, 2);
  }

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

export default formatAmount;