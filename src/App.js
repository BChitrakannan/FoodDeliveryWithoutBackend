import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart.js";
import React, { useState } from "react";
import CartContextProvider from "./Store/CartContextProvider";
function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartHandler = () => {
    setIsCartShown(true);
  };

  const hideCartHandler = () => {
    setIsCartShown(false);
  };

  return (
    <CartContextProvider>
      {isCartShown && <Cart onClose={hideCartHandler}></Cart>}
      <Header onShow={showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartContextProvider>
  );
}

export default App;
