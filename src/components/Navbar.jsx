import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../store/reducers/authSlice";
import { expenseActions } from "../store/reducers/expenseSlice";
import { themeActions } from "../store/reducers/themeSlice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isPremiumActivated = useSelector(
    (state) => state.expenses.isPremiumActivated
  );
  const isPremium = useSelector((state) => state.expenses.isPremium);
  const isDark = useSelector((state) => state.theme.isDark);

  const userLogout = () => {
    dispatch(authActions.logout());
    navigate("/auth/login");
  };

  const toggleActivatePremium = () => {
    dispatch(expenseActions.setIsPremiumActivated());
  };

  const toggleDark = () => {
    dispatch(themeActions.toggle());
  };

  const activatePremiumButton = isPremiumActivated ? (
    <Button className="mx-2" onClick={toggleActivatePremium}>
      Deactivate Premium
    </Button>
  ) : (
    <Button className="mx-2" onClick={toggleActivatePremium}>
      Activate Premium
    </Button>
  );

  return (
    <Navbar sticky="top" bg="dark" data-bs-theme="dark">
      <Container>
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
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button onClick={userLogout}>Logout</Button>
          </Navbar.Text>
          <Navbar.Text>
            {isPremium && activatePremiumButton}
            {isPremium && isPremiumActivated && (
              <Button onClick={toggleDark}>
                {isDark ? "Light Mode" : "Dark Mode"}
              </Button>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
