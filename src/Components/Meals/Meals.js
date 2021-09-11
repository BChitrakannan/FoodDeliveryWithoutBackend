import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealSummary";

const Meals = () => {
  return (
    <>
      <MealsSummary></MealsSummary>
      <AvailableMeals></AvailableMeals>
    </>
  );
};

export default Meals;
