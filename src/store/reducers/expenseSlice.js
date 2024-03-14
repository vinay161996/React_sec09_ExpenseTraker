import { createSlice } from "@reduxjs/toolkit";

const expenseInitialState = {
  isLoading: false,
  expenses: [],
  updatingExpense: {},
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: expenseInitialState,
  reducers: {
    addingExpense(state, action) {
      state.expenses = action.payload;
    },
    removingExpense(state, action) {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload
      );
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    editExpense(state, action) {
      state.updatingExpense = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
