import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='Open cart'>
          <ShoppingCart className='size-4' />
        </Button>
      </SheetTrigger>

      <SheetContent side='right' className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Review your items before checkout.</SheetDescription>
        </SheetHeader>

        <div className='flex flex-1 flex-col items-center justify-center gap-2 text-center'>
          <ShoppingCart className='size-10 text-muted-foreground' />
          <p className='font-medium'>Your cart is empty</p>
          <p className='text-sm text-muted-foreground'>
            Items you add will show up here.
          </p>
        </div>

        <SheetFooter>
          <Button asChild variant='outline'>
            <Link to='/cart'>View Full Cart</Link>
          </Button>
          <Button disabled>Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
