import React, { useContext } from "react";
import CartContext from "../../store/CartContext";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);
  const incBtnClickHandler = () => {
    cartCtx.plusAmountHandler(props.id);
  };
  const decBtnClickHandler = () => {
    cartCtx.minusAmountHandler(props.id);
  };
  return (
    <div className={classes.CartItem}>
      <div className={classes.leftSide}>
        <h2>{props.name}</h2>
        <div className={classes.numbers}>
          <div className={classes.price}>{props.price}</div>
          <div className={classes.amount}>x {props.amount}</div>
        </div>
      </div>
      <div className={classes.rightSide}>
        <button
          className={`${classes.btn} ${classes.firstBtn}`}
          onClick={decBtnClickHandler}
        >
          -
        </button>
        <button
          className={`${classes.btn} ${classes.secondtBtn}`}
          onClick={incBtnClickHandler}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
