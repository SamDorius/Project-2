
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/HomePage'
import LogIn from './Pages/LogIn'
import ShoppingCart from './Pages/ShoppingCart'
import Product from './Pages/ProductPage'
import SignUp from './Pages/SignUp'
import CheckOut from './Pages/CheckOut'


function App({items}) {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home items={items}/>}></Route>
          <Route path="/login" element={<LogIn/>}></Route>
          <Route path="/cart" element={<ShoppingCart/>}></Route>
          <Route path="/product" element={<Product/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/checkout" element={<CheckOut/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
