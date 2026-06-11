import { Link } from 'react-router';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';

const CartLineItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className='flex gap-4'>
      <div className='flex size-16 shrink-0 items-center justify-center rounded-md border bg-white p-1'>
        <img
          src={product.image}
          alt={product.title}
          className='max-h-full max-w-full object-contain'
        />
      </div>

      <div className='flex flex-1 flex-col gap-1'>
        <Link
          to={`/products/${product.id}`}
          className='line-clamp-1 text-sm font-medium hover:underline'
        >
          {product.title}
        </Link>
        <p className='text-sm text-muted-foreground'>${product.price.toFixed(2)}</p>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            className='size-6'
            aria-label='Decrease quantity'
            onClick={() => updateQuantity(product.id, quantity - 1)}
          >
            <Minus className='size-3' />
          </Button>
          <span className='w-6 text-center text-sm tabular-nums'>{quantity}</span>
          <Button
            variant='outline'
            size='icon'
            className='size-6'
            aria-label='Increase quantity'
            onClick={() => updateQuantity(product.id, quantity + 1)}
          >
            <Plus className='size-3' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='ml-auto size-6 text-muted-foreground hover:text-destructive'
            aria-label='Remove item'
            onClick={() => removeItem(product.id)}
          >
            <Trash2 className='size-3.5' />
          </Button>
        </div>
      </div>

      <p className='text-sm font-semibold tabular-nums'>
        ${(product.price * quantity).toFixed(2)}
      </p>
    </div>
  );
};

export default CartLineItem;
