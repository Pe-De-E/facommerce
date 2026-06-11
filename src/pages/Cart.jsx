import { Link } from 'react-router';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/utils';
import { CartLineItem } from '@/components';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { items, totalCount, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section>
        <h2 className='mb-8 text-3xl font-bold tracking-tight'>Cart</h2>

        <div className='flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-24 text-center'>
          <ShoppingCart className='size-12 text-muted-foreground' />
          <div>
            <p className='text-lg font-medium'>Your cart is empty</p>
            <p className='text-sm text-muted-foreground'>
              Looks like you haven't added anything yet.
            </p>
          </div>
          <Button asChild>
            <Link to='/'>Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className='mb-8 flex items-center justify-between'>
        <h2 className='text-3xl font-bold tracking-tight'>
          Cart{' '}
          <span className='text-lg font-normal text-muted-foreground'>
            ({totalCount} {totalCount === 1 ? 'item' : 'items'})
          </span>
        </h2>
        <Button variant='ghost' size='sm' onClick={clearCart}>
          <Trash2 className='size-4' />
          Clear Cart
        </Button>
      </div>

      <div className='mx-auto max-w-2xl space-y-4 rounded-lg border p-6'>
        {items.map((item) => (
          <CartLineItem key={item.product.id} item={item} />
        ))}

        <Separator />

        <div className='flex items-center justify-between text-lg font-semibold'>
          <span>Total</span>
          <span className='tabular-nums'>{formatPrice(totalPrice)}</span>
        </div>

        <div className='flex flex-col gap-2 sm:flex-row sm:justify-end'>
          <Button asChild variant='outline'>
            <Link to='/'>Continue Shopping</Link>
          </Button>
          <Button>Checkout</Button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
