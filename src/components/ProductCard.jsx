import { Link } from 'react-router';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ProductCard = ({ product }) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.product.id === product.id);

  return (
    <Card className='group relative flex h-full flex-col transition-shadow hover:z-10 hover:shadow-md'>
      <CardHeader>
        <div className='flex aspect-square items-center justify-center rounded-md bg-white p-6'>
          <img
            src={product.image}
            alt={product.title}
            className='max-h-full max-w-full object-contain transition-transform duration-300 group-hover:z-10 group-hover:-translate-y-14 group-hover:scale-[1.4] group-hover:drop-shadow-xl dark:group-hover:translate-y-0 dark:group-hover:scale-105'
          />
        </div>
      </CardHeader>

      <CardContent className='flex-1 space-y-2'>
        <Link
          to={`/category/${encodeURIComponent(product.category)}`}
          className='relative z-10 inline-block'
        >
          <Badge
            variant='secondary'
            className='capitalize transition-colors hover:bg-secondary/60'
          >
            {product.category}
          </Badge>
        </Link>

        <CardTitle className='line-clamp-2'>
          {/* Stretched link: the ::after overlay makes the whole card clickable */}
          <Link
            to={`/products/${product.id}`}
            className='after:absolute after:inset-0 after:rounded-xl hover:underline focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring'
          >
            {product.title}
          </Link>
        </CardTitle>

        <p className='text-lg font-semibold'>{formatPrice(product.price)}</p>
      </CardContent>

      <CardFooter className='relative z-10'>
        {cartItem ? (
          <div className='flex w-full items-center justify-center gap-3'>
            <Button
              variant='outline'
              size='icon'
              aria-label='Decrease quantity'
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
            >
              <Minus className='size-4' />
            </Button>
            <span className='min-w-8 text-center font-medium tabular-nums'>
              {cartItem.quantity}
            </span>
            <Button
              variant='outline'
              size='icon'
              aria-label='Increase quantity'
              onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
            >
              <Plus className='size-4' />
            </Button>
          </div>
        ) : (
          <Button className='w-full' onClick={() => addItem(product)}>
            <ShoppingCart className='size-4' />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
