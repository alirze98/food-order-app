import React, { useContext, useRef } from "react";
import CartContext from "../../../store/CartContext";
import classes from "./MealsItem.module.css";
const MealsItem = (props) => {
  const cartCtx = useContext(CartContext);
  const amountRef = useRef();

  const addItemHandler = () => {
    cartCtx.addItem({
      mealName: props.mealsName,
      amount: amountRef.current.value,
      price:props.mealsPrice,
      id:props.mealsId
    });
  };

  return (
    <li className={classes.mealsItem}>
      <div className={classes.rightSide}>
        <div className={classes.title}>{props.mealsName}</div>
        <div className={classes.desc}>{props.mealsDesc}</div>
        <div className={classes.amount}>{props.mealsPrice}</div>
      </div>
      <div className={classes.leftSide}>
        <div className={classes.amountInput}>
          <div>Amount</div>
          <input type="number" min="1" max="5" ref={amountRef} />
        </div>
        <button onClick={addItemHandler}>+ Add</button>
      </div>
    </li>
  );
};

export default MealsItem;
