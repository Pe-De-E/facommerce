import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { getProductsByCategory } from '@/api/products';
import { ProductCard, ProductCardSkeleton } from '@/components';
import { Button } from '@/components/ui/button';

const Category = () => {
  const { name } = useParams();

  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['products', 'category', name],
    queryFn: () => getProductsByCategory(name),
  });

  return (
    <section>
      <Button asChild variant='ghost' size='sm' className='mb-6'>
        <Link to='/'>
          <ArrowLeft className='size-4' />
          Back to Shop
        </Link>
      </Button>

      <div className='mb-8'>
        <h2 className='text-3xl font-bold tracking-tight capitalize'>{name}</h2>
        <p className='mt-1 text-muted-foreground'>
          {products
            ? `${products.length} ${products.length === 1 ? 'product' : 'products'} in this category.`
            : 'Loading products…'}
        </p>
      </div>

      {isError && (
        <div className='rounded-lg border border-destructive/50 p-6 text-center text-destructive'>
          Failed to load category: {error.message}
        </div>
      )}

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {isPending &&
          Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}

        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Category;
