import { createContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../ui/loader/Loader";

const ExpenseContext = createContext({
  expense: [],
  toUpdateExpense: {},
  addExpense: () => {},
  removeExpense: () => {},
});

export const ExpenseContextProvider = ({ children }) => {
  const [expense, setExpense] = useState([]);
  const { isLoading, sendingReq } = useFetch();

  const handleAddExpenses = async (data) => {
    try {
      const { amount, description, category } = data;
      const userExpense = { amount, description, category };
      const email = JSON.parse(localStorage.getItem("email"));
      const reqConfig = {
        endPoint: `https://expense-tracker-17b5f-default-rtdb.firebaseio.com/${email}.json`,
        method: "POST",
        body: userExpense,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const [receiveData] = await sendingReq([reqConfig]);
      const expenseId = receiveData.name;
      const updatedUserExpense = { id: expenseId, ...data };

      setExpense((prev) => [...prev, updatedUserExpense]);
    } catch (error) {
      alert("Failed to add expense");
    }
  };

  const handleRemoveExpenses = (data) => {
    console.log(data);
  };

  useEffect(() => {
    try {
      const getuserExpense = async () => {
        const email = JSON.parse(localStorage.getItem("email"));
        const reqConfig = {
          endPoint: `https://expense-tracker-17b5f-default-rtdb.firebaseio.com/${email}.json`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const [receiveData] = await sendingReq([reqConfig]);

        const fetchExpense = [];
        for (const key in receiveData) {
          const expense = {
            id: key,
            ...receiveData[key],
          };
          fetchExpense.push(expense);
        }
        setExpense(fetchExpense);
      };
      getuserExpense();
    } catch (err) {
      alert("Failed to fetch");
    }
  }, [sendingReq]);

  const expenseCtx = {
    expense,
    addExpense: handleAddExpenses,
    removeExpense: handleRemoveExpenses,
  };
  return (
    <ExpenseContext.Provider value={expenseCtx}>
      {isLoading && <Loader />}
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
