import React, { useState, useEffect } from "react";
import Products from "./components/Products/Products";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/Cart/Cart";
import { commerce } from "./lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  // will call the product and set the list of products
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
      <Navbar totalItems={cart.total_items} />
      <Cart cart={cart} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
