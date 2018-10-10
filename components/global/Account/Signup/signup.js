const signupId = "signup";

// Create the Signup Form HTML
const signupModalHTML =
  "<div id='modal_signup_form_body' class='modal_account_form_body'>" +
  "<form id='modal_signup_form' class='modal_account_form' action='/users/signup' method='POST' onsubmit=''>" +
  "<div id='modal_signup_username_field_body' class='modal_signup_input_field_body modal_account_input_field_body'>" +
  "<div id='modal_signup_username_field_title' class='modal_signup_input_field_title modal_account_input_field_title'>Username</div>" +
  "<input type='text' name='username' id='modal_signup_username_field' class='modal_signup_input_field modal_account_input_field'>" +
  "</div>" +
  "<div id='modal_signup_email_field_body' class='modal_signup_input_field_body modal_account_input_field_body'>" +
  "<div id='modal_signup_email_field_title' class='modal_signup_input_field_title modal_account_input_field_title'>Email</div>" +
  "<input type='email' name='email' id='modal_signup_email_field' class='modal_signup_input_field modal_account_input_field'>" +
  "</div>" +
  "<div id='modal_signup_password_field_body' class='modal_signup_input_field_body modal_account_input_field_body'>" +
  "<div id='modal_signup_password_field_title' class='modal_signup_input_field_title modal_account_input_field_title'>Password</div>" +
  "<input type='password' name='password' id='modal_signup_password_field' class='modal_signup_input_field modal_account_input_field'>" +
  "</div>" +
  "<div id='modal_signup_confirm_password_field_body' class='modal_signup_input_field_body modal_account_input_field_body'>" +
  "<div id='modal_signup_confirm_password_field_title' class='modal_signup_input_field_title modal_account_input_field_title'>Confirm Password</div>" +
  "<input type='password' name='confirm_password' id='modal_signup_confirm_password_field' class='modal_signup_input_field modal_account_input_field'>" +
  "</div>" +
  "<button class='form_submit_button'>Signup</button>" +
  "</form>" +
  "<div id='modal_signup_login_statement_body' class='modal_account_statement_body'>" +
  "<div id='modal_signup_login_statement_text_one' class='modal_signup_login_statement_text modal_account_statement_text'>Login</div>" +
  "<div id='modal_signup_login_statement_text_two' class='modal_signup_login_statement_text modal_account_statement_text'>if you are already a member</div>" +
  "</div>" +
  "</div>";

// Create a Signup Modal
const constructSignupModal = () => {
  addModal(signupId);
  modalPointer.insertAdjacentHTML("beforeend", signupModalHTML);
  document
    .querySelector("#modal_signup_login_statement_text_one")
    .addEventListener("click", () => {
      constructLoginModal();
    });
};
