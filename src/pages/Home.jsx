import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Container className="p-3  fst-italic">
        <Row>
          <Col className="col-12 col-md-8 ">Welcome to expense tracker</Col>
          <Col
            className=" p-1 text-center  col-7 col-md-4 rounded "
            style={{ backgroundColor: "#dabdc2" }}
          >
            your profile is incomplete.
            <NavLink to="/contactDetail" style={{ cursor: "pointer" }}>
              Complete now
            </NavLink>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
