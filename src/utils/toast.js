// import { toast } from "react-toastify";

// export const showSuccess = (message) => {
//   toast.success(message, {
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: true,
//   });
// };

// export const showError = (message) => {
//   toast.error(message, {
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: true,
//   });
// };

// export const showInfo = (message) => {
//   toast.info(message, {
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: true,
//   });
// };


// utils/alert.js
import Swal from "sweetalert2";

export const showSuccess = (title = "Success", text = "Operation completed successfully.") => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#198754",
  });
};

export const showError = (title = "Error", text = "Something went wrong.") => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "Try Again",
    confirmButtonColor: "#d33",
  });
};
