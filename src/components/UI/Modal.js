import React from "react";
import MealsItem from "../Meals/MealsItem/MealsItem";
import classes from "./Modal.module.css";

const Modal = (props) => {

  return (
    <>
      <div className={classes.overlay} onClick={props.onShowModal}></div>
      <div className={classes.Modal}>
        {props.children}
      </div>
    </>
  );
};

export default Modal;
