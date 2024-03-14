import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import getEmailAndToken from "../features/getEmailAndToken";
import { fetchExpense, removeExpense } from "../store/actions/expense";
import { expenseActions } from "../store/reducers/expenseSlice";

const Expenses = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();

  const deleteExpense = (data) => {
    dispatch(removeExpense(data.id));
  };
  const editExpense = (data) => {
    dispatch(expenseActions.editExpense(data));
    dispatch(removeExpense(data.id));
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
          className="p-4 bg-success-subtle rounded"
          style={{ maxWidth: "900px", margin: "0px auto 0px" }}
        >
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
        </Container>
      )}
    </>
  );
};

export default Expenses;
