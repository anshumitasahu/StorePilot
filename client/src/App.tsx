import Products from './components/page/Products';
import Customers from './components/page/Customers';
import Orders from './components/page/Orders';
import NavBar from './components/ui/layout/navBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="flex w-screen h-screen bg-white overflow-hidden">
      <BrowserRouter>
        <NavBar />
        <div className='w-full'>
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

// bg-[url('/pink-bg.png')] bg-cover bg-center bg-no-repeat