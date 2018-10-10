const loginId = "login";

// Create the Login Form HTML
const loginModalHTML =
  "<div id='modal_login_form_body' class='modal_account_form_body'>" +
  "<form id='modal_login_form' class='modal_account_form' action='/users/login' method='POST' onsubmit=''>" +
  "<div id='modal_login_email_field_body' class='modal_login_input_field_body modal_account_input_field_body'>" +
  "<div id='modal_login_email_field_title' class='modal_login_input_field_title modal_account_input_field_title'>Email</div>" +
  "<input type='email' name='email' id='modal_login_email_field' class='modal_login_input_field modal_account_input_field'>" +
  "</div>" +
  "<div id='modal_login_password_field_body' class='modal_login_input_field_body modal_account_input_field_body'>" +
  "<div id='modal_login_password_field_title' class='modal_login_input_field_title modal_account_input_field_title'>Password</div>" +
  "<input type='password' name='password' id='modal_login_password_field' class='modal_login_input_field modal_account_input_field'>" +
  "</div>" +
  "<button class='form_submit_button'>Login</button>" +
  "</form>" +
  "<div id='modal_login_signup_statement_body' class='modal_account_statement_body'>" +
  "<div id='modal_login_signup_statement_text_one' class='modal_login_signup_statement_text modal_account_statement_text'>Signup</div>" +
  "<div id='modal_login_signup_statement_text_two' class='modal_login_signup_statement_text modal_account_statement_text'>if you are new</div>" +
  "</div>" +
  "</div>";

// Create a Login Modal
const constructLoginModal = () => {
  addModal(loginId);
  modalPointer.insertAdjacentHTML("beforeend", loginModalHTML);
  document
    .querySelector("#modal_login_signup_statement_text_one")
    .addEventListener("click", () => {
      constructSignupModal();
    });
};
