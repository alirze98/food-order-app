import React, { Fragment } from "react";
import CartButton from "../Cart/CartButton";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";

const Header = (props) => {
  return (
    <Fragment>
      <div className={classes.header}>
        <div className={classes.title}>FoodyMan</div>
        <div className={classes["cart-botton"]}>
          <CartButton onClick={props.onShowModal} />
        </div>
      </div>
      <div className={classes.mainImage}>
        <img src={mealsImage} />
      </div>
    </Fragment>
  );
};

export default Header;
