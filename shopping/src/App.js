import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Products, Navbar, Cart, Checkout } from "./components";

const App = () => {
  // State for storing products and cart information
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // Function to fetch product data from the Commerce.js API
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  // Function to fetch cart data from the Commerce.js API
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  // Function to handle adding a product to the cart
  const handleAddToCart = async (productId, quantity) => {
    const cart = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  // Function to handle updating the quantity of a product in the cart
  const handleUpdateCartQty = async (productId, quantity) => {
    const cart = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  // Function to handle removing a product from the cart
  const handleRemoveFromCart = async (productId) => {
    const cart = await commerce.cart.remove(productId);
    setCart(cart);
  };

  // Function to handle emptying the cart
  const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty();
    setCart(cart);
  };

  // Fetch products and cart data when the component mounts
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        {/* Navbar component displaying total items in the cart */}
        <Navbar totalItems={cart.total_items} />

        {/* Routes for different views */}
        <Routes>
          {/* Route for the Products view */}
          <Route
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />

          {/* Route for the Cart view */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onAddToCart={handleAddToCart}
                onEmptyCart={handleEmptyCart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateCartQty={handleUpdateCartQty}
              />
            }
          />

          {/* Route for the Checkout view */}
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                // order={order}
                // onCaptureCheckout={handleCaptureCheckout}
                // error={errorMessage}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
