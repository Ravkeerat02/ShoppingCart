import React, { useState, useEffect } from "react";
import Products from "./components/Products/Products";
import Navbar from "./components/navbar/Navbar";
import { commerce } from "./lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  // will call the product and set the list of products
  useEffect(() => {
    fetchProducts();
  });

  console.log(products);

  return (
    <div>
      <Products products={products} />
      <Navbar />
    </div>
  );
};

export default App;
