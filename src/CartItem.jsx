import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Total cart amount
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.cost * item.quantity,
      0
    );
  };

  // ✅ Increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1
      })
    );
  };

  // ✅ Decrease quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ Cart total count (for navbar)
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

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

      <h2 style={{ margin: "20px" }}>🛒 Shopping Cart</h2>

      {/* ✅ Cart Items */}
      {cartItems.length === 0 ? (
        <p style={{ margin: "20px" }}>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.name} style={styles.card}>

            {/* ✅ Thumbnail */}
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100px", height: "100px" }}
            />

            <div>
              {/* ✅ Name & price */}
              <h3>{item.name}</h3>
              <p>Price: ₹{item.cost}</p>

              {/* ✅ Total per item */}
              <p>Total: ₹{item.cost * item.quantity}</p>

              {/* ✅ Quantity controls */}
              <div>
                <button onClick={() => handleIncrement(item)}>+</button>
                <span style={{ margin: "0 10px" }}>
                  {item.quantity}
                </span>
                <button onClick={() => handleDecrement(item)}>-</button>
              </div>

              {/* ✅ Delete */}
              <button
                onClick={() => dispatch(removeItem(item.name))}
                style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* ✅ Total Cart Amount */}
      <h3 style={{ margin: "20px" }}>
        Total Amount: ₹{calculateTotalAmount()}
      </h3>

      {/* ✅ Buttons */}
      <div style={{ margin: "20px" }}>
        <button onClick={onContinueShopping} style={styles.btn}>
          Continue Shopping
        </button>

        <button
          onClick={() => alert("Coming Soon 🚀")}
          style={{ ...styles.btn, backgroundColor: "orange" }}
        >
          Checkout
        </button>
      </div>
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
  card: {
    display: "flex",
    gap: "20px",
    border: "1px solid #ccc",
    padding: "15px",
    margin: "20px",
    alignItems: "center"
  },
  btn: {
    padding: "10px 20px",
    marginRight: "10px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "white",
    cursor: "pointer"
  }
};

export default CartItem;
