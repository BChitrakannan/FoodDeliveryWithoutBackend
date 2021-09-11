import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import style from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://react-http-9cc8d-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        console.log("Something " + response.ok);
        throw new Error("Something went wrong...");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    getItems().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={style.mealsLoading}>
        <p>Loading the meals.....</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={style.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const MealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));
  return (
    <section className={style.meals}>
      <Card>
        <ul>{MealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
