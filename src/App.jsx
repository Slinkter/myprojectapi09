import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Navbar = lazy(() => import('./components/navbar'));
const Home = lazy(() => import('./pages/home'));
const Favorite = lazy(() => import('./pages/favorites'));
const Details = lazy(() => import('./pages/details'));

const App = () => {
  return (
    <div className=" ">
      <div className="min-h-screen p-4 sm:p-6 bg-bg-base text-text-base text-lg">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/recipe-item/:id" element={<Details />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
