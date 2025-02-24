import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ShowNotification = (type, message) => {
  switch (type) {
    case "error":
      return toast.error(message.message ? message.message : message);
    case "success":
      return toast.success(message.message ? message.message : message);
    case "warning":
      return toast.warning(message.message ? message.message : message);
    case "push":
      return toast.info(message.message ? message.message : message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        limit : 3,
        newestOnTop : true
      });
    default:
      return toast.error(message.message ? message.message : message);
  }
};