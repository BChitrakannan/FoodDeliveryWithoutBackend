import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import style from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const [isFormValid, setIsFormValid] = useState(true);
  const amountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredQuantity = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredQuantity < 1 ||
      enteredQuantity > 5
    ) {
      setIsFormValid(false);
      return;
    }
    props.onAddToCart(enteredQuantity);
  };
  return (
    <form className={style.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount _" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button>+ Add</button>
      {!isFormValid && <p>Enter a valid Quantity (1 to 5)</p>}
    </form>
  );
};

export default MealItemForm;
