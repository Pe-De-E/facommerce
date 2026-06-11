import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Cart = () => {
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
};

export default Cart;
