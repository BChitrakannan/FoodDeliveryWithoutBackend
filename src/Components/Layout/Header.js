import React from "react";
import mealImage from "../../Assets/meals.jpeg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShow}>Cart</HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealImage} alt="Delicious Food"></img>
      </div>
    </>
  );
};

export default Header;
