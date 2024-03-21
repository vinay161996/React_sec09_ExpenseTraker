import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../store/reducers/authSlice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogout = () => {
    dispatch(authActions.logout());
    navigate("/auth/login");
  };
  return (
    <Navbar sticky="top" bg="dark" data-bs-theme="dark">
      <Container>
        {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
        <Nav className="me-auto">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
            style={{ cursor: "pointer" }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
            style={{
              cursor: "pointer",
            }}
            to="/expense"
          >
            Expenses
          </NavLink>
          {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button onClick={userLogout}>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
