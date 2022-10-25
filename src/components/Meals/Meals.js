import React, { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import classes from "./Meals.module.css";
import AvailMeals from "./AvailMeals";
import Card from "../UI/Card";

const Meals = () => {
  return (
    <Fragment>
      <div className={classes.MealsSummary}>
        <MealsSummary />
      </div>
      <AvailMeals />
    </Fragment>
  );
};

export default Meals;
