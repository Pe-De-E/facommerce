import { Link, NavLink, Outlet } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSheet } from '@/components';

const MainLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
          <Link to='/' className='flex items-center gap-2 text-lg font-bold tracking-tight'>
            <ShoppingBag className='size-5' />
            Fak-O-Merce
          </Link>

          <nav className='flex items-center gap-1'>
            <Button asChild variant='ghost'>
              <NavLink to='/'>Shop</NavLink>
            </Button>
            <CartSheet />
          </nav>
        </div>
      </header>

      <main className='container mx-auto flex-1 px-4 py-8'>
        <Outlet />
      </main>

      <footer className='border-t py-6'>
        <div className='container mx-auto px-4 text-center text-sm text-muted-foreground'>
          © {new Date().getFullYear()} Fak-O-Merce — Fake it till you make it.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
