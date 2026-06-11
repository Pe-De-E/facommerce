import { Link, Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <>
      <header>
        <Link to='/'>Shop</Link>
        <Link to='/cart'>Cart</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
