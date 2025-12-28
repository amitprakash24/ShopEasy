
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Components/Shop/Shop';
import Product from './Page/Product';
import Cart from './Page/Cart';
import ShopCategory from './Page/ShopCategory';

import LoginSignup from './Page/LoginSignup';
import Checkout from './Page/Checkout';
import men_benner from './Components/Assets/banner_mens.png';
import womens_benner from './Components/Assets/banner_women.png';
import kids_benner from './Components/Assets/banner_kids.png'; 


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Shop/>} />
         <Route path="/men" element={<ShopCategory banner={men_benner} category="men"/>} />
          <Route path="/women" element={<ShopCategory banner={womens_benner} category="women"/>} />
           <Route path="/kids" element={<ShopCategory banner={kids_benner} category="kids"/>} />
           <Route path="/product/:productId" element={<Product/>} />
           <Route path="/product" element={<Product/>} />
           

             <Route path="/cart" element={<Cart/>} />
             <Route path="/checkout" element={<Checkout/>} />
             <Route path="/login" element={<LoginSignup/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
