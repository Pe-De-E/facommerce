import { Link, useParams } from 'react-router';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <section>
      <Button asChild variant='ghost' size='sm' className='mb-6'>
        <Link to='/'>
          <ArrowLeft className='size-4' />
          Back to Shop
        </Link>
      </Button>

      <div className='grid gap-8 md:grid-cols-2'>
        <div className='flex aspect-square items-center justify-center rounded-lg bg-muted text-muted-foreground'>
          Image
        </div>

        <div className='space-y-4'>
          <Badge variant='secondary'>demo</Badge>
          <h2 className='text-3xl font-bold tracking-tight'>Product Detail</h2>
          <p className='text-sm text-muted-foreground'>Product ID: {id}</p>
          <p className='text-2xl font-semibold'>$0.00</p>

          <Separator />

          <p className='text-muted-foreground'>
            Product description will go here once we fetch real data.
          </p>

          <Button size='lg' className='w-full sm:w-auto'>
            <ShoppingCart className='size-4' />
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
