import calTotalExpenseAmount from "../../features/calTotalExpenseAmount";
import getEmailAndToken from "../../features/getEmailAndToken";
import { expenseActions } from "../reducers/expenseSlice";

const BASE_URL = "https://expense-tracker-17b5f-default-rtdb.firebaseio.com";

export const fetchExpense = () => {
  return async (dispatch) => {
    try {
      dispatch(expenseActions.setIsLoading(true));
      dispatch(expenseActions.setError(null));
      const { email } = getEmailAndToken();
      const res = await fetch(`${BASE_URL}/${email}.json`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      const expense = [];
      let totalAmount = 0;
      for (let key in data) {
        totalAmount += +data[key].amount;
        expense.push({ ...data[key], id: key });
      }
      if (totalAmount >= 1000) dispatch(expenseActions.setIsPremium(true));

      dispatch(expenseActions.addingExpense(expense));
    } catch (e) {
      dispatch(expenseActions.setError("Failed to fetch expenses"));
    } finally {
      dispatch(expenseActions.setIsLoading(false));
    }
  };
};

export const addExpense = (item) => {
  return async (dispatch, getstate) => {
    try {
      dispatch(expenseActions.setIsLoading(true));
      dispatch(expenseActions.setError(null));
      const { email } = getEmailAndToken();
      const resConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };
      const res = await fetch(`${BASE_URL}/${email}.json`, resConfig);
      if (!res.ok) throw new Error();
      const data = await res.json();
      const newExpenses = [...getstate().expenses.expenses];
      const expenseToAdd = { id: data.name, ...item };
      newExpenses.push(expenseToAdd);
      const totalAmount = calTotalExpenseAmount(newExpenses);
      if (totalAmount >= 1000 && !getstate().expenses.isPremium)
        dispatch(expenseActions.setIsPremium(true));
      dispatch(expenseActions.addingExpense(newExpenses));
    } catch (e) {
      dispatch(expenseActions.setError("Failed to add expenses"));
      dispatch(expenseActions.setIsLoading(false));
    } finally {
      dispatch(expenseActions.setIsLoading(false));
    }
  };
};

export const removeExpense = (id) => {
  return async (dispatch, getstate) => {
    try {
      dispatch(expenseActions.setIsLoading(true));
      dispatch(expenseActions.setError(null));
      const { email } = getEmailAndToken();
      const resConfig = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(`${BASE_URL}/${email}/${id}.json`, resConfig);
      if (!res.ok) throw new Error();

      const currentItemAmount = getstate().expenses.expenses.filter(
        (item) => item.id === id
      )[0].amount;
      const totalAmount = calTotalExpenseAmount(getstate().expenses.expenses);
      const currentTotalAmount = totalAmount - currentItemAmount;

      if (currentTotalAmount < 1000 && getstate().expenses.isPremium) {
        dispatch(expenseActions.setIsPremium(false));
      }
      dispatch(expenseActions.removingExpense(id));
    } catch (e) {
      dispatch(expenseActions.setError("Failed to remove expense"));
    } finally {
      dispatch(expenseActions.setIsLoading(false));
    }
  };
};
