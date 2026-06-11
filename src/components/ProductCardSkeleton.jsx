import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton = () => {
  return (
    <Card className='flex flex-col'>
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
  );
};

export default ProductCardSkeleton;
