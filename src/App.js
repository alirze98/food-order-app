import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Modal from "./components/UI/Modal";
import Cart from "./components/Cart/Cart";
import { CartContextProvider } from "./store/CartContext";
function App() {
  const [showModal,setShowModal] = useState(false)
  const showModalHandler = ()=>{
    setShowModal(!showModal)
  }
  return (
    <CartContextProvider>
      <Header onShowModal={showModalHandler} />
      <Meals />
      {showModal && <Cart onShowModal={showModalHandler}  />}
    </CartContextProvider>
  );
}

export default App;
