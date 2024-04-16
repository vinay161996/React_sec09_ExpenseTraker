import { uiActions } from "../../store/reducer/uiSlice";
import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
const CartButton = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleVisibility = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button onClick={toggleVisibility} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
