const loginId = "login";

const loginName = "Login";

const loginMethod = () => {
  addModal();
  modalPointer.insertAdjacentHTML("beforeend", loginModalHTML);
};

const loginObject = new ProfileDrawerObject(loginId, loginName, loginMethod);

// Create the Login Form HTML
const loginModalHTML =
  "<div id='modal_login_form_body'>" +
  "<form id='login_form' action='/users/login' method='POST' onsubmit=''>" +
  "<div id='username_field_body' class='input_field_body'>" +
  "<div id='username_field_title' class='input_field_title'>Username</div>" +
  "<input type='text' name='username' id='username_field' class='input_field'>" +
  "</div>" +
  "<div id='password_field_body' class='input_field_body'>" +
  "<div id='password_field_title' class='input_field_title'>Password</div>" +
  "<input type='password' name='password' id='password_field' class='input_field'>" +
  "</div>" +
  "<button>Login</button>" +
  "</form>" +
  "</div>";
