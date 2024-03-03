import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import Expenses from "../components/Expenses";

const Home = () => {
  return (
    <>
      <Container className="p-3 fst-italic vh-100 vw-100">
        <Row className="border-bottom py-3">
          <Col className="col-12 col-md-8 fs-4 d-flex align-items-center">
            Welcome to expense tracker
          </Col>
          <Col
            className="p-1 text-center  col-7 col-md-4 rounded "
            style={{ backgroundColor: "#dabdc2" }}
          >
            your profile is incomplete.
            <NavLink to="/contactDetail" style={{ cursor: "pointer" }}>
              Complete now
            </NavLink>
          </Col>
        </Row>

        <ExpenseForm />

        <Row className="my-4 bg-dark-subtle rounded">
          <Col className="text-center fs-4 py-1">Yours Expenses</Col>
        </Row>
        <Expenses />
      </Container>
    </>
  );
};

export default Home;
