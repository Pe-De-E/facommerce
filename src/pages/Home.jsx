import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/products';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <section>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold tracking-tight'>Products</h2>
        <p className='mt-1 text-muted-foreground'>
          Browse our totally real, not at all fake products.
        </p>
      </div>

      {isError && (
        <div className='rounded-lg border border-destructive/50 p-6 text-center text-destructive'>
          Failed to load products: {error.message}
        </div>
      )}

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {isPending &&
          Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className='flex flex-col'>
              <CardHeader>
                <Skeleton className='aspect-square rounded-md' />
              </CardHeader>
              <CardContent className='flex-1 space-y-2'>
                <Skeleton className='h-5 w-16' />
                <Skeleton className='h-5 w-full' />
                <Skeleton className='h-6 w-20' />
              </CardContent>
              <CardFooter>
                <Skeleton className='h-9 w-full' />
              </CardFooter>
            </Card>
          ))}

        {products?.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='group rounded-xl hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          >
            <Card className='flex h-full flex-col transition-shadow group-hover:shadow-md'>
              <CardHeader>
                <div className='flex aspect-square items-center justify-center rounded-md bg-white p-6'>
                  <img
                    src={product.image}
                    alt={product.title}
                    className='max-h-full max-w-full object-contain transition-transform duration-300 group-hover:z-10 group-hover:-translate-y-14 group-hover:scale-[1.4] group-hover:drop-shadow-xl'
                  />
                </div>
              </CardHeader>
              <CardContent className='flex-1 space-y-2'>
                <Badge variant='secondary' className='capitalize'>
                  {product.category}
                </Badge>
                <CardTitle className='line-clamp-2'>{product.title}</CardTitle>
                <p className='text-lg font-semibold'>${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <span className={cn(buttonVariants(), 'w-full')}>View Details</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
