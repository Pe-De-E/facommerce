import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Placeholder until real products are fetched
const products = [
  { id: 1, title: 'Placeholder Product', price: 19.99, category: 'demo' },
  { id: 2, title: 'Another Product', price: 49.99, category: 'demo' },
  { id: 3, title: 'Cool Gadget', price: 9.99, category: 'demo' },
  { id: 4, title: 'Fancy Thing', price: 99.99, category: 'demo' },
];

const Home = () => {
  return (
    <section>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold tracking-tight'>Products</h2>
        <p className='mt-1 text-muted-foreground'>
          Browse our totally real, not at all fake products.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product) => (
          <Card key={product.id} className='flex flex-col transition-shadow hover:shadow-md'>
            <CardHeader>
              <div className='flex aspect-square items-center justify-center rounded-md bg-muted text-muted-foreground'>
                Image
              </div>
            </CardHeader>
            <CardContent className='flex-1 space-y-2'>
              <Badge variant='secondary'>{product.category}</Badge>
              <CardTitle className='line-clamp-2'>{product.title}</CardTitle>
              <p className='text-lg font-semibold'>${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className='w-full'>
                <Link to={`/products/${product.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Home;
