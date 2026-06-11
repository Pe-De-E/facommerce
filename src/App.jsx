import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path='products/:id' element={<ProductDetail />} />
        <Route path='cart' element={<Cart />} />

        <Route path='*' element={<h2>NOT FOUND</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
