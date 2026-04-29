import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.cost * item.quantity,
      0
    );
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1
      })
    );
  };

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

  return (
    <div>
      <h2>🛒 Cart</h2>

      {cartItems.map((item) => (
        <div key={item.name}>
          <h3>{item.name}</h3>
          <p>₹{item.cost}</p>
          <p>Total: ₹{item.cost * item.quantity}</p>

          <button onClick={() => handleIncrement(item)}>+</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleDecrement(item)}>-</button>

          <button onClick={() => dispatch(removeItem(item.name))}>
            Delete
          </button>
        </div>
      ))}

      <h3>Total Amount: ₹{calculateTotalAmount()}</h3>

      <button onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
};

export default CartItem;