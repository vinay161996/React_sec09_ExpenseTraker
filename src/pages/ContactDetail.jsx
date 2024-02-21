import { Container, Col, Row, Button } from "react-bootstrap";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import AuthContext from "../store/authContext/AuthContext";
import Loader from "../ui/loader/Loader";

const ContactDetail = () => {
  const { isLoading, sendingReq } = useFetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA706bZGi69b2jKn0VDqQzCqahVxVnQdjc"
  );
  const { token } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { fullName, profilePhoto } = data;
      const reqConfig = {
        endPoint: "",
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
      const [receiveData] = await sendingReq([reqConfig]);

      reset();
    } catch (err) {
      alert("Failed to update");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container className="vh-100 vw-100">
        <Row className="fst-italic border-bottom py-3 align-content-center">
          <Col className=" fs-4 col-12 col-md-8 d-flex  align-items-center ">
            Winners never quit,Quitters never win.
          </Col>
          <Col
            className=" p-1 text-center  col-7 col-md-4 rounded "
            style={{ backgroundColor: "#dabdc2" }}
          >
            your profile is 64% complete.A complete profile has higher chances
            of landing a job.
          </Col>
        </Row>

        <Row
          className="d-flex justify-content-between mt-3"
          style={{ maxWidth: "600px" }}
        >
          <Col className="fs-5 ">Contact detail</Col>
          <Col className=" d-flex justify-content-end">
            <Button variant="outline-danger">cancel</Button>
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
          </form>
        </Row>
      </Container>
    </>
  );
};

export default ContactDetail;
