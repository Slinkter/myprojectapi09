import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RecipeProvider from '@/app/providers/with-recipes.jsx';
import App from '@/app/App.jsx';
import '@/app/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </BrowserRouter>
);
