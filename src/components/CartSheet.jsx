import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import CartLineItem from './CartLineItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const CartSheet = () => {
  const { items, totalCount, totalPrice } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='relative' aria-label='Open cart'>
          <ShoppingCart className='size-4' />
          {totalCount > 0 && (
            <span className='absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground tabular-nums'>
              {totalCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side='right' className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Review your items before checkout.</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className='flex flex-1 flex-col items-center justify-center gap-2 text-center'>
            <ShoppingCart className='size-10 text-muted-foreground' />
            <p className='font-medium'>Your cart is empty</p>
            <p className='text-sm text-muted-foreground'>
              Items you add will show up here.
            </p>
          </div>
        ) : (
          <div className='flex flex-1 flex-col gap-4 overflow-y-auto px-4'>
            {items.map((item) => (
              <CartLineItem key={item.product.id} item={item} />
            ))}
          </div>
        )}

        <div className='px-4'>
          <Separator className='mb-4' />
          <div className='flex items-center justify-between font-semibold'>
            <span>Total</span>
            <span className='tabular-nums'>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <SheetFooter>
          <Button asChild variant='outline'>
            <Link to='/cart'>View Full Cart</Link>
          </Button>
          <Button disabled={items.length === 0}>Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
