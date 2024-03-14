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
      for (let key in data) {
        expense.push({ ...data[key], id: key });
      }
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
  return async (dispatch) => {
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
      dispatch(expenseActions.removingExpense(id));
    } catch (e) {
      dispatch(expenseActions.setError("Failed to remove expense"));
    } finally {
      dispatch(expenseActions.setIsLoading(false));
    }
  };
};
