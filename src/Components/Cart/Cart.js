import React, { useContext, useState } from "react";
import CartContext from "../../Store/CartContext";
import Modal from "../UI/Modal";
import CartItem from "../Cart/CartItem/CartItem";
import Checkout from "../Cart/Checkout";

import style from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cartRemoveItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartAddItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderButtonHandler = () => {
    setButtonVisibility(false);
  };

  const CartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartRemoveItemHandler.bind(null, item.id)}
          onAdd={cartAddItemHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-9cc8d-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, cart: cartCtx.items }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={style.actions}>
      <button
        className={style["button--alt"]}
        hidden={!buttonVisibility}
        onClick={props.onClose}
      >
        Close
      </button>
      {hasItems && (
        <button
          className={style.button}
          hidden={!buttonVisibility}
          onClick={orderButtonHandler}
        >
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {CartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!buttonVisibility && (
        <Checkout
          onConfirm={submitOrderHandler}
          onClick={props.onClose}
        ></Checkout>
      )}
      {modalActions}
    </>
  );
  const isSubmittingContent = (
    <p>We are sending the order data...Please wait</p>
  );

  const isSubmittedContent = (
    <>
      <p>Thank you for your order. Enjoy the meal</p>
      <button className={style["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {isSubmitted && isSubmittedContent}
    </Modal>
  );
};

export default Cart;
