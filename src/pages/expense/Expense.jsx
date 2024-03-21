import { Col, Container, Row } from "react-bootstrap";
import Expenses from "../../components/Expenses";
import ExpenseForm from "../../components/ExpenseForm";
import { useSelector } from "react-redux";
import Loader from "../../ui/loader/Loader";

const Expense = () => {
  const isLoading = useSelector((state) => state.expenses.isLoading);
  const error = useSelector((state) => state.expenses.error);
  return (
    <>
      {isLoading && !error && <Loader />}
      {!isLoading && error && alert(error)}
      <Container>
        <Row style={{ maxWidth: "600px" }}>
          <ExpenseForm />
        </Row>
        <Row className="my-4 bg-dark-subtle rounded">
          <Col className="text-center fs-4 py-1">Yours Expenses</Col>
        </Row>
        <Expenses />
      </Container>
    </>
  );
};

export default Expense;
