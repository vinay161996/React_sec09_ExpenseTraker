import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Input from "../../ui/Input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import Loader from "../../ui/loader/Loader";
import { useContext } from "react";
import AuthContext from "../../store/authContext/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { isLoading, sendingReq } = useFetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA706bZGi69b2jKn0VDqQzCqahVxVnQdjc"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const reqConfig = {
        endPoint: "",
        method: "POST",
        body: {
          email,
          password,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const [receiveData] = await sendingReq([reqConfig]);
      if (receiveData.error) throw new Error(receiveData.error.message);
      login(receiveData);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
        <Row className="mw-25 shadow py-4 px-3 bg-white border border-primary border-opacity-25 rounded py-5 ">
          <h3 className="fw-normal text-center">Login</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              label="Email"
              id="email"
              error={errors?.email?.message}
              {...register("email", {
                required: "Required*",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address",
                },
              })}
            />
            <Input
              error={errors?.password?.message}
              type="password"
              label="Password"
              id="password"
              {...register("password", {
                required: "Required*",
                minLength: {
                  value: 8,
                  message: "Should be minimun of 8 characters",
                },
              })}
            />

            <Button
              type="submit"
              className="w-100 mt-4 py-2 text-white border-0 rounded-pill "
            >
              Login
            </Button>
            <Col className=" mt-2 d-flex align-items-center justify-content-center">
              <Button variant="link">Forget password</Button>
            </Col>
          </form>
        </Row>
        <Row className="my-4">
          <Button
            onClick={() => navigate("/auth")}
            variant="outline-primary"
            className="w-100"
          >
            Don`t have an account? SignUp
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default Login;
