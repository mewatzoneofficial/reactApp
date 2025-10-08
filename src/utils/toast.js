import Swal from "sweetalert2";

export const showSuccess = (title = "Operation completed successfully.") => {
  return Swal.fire({
    title,
    icon: "success",
    position: "top-end",
    showConfirmButton: false,
    confirmButtonColor: "#198754",
    timerProgressBar: true,
    timer: 2000,
  });
};

export const showError = (title = "Something went wrong.") => {
  return Swal.fire({
    title,
    icon: "error",
    position: "top-end",
    showConfirmButton: false,
    confirmButtonColor: "#d33",
    timer: 2000,
  });
};

export const showToast = (title, icon = "success", duration = 2000, position = "top-end") => {
  return Swal.fire({
    title,
    icon,
    toast: true,
    position,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });
};