import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Input from "../../ui/Input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import Loader from "../../ui/loader/Loader";
import { useState } from "react";
import emailChanger from "../../features/emailChanger";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/reducers/authSlice";

const Login = () => {
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const navigate = useNavigate();
  const { isLoading, sendingReq } = useFetch();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = async (data) => {
    const { email, password } = data;
    const reqConfig = {
      endPoint:
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA706bZGi69b2jKn0VDqQzCqahVxVnQdjc",
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
    const { idToken } = receiveData;
    const updatedEmail = emailChanger(email);
    dispatch(authActions.login({ email: updatedEmail, token: idToken }));
  };

  const forgetPasswordHandler = async (data) => {
    try {
      const { email } = data;
      const reqConfig = {
        endPoint:
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA706bZGi69b2jKn0VDqQzCqahVxVnQdjc",
        method: "POST",
        body: {
          requestType: "PASSWORD_RESET",
          email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      await sendingReq([reqConfig]);
      alert("check your email to reset password");
    } catch (err) {
      throw new Error("Failed to reset password");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!isForgetPassword) await userLogin(data);
      else await forgetPasswordHandler(data);
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

            {!isForgetPassword && (
              <>
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
                  <Button
                    onClick={() => setIsForgetPassword((prev) => !prev)}
                    variant="link"
                  >
                    Forget password
                  </Button>
                </Col>
              </>
            )}
            {isForgetPassword && (
              <Button
                type="submit"
                className="w-100 mt-4 py-2 text-white border-0 rounded-pill "
              >
                Reset Password
              </Button>
            )}
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
