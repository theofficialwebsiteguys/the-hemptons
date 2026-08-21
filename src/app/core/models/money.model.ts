export interface Money {
  amount: string;
  currencyCode: string;
}

export function formatMoney(money: Money | null | undefined, locale = 'en-US'): string {
  if (!money) return '';
  const amount = Number(money.amount);
  if (Number.isNaN(amount)) return '';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: money.currencyCode }).format(amount);
}

export function isMoneyGreaterThan(a: Money | null | undefined, b: Money | null | undefined): boolean {
  if (!a || !b) return false;
  return Number(a.amount) > Number(b.amount);
}
