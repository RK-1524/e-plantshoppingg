import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [addedToCart, setAddedToCart] = useState({});

  // ✅ Categorized plant data (6+ each)
  const plantsData = {
    Indoor: [
      { id: 1, name: "Aloe Vera", image: "https://source.unsplash.com/150x150/?aloe", cost: 100 },
      { id: 2, name: "Snake Plant", image: "https://source.unsplash.com/150x150/?snakeplant", cost: 150 },
      { id: 3, name: "Peace Lily", image: "https://source.unsplash.com/150x150/?peacelily", cost: 200 },
      { id: 4, name: "Spider Plant", image: "https://source.unsplash.com/150x150/?spiderplant", cost: 120 },
      { id: 5, name: "ZZ Plant", image: "https://source.unsplash.com/150x150/?zzplant", cost: 180 },
      { id: 6, name: "Areca Palm", image: "https://source.unsplash.com/150x150/?palmplant", cost: 250 }
    ],
    Outdoor: [
      { id: 7, name: "Rose", image: "https://source.unsplash.com/150x150/?rose", cost: 80 },
      { id: 8, name: "Hibiscus", image: "https://source.unsplash.com/150x150/?hibiscus", cost: 90 },
      { id: 9, name: "Tulsi", image: "https://source.unsplash.com/150x150/?tulsi", cost: 60 },
      { id: 10, name: "Jasmine", image: "https://source.unsplash.com/150x150/?jasmine", cost: 110 },
      { id: 11, name: "Sunflower", image: "https://source.unsplash.com/150x150/?sunflower", cost: 70 },
      { id: 12, name: "Marigold", image: "https://source.unsplash.com/150x150/?marigold", cost: 50 }
    ],
    Succulents: [
      { id: 13, name: "Cactus", image: "https://source.unsplash.com/150x150/?cactus", cost: 90 },
      { id: 14, name: "Echeveria", image: "https://source.unsplash.com/150x150/?succulent", cost: 120 },
      { id: 15, name: "Jade Plant", image: "https://source.unsplash.com/150x150/?jadeplant", cost: 130 },
      { id: 16, name: "Agave", image: "https://source.unsplash.com/150x150/?agave", cost: 160 },
      { id: 17, name: "Sedum", image: "https://source.unsplash.com/150x150/?sedum", cost: 110 },
      { id: 18, name: "Haworthia", image: "https://source.unsplash.com/150x150/?haworthia", cost: 140 }
    ]
  };

  // ✅ Add to cart
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    setAddedToCart((prev) => ({
      ...prev,
      [plant.id]: true
    }));
  };

  // ✅ Total cart count
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>

      {/* ✅ Navbar */}
      <nav style={styles.nav}>
        <h2>🌿 Paradise Nursery</h2>
        <div>
          <button>Home</button>
          <button>Plants</button>
          <button>Cart 🛒 ({totalItems})</button>
        </div>
      </nav>

      {/* ✅ Product Listing */}
      {Object.keys(plantsData).map((category) => (
        <div key={category}>
          <h2 style={{ margin: "20px" }}>{category} Plants</h2>

          <div style={styles.grid}>
            {plantsData[category].map((plant) => (
              <div key={plant.id} style={styles.card}>
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>₹{plant.cost}</p>

                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedToCart[plant.id]}
                  style={{
                    backgroundColor: addedToCart[plant.id] ? "gray" : "green",
                    color: "white",
                    padding: "8px",
                    border: "none",
                    cursor: addedToCart[plant.id] ? "not-allowed" : "pointer"
                  }}
                >
                  {addedToCart[plant.id] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    backgroundColor: "#4caf50",
    color: "white"
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px"
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    width: "150px",
    textAlign: "center"
  }
};

export default ProductList;
