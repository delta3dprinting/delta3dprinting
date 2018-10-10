const logoutId = "logout";

const logoutName = "<a id='logout_button' href='/users/logout'>Logout</a>";

const logoutMethod = () => {
  console.log("Logout");
};

const logoutObject = new ProfileDrawerObject(
  logoutId,
  logoutName,
  logoutMethod
);
