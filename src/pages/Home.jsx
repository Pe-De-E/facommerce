import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { getCategories, getProducts } from '@/api/products';
import { ProductCard, ProductCardSkeleton } from '@/components';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const sortProducts = (products, sort) => {
  const sorted = [...products];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'rating':
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    default:
      return sorted;
  }
};

const Home = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

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

  // Derived during render — no extra state to keep in sync
  const visibleProducts = sortProducts(
    (products ?? []).filter((product) =>
      product.title.toLowerCase().includes(search.trim().toLowerCase()),
    ),
    sort,
  );

  return (
    <section>
      <div className='mb-6'>
        <h2 className='text-3xl font-bold tracking-tight'>Products</h2>
        <p className='mt-1 text-muted-foreground'>
          Browse our totally real, not at all fake products.
        </p>
      </div>

      <div className='mb-6 flex flex-wrap gap-2'>
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

      <div className='mb-8 flex flex-col gap-3 sm:flex-row'>
        <div className='relative flex-1'>
          <Search className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search products…'
            className='pl-9'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className='w-full sm:w-48'>
            <SelectValue placeholder='Sort by' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='default'>Featured</SelectItem>
            <SelectItem value='price-asc'>Price: Low to High</SelectItem>
            <SelectItem value='price-desc'>Price: High to Low</SelectItem>
            <SelectItem value='title'>Title: A–Z</SelectItem>
            <SelectItem value='rating'>Best Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isError && (
        <div className='rounded-lg border border-destructive/50 p-6 text-center text-destructive'>
          Failed to load products: {error.message}
        </div>
      )}

      {!isPending && !isError && visibleProducts.length === 0 && (
        <div className='rounded-lg border border-dashed py-24 text-center text-muted-foreground'>
          No products match &quot;{search}&quot;.
        </div>
      )}

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {isPending &&
          Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}

        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Home;
