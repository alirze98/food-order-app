import { useRef, useState } from "react";
import classes from "./CheckOut.module.css";
const inputValidator = (value) => value.trim() !== "";
const postalInputValidator = (value) => ! value.trim().length < 5;
const CheckOut = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const submitionHandler = (e) => {
    e.preventDefault();
    const nameInputValue = nameRef.current.value;
    const streetInputValue = streetRef.current.value;
    const postalInputValue = postalRef.current.value;
    const cityInputValue = cityRef.current.value;

    const nameInputIsValid = inputValidator(nameInputValue);
    const streetInputIsValid = inputValidator(streetInputValue);
    const postalInputIsValid = postalInputValidator(postalInputValue);
    const cityInputIsValid = inputValidator(cityInputValue);

    setFormInputsValidity({
      name: nameInputIsValid,
      street: streetInputIsValid,
      postal: postalInputIsValid,
      city: cityInputIsValid,
    });

    const formIsValid =
      nameInputIsValid &&
      streetInputIsValid &&
      postalInputIsValid &&
      cityInputIsValid;
      if(!formIsValid){
        return 
      }
     props.onConfirm({
        name:nameInputValue,
        street:streetInputValue,
        postalCode:postalInputValue,
        city:cityInputValue,
     })
  };
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputsValidity.postal ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={submitionHandler}>
      <div>
        <div className={nameControlClasses}>
          <label htmlFor="name">Your Name</label>
          <input id="name" type="text" ref={nameRef}></input>
          {!formInputsValidity.name && <p>Please enter a valid name</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input id="street" type="text" ref={streetRef}></input>
          {!formInputsValidity.street && <p>Please enter a valid street</p>}
        </div>
        <div className={postalControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input id="postal" type="text" ref={postalRef}></input>
          {!formInputsValidity.postal && (
            <p>Please enter a valid postal code (5 characters long)!</p>
          )}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input id="city" type="text" ref={cityRef}></input>
          {!formInputsValidity.city && <p>Please enter a valid cityname</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" className={classes.action}>
            Cancel
          </button>
          <button className={classes.action}>Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default CheckOut;
