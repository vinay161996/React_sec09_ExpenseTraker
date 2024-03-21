import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../ui/loader/Loader";

const Home = () => {
  const isLoading = useSelector((store) => store.expenses.isLoading);
  const error = useSelector((store) => store.expenses.error);
  return (
    <>
      {isLoading && !error && <Loader />}
      {!!error && alert(error)}
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
            <NavLink to="/updateProfile" style={{ cursor: "pointer" }}>
              Complete now
            </NavLink>
          </Col>
        </Row>
        <Row>
          <Col className="mt-2 rounded">
            <img className="rounded" src="Img/Expense.jpg" alt="Expenses" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
