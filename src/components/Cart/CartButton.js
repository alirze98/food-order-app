import React,{useEffect,useContext, useState} from 'react';
import CartIcon from './CartIcon';
import classes from './CartButton.module.css'
import CartContext from '../../store/CartContext';

const CartButton = (props) => {
    const [active,setActive] = useState(false)
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.cartItems.reduce((acc,cur)=>{
      return +cur.amount + acc;
    },0)
    const {cartItems} = cartCtx;
    useEffect(()=>{
        if(cartItems.length === 0 ){
            return
        }
      setActive(true)
      setTimeout(() => {
        setActive(false)
      }, 300);
    },[cartItems])
   
    return (
        <button className={`${classes.button} ${active?classes.bump:''}`} onClick={props.onClick}>
            <span className={classes.cartButtonIcon}><CartIcon /></span>
            <span className={classes.cartButtonTitle}>your Cart</span>
            <span className={classes.cartButtonBadge}>{numberOfCartItems}</span>
        </button>
    );
};

export default CartButton;