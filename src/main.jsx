import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GlobalState from './context/index.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalState>
      <App />
    </GlobalState>
  </BrowserRouter>
);
