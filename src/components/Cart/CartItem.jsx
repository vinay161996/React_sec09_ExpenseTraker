import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/reducer/cartSlice";

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props;
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(cartActions.removeFromCart(id));
  };
  const handleAddToCart = () => {
    dispatch(cartActions.addToCart({ id, title, price }));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemoveFromCart}>-</button>
          <button onClick={handleAddToCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
