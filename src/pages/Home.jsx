import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getProducts } from '@/api/products';
import { ProductCard, ProductCardSkeleton } from '@/components';
import { Badge } from '@/components/ui/badge';
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

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <section>
      <div className='mb-6'>
        <h2 className='text-3xl font-bold tracking-tight'>Products</h2>
        <p className='mt-1 text-muted-foreground'>
          Browse our totally real, not at all fake products.
        </p>
      </div>

      <div className='mb-8 flex flex-wrap gap-2'>
        {categories
          ? categories.map((category) => (
              <Link key={category} to={`/category/${encodeURIComponent(category)}`}>
                <Badge
                  variant='outline'
                  className='px-3 py-1 text-sm capitalize transition-colors hover:bg-accent'
                >
                  {category}
                </Badge>
              </Link>
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-7 w-24 rounded-full' />
            ))}
      </div>

      {isError && (
        <div className='rounded-lg border border-destructive/50 p-6 text-center text-destructive'>
          Failed to load products: {error.message}
        </div>
      )}

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {isPending &&
          Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}

        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Home;
