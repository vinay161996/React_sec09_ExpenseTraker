import { cartActions } from "../reducer/cartSlice";
import { uiActions } from "../reducer/uiSlice";

export const fetchingCartData = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://reduxtoolkit-2f709-default-rtdb.firebaseio.com/cart.json"
      );
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      dispatch(
        cartActions.replaceCartData({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.notification({
          status: "error",
          message: "Fetching cart data Failed",
        })
      );
    }
  };
};

export const sendingCartData = (cart) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://reduxtoolkit-2f709-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!res.ok) {
        throw new Error();
      }
      dispatch(
        uiActions.notification({
          status: "success",
          message: "Sending cart data Successfully",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.notification({
          status: "error",
          message: "Sending cart data Failed",
        })
      );
    }
  };
};
