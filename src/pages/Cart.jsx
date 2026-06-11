import { Link } from 'react-router';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/utils';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Cart = () => {
  const { items, totalCount, totalPrice, updateQuantity, removeItem, clearCart } =
    useCart();

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

      <div className='rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className='text-right'>Price</TableHead>
              <TableHead className='text-center'>Quantity</TableHead>
              <TableHead className='text-right'>Sum</TableHead>
              <TableHead className='w-12' />
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map(({ product, quantity }) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Link
                    to={`/products/${product.id}`}
                    className='flex items-center gap-3 hover:underline'
                  >
                    <span className='flex size-12 shrink-0 items-center justify-center rounded-md border bg-white p-1'>
                      <img
                        src={product.image}
                        alt={product.title}
                        className='max-h-full max-w-full object-contain'
                      />
                    </span>
                    <span className='line-clamp-2 max-w-xs font-medium'>
                      {product.title}
                    </span>
                  </Link>
                </TableCell>

                <TableCell className='text-right tabular-nums'>
                  {formatPrice(product.price)}
                </TableCell>

                <TableCell>
                  <div className='flex items-center justify-center gap-2'>
                    <Button
                      variant='outline'
                      size='icon'
                      className='size-7'
                      aria-label='Decrease quantity'
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      <Minus className='size-3' />
                    </Button>
                    <span className='w-6 text-center tabular-nums'>{quantity}</span>
                    <Button
                      variant='outline'
                      size='icon'
                      className='size-7'
                      aria-label='Increase quantity'
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <Plus className='size-3' />
                    </Button>
                  </div>
                </TableCell>

                <TableCell className='text-right font-medium tabular-nums'>
                  {formatPrice(product.price * quantity)}
                </TableCell>

                <TableCell>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='size-7 text-muted-foreground hover:text-destructive'
                    aria-label='Remove item'
                    onClick={() => removeItem(product.id)}
                  >
                    <Trash2 className='size-3.5' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className='font-semibold'>
                Total
              </TableCell>
              <TableCell className='text-right text-lg font-semibold tabular-nums'>
                {formatPrice(totalPrice)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className='mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end'>
        <Button asChild variant='outline'>
          <Link to='/'>Continue Shopping</Link>
        </Button>
        <Button>Checkout</Button>
      </div>
    </section>
  );
};

export default Cart;
