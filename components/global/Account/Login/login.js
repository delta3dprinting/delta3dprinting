const loginId = "login";

// Modal Header
const loginModalHeader = "Login";
// Create the Login Form HTML
const loginModalHTML =
  "<div id='modal_login_form_body' class='modal_account_form_body'>" +
  "<form id='modal_login_form' class='modal_account_form' action='/users/login' method='POST' onsubmit=''>" +
  "<div class='modal_login_input_field modal_account_input_field'>" +
  "<div class='modal_login_input_field_header modal_account_input_field_header'>Email</div>" +
  "<div class='modal_login_input_body modal_account_input_body'>" +
  "<input type='email' name='email' id='modal_login_email_input' class='modal_login_input modal_account_input'>" +
  "</div>" +
  "</div>" +
  "<div class='modal_login_input_field modal_account_input_field'>" +
  "<div id='modal_login_password_input_field_header' class='modal_login_input_field_header modal_account_input_field_header'>Password</div>" +
  "<div id='modal_login_password_input_body' class='modal_login_input_body modal_account_input_body'>" +
  "<input type='password' name='password' id='modal_login_password_input' class='modal_login_input modal_account_input'>" +
  "</div>" +
  "</div>" +
  "<div class='form_submit_button_body'>" +
  "<button class='form_submit_button'>LOGIN</button>" +
  "</div>" +
  "</form>" +
  "</div>";
// Modal Footer
const loginModalFooter =
  "<div id='modal_login_signup_statement_body' class='modal_account_statement_body'>" +
  "<div id='modal_login_signup_statement_text_one' class='modal_login_signup_statement_text modal_account_statement_text'>Signup</div>" +
  "<div id='modal_login_signup_statement_text_two' class='modal_login_signup_statement_text modal_account_statement_text'>if you are new</div>" +
  "</div>";

// Create a Login Modal
const constructLoginModal = () => {
  addModal(loginId, loginModalHeader, loginModalFooter);
  modalBodyPointer.insertAdjacentHTML("beforeend", loginModalHTML);
  document
    .querySelector("#modal_login_signup_statement_text_one")
    .addEventListener("click", () => {
      constructSignupModal();
    });
};
