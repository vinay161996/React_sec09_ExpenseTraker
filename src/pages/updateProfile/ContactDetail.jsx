import { Container, Col, Row, Button } from "react-bootstrap";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import Loader from "../../ui/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ContactDetail = () => {
  const { isLoading, sendingReq } = useFetch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { fullName, profilePhoto } = data;
      const reqConfig = {
        endPoint:
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA706bZGi69b2jKn0VDqQzCqahVxVnQdjc",
        method: "POST",
        body: {
          idToken: token,
          displayName: fullName,
          photoUrl: profilePhoto,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
      await sendingReq([reqConfig]);
    } catch (err) {
      alert("Failed to update");
    }
  };

  const verifyEmail = async () => {
    try {
      const reqConfig = {
        endPoint:
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA706bZGi69b2jKn0VDqQzCqahVxVnQdjc",
        method: "POST",
        body: {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        },
      };
      const [receiveData] = await sendingReq([reqConfig]);
      if (receiveData.error) throw new Error("Email verification failed");
      alert("Check your email to verify");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const gettingProfile = async () => {
      const reqConfig = {
        endPoint:
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA706bZGi69b2jKn0VDqQzCqahVxVnQdjc",
        method: "POST",
        body: {
          idToken: token,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
      const [receiveData] = await sendingReq([reqConfig]);
      if (receiveData.errors) return;
      if (receiveData?.users?.length) {
        const { displayName, photoUrl } = receiveData.users[0];
        resetField("fullName", { defaultValue: displayName });
        resetField("profilePhoto", { defaultValue: photoUrl });
      }
    };
    gettingProfile();
  }, [resetField, sendingReq, token]);

  return (
    <>
      {isLoading && <Loader />}
      <Container className="vw-100">
        <Row className="fst-italic border-bottom py-3 align-content-center">
          <Col className=" fs-4 col-12 col-md-7 d-flex  align-items-center ">
            Winners never quit,Quitters never win.
          </Col>
        </Row>

        <Row
          className="d-flex justify-content-between mt-3"
          style={{ maxWidth: "600px" }}
        >
          <Col className="fs-5 ">Contact detail</Col>
          <Col className=" d-flex justify-content-end">
            <Button onClick={handleBackToHome} variant="outline-secondary">
              Back to home
            </Button>
          </Col>
        </Row>

        <Row style={{ maxWidth: "600px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              error={errors?.fullName?.message}
              label="Full name"
              id="fullName"
              type="text"
              {...register("fullName", {
                required: "Required*",
              })}
            />
            <Input
              error={errors?.profilePhoto?.message}
              label="Profile Photo URL"
              id="photoUrl"
              type="url"
              {...register("profilePhoto", {
                required: "Required*",
              })}
            />
            <Button className="mt-3" type="submit" variant="outline-secondary">
              Update
            </Button>

            <Button onClick={verifyEmail} className="mx-3 mt-3">
              Verify email
            </Button>
          </form>
        </Row>
      </Container>
    </>
  );
};

export default ContactDetail;
