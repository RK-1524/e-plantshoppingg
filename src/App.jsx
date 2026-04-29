import React, { useState } from "react";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>Cart</button>
      </nav>

      {page === "home" && (
        <>
          <h1>🌿 Paradise Nursery</h1>
          <button onClick={() => setPage("products")}>
            Get Started
          </button>
          <AboutUs />
        </>
      )}

      {page === "products" && <ProductList />}

      {page === "cart" && (
        <CartItem onContinueShopping={() => setPage("products")} />
      )}
    </div>
  );
}

export default App;