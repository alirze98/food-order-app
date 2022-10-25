import React, { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const orderBtnClickHandler = () => {
    setShowCheckOut(true);
  };
  const submitOrderHandler = async (data) => {
    setIsSubmiting(true);
    await fetch(
      "https://react-project-87f5f-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: data,
          order: cartCtx.cartItems,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const items = cartCtx.cartItems.map((item, index) => {
    return (
      <CartItem
        name={item.mealName}
        amount={item.amount}
        price={item.price}
        id={item.id}
      />
    );
  });
  const showButtons = cartCtx.cartItems.length !== 0 && !showCheckOut;
  const modalContent = (
    <div>
      <Modal onShowModal={props.onShowModal}>
        <div>{items}</div>
        <div className={classes.total}>
          <h2 className={classes.total}>Total Amount</h2>
          <h2>{cartCtx.total.toFixed(2)}</h2>
        </div>
        {showCheckOut && (
          <div className={classes.checkOut}>
            <CheckOut onConfirm={submitOrderHandler} />
          </div>
        )}
        {showButtons && (
          <div className={classes.btns}>
            <button onClick={props.onShowModal}>Close</button>
            <button className={classes.orderBtn} onClick={orderBtnClickHandler}>
              Order
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
  const isSubmitingContent = (
    <Modal onShowModal={props.onShowModal}>
      <h3>sending order data...</h3> 
    </Modal>
  );
  const didSubmitContent = (
    <Modal onShowModal={props.onShowModal}>
      <h3 className={classes.success}>successfully sent the order! </h3>
      <button onClick={props.onShowModal} className={classes.successCloseBtn}>close</button>
    </Modal>
  );

  return (
    <>
      {isSubmiting && isSubmitingContent}
      {!isSubmiting && !didSubmit && modalContent}
      {didSubmit && didSubmitContent}
    </>
  );
};

export default Cart;
