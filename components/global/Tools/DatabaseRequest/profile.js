/* ============================= GET LOGGED IN USER PROFILE DETAILS ============================= */

const getMyProfileDetails = promise => {
  if (promise != false) {
    /* ------------------------------- RUN FUNCTION AS A PROMISE -------------------------------- */
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/profile/profile-details",
        success: data => {
          if (data.status === "failed") {
            reject(data.error);
          } else if (data.status === "success") {
            resolve(data.profileDetails);
          }
        }
      });
    });
  } else {
    /* ------------------------------- RUN FUNCTION SYNCHRONOUSLY ------------------------------- */
    let retrievedData;
    $.ajax({
      type: "POST",
      async: false,
      url: "/profile/profile-details",
      success: data => {
        retrievedData = data;
      }
    });
    return retrievedData;
  }
};
/* ============================================================================================== */
