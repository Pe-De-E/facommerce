import { Route, Routes } from 'react-router';
import { MainLayout } from '@/layouts';
import { Home, Cart, ProductDetail } from '@/pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path='products/:id' element={<ProductDetail />} />
        <Route path='cart' element={<Cart />} />

        <Route
          path='*'
          element={
            <div className='py-24 text-center'>
              <h2 className='text-6xl font-bold tracking-tight'>404</h2>
              <p className='mt-2 text-muted-foreground'>Page not found</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
