import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Navbar = lazy(() => import('@/widgets/Navbar/Navbar.jsx'));
const Home = lazy(() => import('@/pages/HomePage/HomePage.jsx'));
const Favorite = lazy(() => import('@/pages/FavoritesPage/FavoritesPage.jsx'));
const Details = lazy(() => import('@/pages/DetailsPage/DetailsPage.jsx'));

const App = () => {
  return (
    <div className=" ">
      <div className="min-h-screen p-4 sm:p-6 bg-bg-base text-text-base text-lg">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/recipe/:id" element={<Details />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
