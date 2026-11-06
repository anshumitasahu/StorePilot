import Products from './components/page/Products';
import Customers from './components/page/Customers';
import Orders from './components/page/Orders';
import NavBar from './components/ui/layout/navBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-10 bg-[url('/bg-white.jpeg')] bg-cover bg-center bg-no-repeat overflow-hidden">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/" element={<Orders />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

