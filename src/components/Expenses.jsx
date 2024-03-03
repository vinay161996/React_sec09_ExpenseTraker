import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ExpenseContext from "../store/expenseContext/ExpenseContext";

const Expenses = () => {
  const { expense } = useContext(ExpenseContext);
  return (
    <>
      {!!expense.length && (
        <Container
          className="p-4 bg-success-subtle rounded"
          style={{ maxWidth: "900px", margin: "0px auto 0px" }}
        >
          {expense.map((item) => (
            <Row
              key={item.id}
              className="py-3  align-items-center border-bottom border-dark"
            >
              <Col>{item.description}</Col>
              <Col>{item.category}</Col>
              <Col>${item.amount}</Col>
              <Col>
                <Button className="mx-1">Edit</Button>
                <Button>Delete</Button>
              </Col>
            </Row>
          ))}
        </Container>
      )}
    </>
  );
};

export default Expenses;
