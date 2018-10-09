const signupId = "signup";
const signupName = "Signup";
const signupMethod = () => {
  addModal(signupId);
  modalPointer.insertAdjacentHTML("beforeend", signupModalHTML);
};

const signupObject = new ProfileDrawerObject(
  signupId,
  signupName,
  signupMethod
);

// Create the Signup Form HTML
const signupModalHTML =
  "<div id='modal_signup_form_body'>" +
  "<form id='signup_form' action='/users/signup' method='POST' onsubmit=''>" +
  "<div id='username_field_body' class='input_field_body'>" +
  "<div id='username_field_title' class='input_field_title'>Username</div>" +
  "<input type='text' name='username' id='username_field' class='input_field'>" +
  "</div>" +
  "<div id='email_field_body' class='input_field_body'>" +
  "<div id='email_field_title' class='input_field_title'>Email</div>" +
  "<input type='email' name='email' id='email_field' class='input_field'>" +
  "</div>" +
  "<div id='password_field_body' class='input_field_body'>" +
  "<div id='password_field_title' class='input_field_title'>Password</div>" +
  "<input type='password' name='password' id='password_field' class='input_field'>" +
  "</div>" +
  "<div id='confirm_password_field_body' class='input_field_body'>" +
  "<div id='confirm_password_field_title' class='input_field_title'>Confirm Password</div>" +
  "<input type='password' name='confirm_password' id='confirm_password_field' class='input_field'>" +
  "</div>" +
  "<button>Signup</button>" +
  "</form>" +
  "</div>";
