import { AuthContextProvider } from "./authContext/AuthContext";
import { ExpenseContextProvider } from "./expenseContext/ExpenseContext";

const ContextProviders = ({ children }) => {
  return (
    <AuthContextProvider>
      <ExpenseContextProvider>{children}</ExpenseContextProvider>
    </AuthContextProvider>
  );
};

export default ContextProviders;
