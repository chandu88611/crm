import Swal from "sweetalert2";

export default function swAlert() {

  return Swal.fire({
    title: "Something went wrong",
    text: "Please contact development team or try again later.",
    icon: "info",
    showCancelButton: !1,
    confirmButtonText: "Ok",
    confirmButtonColor: "btn btn-info  w-xs me-2 mt-2",
    buttonsStyling: 1,
    showCloseButton: !0,
    focusCancel: true,
  });

}

export function successAlert(successMsg) {

  return Swal.fire({
    title: "Success",
    text: successMsg,
    icon: "success",
    showCancelButton: !1,
    confirmButtonText: "Ok",
    confirmButtonColor: "btn btn-info w-xs me-2 mt-2",
    buttonsStyling: 1, 
    focusCancel: true,
  });

}

export function successAlertReload(successMsg) {

  return Swal.fire({
    title: "Success",
    text: successMsg,
    icon: "success",
    showCancelButton: !1,
    confirmButtonText: "Ok",
    confirmButtonColor: "btn btn-info  w-xs me-2 mt-2",
    buttonsStyling: 1,
    focusCancel: true,
    showCloseButton: !0,
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirect to the desired location
      window.location.reload();
    }
  });

}

export function successRedirect(successmessage) {

  return Swal.fire({
    title: "Success",
    text: successmessage,
    icon: "success",
    showCancelButton: !1,
    confirmButtonText: "Ok",
    confirmButtonColor: "btn btn-info  w-xs me-2 mt-2",
    buttonsStyling: 1,
    showCloseButton: !0,
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirect to the desired location
      window.location.href = "/signin";
    }
  });

}

export function errorRedirect(errormessage) {

  return Swal.fire({
    title: "Error",
    text: errormessage,
    icon: "danger",
    showCancelButton: !1,
    confirmButtonText: "Ok",
    confirmButtonColor: "btn btn-info  w-xs me-2 mt-2",
    buttonsStyling: 1,
    showCloseButton: !0,
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirect to the desired location
      window.location.href = "/forgot-password";
    }
  });
  
}
