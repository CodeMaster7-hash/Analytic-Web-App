import { BrowserRouter } from 'react-router-dom';
import SidebarRoutes from './routes/SidebarRoutes';
import './App.css'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Umair Project";
  })
  return (
    <BrowserRouter>
      <SidebarRoutes />
    </BrowserRouter>
  );
}

export default App;
