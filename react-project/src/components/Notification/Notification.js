import { useSelector } from "react-redux";
import "./Notification.scss";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const status = useSelector((state) => state.notification.status);

  let myClass = status === "Error" ? "error" : "success";
  myClass += " notification";

  return <div className={myClass}>{message}</div>;
};

export default Notification;
