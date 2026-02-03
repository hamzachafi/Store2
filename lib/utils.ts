export function cn(...cls: (string | undefined | false)[]) {
  return cls.filter(Boolean).join(' ')
}

export function formatCurrency(amount: number, currency = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'MAD') {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  } catch {
    return amount.toFixed(2) + ' ' + currency
  }
}
