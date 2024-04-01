import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import getEmailAndToken from "../features/getEmailAndToken";
import { fetchExpense, removeExpense } from "../store/actions/expense";
import { expenseActions } from "../store/reducers/expenseSlice";
import calTotalExpenseAmount from "../features/calTotalExpenseAmount";

const Expenses = ({ classesDark }) => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();

  const totalAmount = calTotalExpenseAmount(expenses);

  const deleteExpense = (data) => {
    dispatch(removeExpense(data.id));
  };
  const editExpense = (data) => {
    dispatch(expenseActions.editExpense(data));
    dispatch(removeExpense(data.id));
  };

  const downloadCsvFile = () => {
    const csvContent =
      "Description,Category,Amount\n" +
      expenses
        .map((item) => `${item.description},${item.category},${item.amount}`)
        .join("\n") +
      `\nTotalAmount,"",${totalAmount}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "expenses.csv");

    link.click();
  };

  useEffect(() => {
    const { email, token } = getEmailAndToken();
    if (!!email && !!token) {
      dispatch(fetchExpense());
    }
  }, [dispatch]);

  return (
    <>
      {!!expenses.length && (
        <Container
          className={`${classesDark} p-4 bg-success-subtle rounded`}
          style={{ maxWidth: "900px", margin: "0px auto 0px" }}
        >
          <Row className="py-3 fw-bold fst-italic align-items-center border-bottom border-dark">
            <Col>Description</Col>
            <Col>Category</Col>
            <Col>Amount</Col>
            <Col>Actions</Col>
          </Row>
          {expenses.map((item) => (
            <Row
              key={item.id}
              className="py-3  align-items-center border-bottom border-dark"
            >
              <Col>{item.description}</Col>
              <Col>{item.category}</Col>
              <Col>${item.amount}</Col>
              <Col>
                <Button onClick={() => editExpense(item)} className="mx-1">
                  Edit
                </Button>
                <Button onClick={() => deleteExpense(item)}>Delete</Button>
              </Col>
            </Row>
          ))}
          <Row className="mt-3">
            <Col className=" d-flex align-items-center fst-italic fw-bold">
              Total amount: ${totalAmount}
            </Col>
            <Col className="d-flex justify-content-end">
              <Button onClick={downloadCsvFile}>Download File</Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Expenses;
