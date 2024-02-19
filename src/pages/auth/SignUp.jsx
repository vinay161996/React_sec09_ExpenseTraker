import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Input from "../../ui/Input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import Loader from "../../ui/loader/Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoading, sendingReq } = useFetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA706bZGi69b2jKn0VDqQzCqahVxVnQdjc"
  );
  const {
    register,
    handleSubmit,
    getValues,
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
      navigate("/auth/login");
    } catch (error) {
      const message = error.message ? error.message : "Failed to signUp";
      alert(message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
        <Row className="mw-25 shadow py-4 px-3 bg-white border border-primary border-opacity-25 rounded py-5 ">
          <h3 className="fw-normal text-center">SignUp</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              label="Email"
              error={errors?.email?.message}
              id="email"
              {...register("email", {
                required: "Required*",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address",
                },
              })}
            />
            <Input
              type="password"
              label="Password"
              id="password"
              error={errors?.password?.message}
              {...register("password", {
                required: "Required*",
                minLength: {
                  value: 8,
                  message: "Should be minimun of 8 characters",
                },
              })}
            />
            <Input
              type="password"
              label="Confirm Password"
              id="confirmPassword"
              error={errors?.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Required*",
                validate: (value) =>
                  value === getValues().password || "Password need to match",
              })}
            />
            <Button
              type="submit"
              className="w-100 mt-4 py-2 text-white border-0 rounded-pill "
            >
              SignUp
            </Button>
          </form>
        </Row>
        <Row className="my-4">
          <Button
            onClick={() => navigate("/auth/login")}
            variant="outline-primary"
            className="w-100"
          >
            Have an account? Login
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
