import { MyBig } from '@/lib/big';

export function toCentFromDollar(amount: number): number {
  return MyBig(amount).mul(100).round(2).toNumber();
}

export function toDollarFromCent(amount: number): number {
  return MyBig(amount).div(100).round(2).toNumber();
}

export function toCurrencyFromCents(amount: number, currency?: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency ?? 'USD',
  }).format(toDollarFromCent(amount));
}
