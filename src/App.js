import React, { useState } from "react"
import "./App.css"
import Header from "./common/header/Header"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Pages from "./pages/Pages"

function App() {
  
  const { productItems } = Data
  const { shopItems } = Sdata

  //Step 2 :
  const [CartItem, setCartItem] = useState([])

  //Step 4 :
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  // Stpe: 6
  const decreaseQty = (product) => {
   
    const productExit = CartItem.find((item) => item.id === product.id)

    
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  return (
    <>
    <BrowserRouter>
    <Header CartItem={CartItem} />
      <Routes>
        <Route path="/" element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} /> } />
        
        <Route path="/cart" element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
    

    </>
  )
}

export default App