import ReactDOM from "react-dom";
import classes from "./Loader.module.css";

const Backdrop = (props) => {
  return <div {...props} className={classes.backdrop}></div>;
};

const Overlay = () => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>Loading...</div>
    </div>
  );
};

const element = document.querySelector("#loader");
const Loader = () => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, element)}
      {ReactDOM.createPortal(<Overlay />, element)}
    </>
  );
};

export default Loader;
