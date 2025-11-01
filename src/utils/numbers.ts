export function formatChanceToPercent(chance: number): string {
  const percent = chance * 100;
  if (percent === 0) return "0.00";
  if (percent < 1) return percent.toFixed(8);
  return percent.toFixed(2);
}
