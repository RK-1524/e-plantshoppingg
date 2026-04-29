import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      id: 1,
      name: "Aloe Vera",
      image: "https://via.placeholder.com/150",
      description: "Good for skin",
      cost: 100
    },
    {
      id: 2,
      name: "Mint",
      image: "https://via.placeholder.com/150",
      description: "Fresh herb",
      cost: 50
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true
    }));
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div>
      <h2>🌿 Products</h2>
      <h3>🛒 Cart Items: {calculateTotalQuantity()}</h3>

      <div className="product-grid">
        {plantsArray.map((plant) => (
          <div key={plant.id} className="plant-card">
            <img src={plant.image} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <p>₹{plant.cost}</p>

            <button
              onClick={() => handleAddToCart(plant)}
              disabled={addedToCart[plant.name]}
            >
              {addedToCart[plant.name] ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;