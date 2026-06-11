const BASE_URL = 'https://fakestoreapi.com';

export async function createOrder(items) {
  const res = await fetch(`${BASE_URL}/carts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 1,
      date: new Date().toISOString().slice(0, 10),
      products: items.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      })),
    }),
  });
  if (!res.ok) throw new Error(`Failed to place order (${res.status})`);
  return res.json();
}
