import { Col, Container, Row } from "react-bootstrap";
import Expenses from "../../components/Expenses";
import ExpenseForm from "../../components/ExpenseForm";
import { useSelector } from "react-redux";
import Loader from "../../ui/loader/Loader";

const Expense = () => {
  const { isLoading, error, isPremiumActivated, isPremium } = useSelector(
    (state) => state.expenses
  );
  const isDark = useSelector((state) => state.theme.isDark);

  const classesDark =
    isPremium && isPremiumActivated && isDark ? "text-black" : "";

  return (
    <>
      {isLoading && !error && <Loader />}
      {!isLoading && error && alert(error)}
      <Container>
        <Row style={{ maxWidth: "600px" }}>
          <ExpenseForm classesDark={classesDark} />
        </Row>
        <Row className={`my-4 ${classesDark} bg-dark-subtle rounded`}>
          <Col className="text-center fs-4 py-1">Yours Expenses</Col>
        </Row>
        <Expenses classesDark={classesDark} />
      </Container>
    </>
  );
};

export default Expense;
