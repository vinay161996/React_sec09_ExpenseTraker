function calTotalExpenseAmount(expenses) {
  let totalAmount = expenses.reduce((prev, item) => prev + +item.amount, 0);
  return totalAmount;
}
export default calTotalExpenseAmount;
