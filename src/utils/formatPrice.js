const priceFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

export function formatPrice(value) {
  return priceFormatter.format(value);
}
