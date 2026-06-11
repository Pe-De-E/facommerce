import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { getProduct } from '@/api/products';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = () => {
  const { id } = useParams();

  const {
    data: product,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
  });

  return (
    <section>
      <Button asChild variant='ghost' size='sm' className='mb-6'>
        <Link to='/'>
          <ArrowLeft className='size-4' />
          Back to Shop
        </Link>
      </Button>

      {isError && (
        <div className='rounded-lg border border-destructive/50 p-6 text-center text-destructive'>
          Failed to load product: {error.message}
        </div>
      )}

      {isPending && (
        <div className='grid gap-8 md:grid-cols-2'>
          <Skeleton className='aspect-square rounded-lg' />
          <div className='space-y-4'>
            <Skeleton className='h-5 w-24' />
            <Skeleton className='h-9 w-3/4' />
            <Skeleton className='h-8 w-24' />
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-10 w-40' />
          </div>
        </div>
      )}

      {product && (
        <div className='grid gap-8 md:grid-cols-2'>
          <div className='flex aspect-square items-center justify-center rounded-lg bg-white p-8'>
            <img
              src={product.image}
              alt={product.title}
              className='max-h-full max-w-full object-contain'
            />
          </div>

          <div className='space-y-4'>
            <Badge variant='secondary' className='capitalize'>
              {product.category}
            </Badge>
            <h2 className='text-3xl font-bold tracking-tight'>{product.title}</h2>

            <div className='flex items-center gap-1 text-sm text-muted-foreground'>
              <Star className='size-4 fill-current text-yellow-500' />
              {product.rating.rate} ({product.rating.count} reviews)
            </div>

            <p className='text-2xl font-semibold'>${product.price.toFixed(2)}</p>

            <Separator />

            <p className='text-muted-foreground first-letter:uppercase'>
              {product.description}
            </p>

            <Button size='lg' className='w-full sm:w-auto'>
              <ShoppingCart className='size-4' />
              Add to Cart
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
