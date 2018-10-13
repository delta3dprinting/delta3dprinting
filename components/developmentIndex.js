// Declare Pointer Variables
let rootPointer;
let toolbarPointer;
let bodyPointer;
let footerPointer;

// Declare Login Status Variable
let loginStatus;

// Global Initialisation
window.onload = () => {
  rootPointer = document.querySelector("#root");
  createMainPointers();
  isUserLoggedIn(rootPointer, windowOnloadInit);
};

const windowOnloadInit = () => {
  constructRootBaseElements();
  createMainPointers();
  sideDrawerInit();
  profileIconInit();
  footerInit();
  homepageInit();
};

// Construct the Base Elements of the Root Element
const constructRootBaseElements = () => {
  const rootBaseElementsHTML =
    "<div id='toolbar'></div>" +
    "<div id='body'></div>" +
    "<div id='footer'></div>";

  rootPointer.insertAdjacentHTML("beforeend", rootBaseElementsHTML);
};

/* ============================= IS USER LOGGED IN DEVELOPMENT ============================= */

// Assign Pointers
const createMainPointers = () => {
  toolbarPointer = document.querySelector("#toolbar");
  bodyPointer = document.querySelector("#body");
  footerPointer = document.querySelector("#footer");
};

// Check if User is Logged In and if user is Real
const isUserLoggedIn = (pointer, callback) => {
  pointer.innerHTML = loaderElement;

  const checkIfUserIsAuthenticated = new Promise((resolve, reject) => {
    setTimeout(() => {
      loginStatus = true;
      resolve();
    }, 500);
  });

  checkIfUserIsAuthenticated.then(() => {
    pointer.innerHTML = "";
    callback();
  });
};

/* ==================================== SUBMIT NEW ORDER ==================================== */
/* ------------------------------- ADD BUTTON EVENT LISTENERS ------------------------------- */

const addNewOrderOrderButtonEventListener = () => {
  /* Submit Order Button */
  document
    .querySelector("#order_new_print_order_body")
    .addEventListener("click", () => {
      /* Collect Input Values and Create New Order Attributes Object */
      const newOrderAttributesObject = {
        materialGroup: selectedSelectMaterialMaterialGroupId,
        process: selectedSelectMaterialProcessId,
        material: selectedSelectMaterialMaterialId,
        quality: document.querySelector(
          "#order_new_prints_quality_option_input_select"
        ).value,
        strength: document.querySelector(
          "#order_new_prints_strength_option_input_select"
        ).value,
        color: document.querySelector(
          "#order_new_prints_color_option_input_select"
        ).value
      };

      /* Collect Uploaded File */
      let formElement = document.querySelector(
        "#order_new_prints_upload_input_file_form"
      );
      let formData = new FormData(formElement);

      /* Assign New Order Attributes to FormData */
      formData.append("type", "print");
      formData.append("orderStatus", "Requesting Quote");
      for (let key in newOrderAttributesObject) {
        formData.append(key, newOrderAttributesObject[key]);
      }

      newOrderSubmitLoading();

      /* Submit New Order Attributes */
      setTimeout(() => {
        newOrderSubmitSuccess();
      }, 2000);
    });
  /* Cancel Order Button */
  document
    .querySelector("#order_new_print_cancel_body")
    .addEventListener("click", () => {
      removeModal();
      removeBackdrop();
    });
};

/* Create Loading Intermediary */
const newOrderSubmitLoading = () => {
  /* Modal Main */
  document.querySelector("#order_new_print_modal").style.height = "40vh";
  /* Modal Header */
  document.querySelector("#order_new_print_modal_header_text").innerHTML =
    "Please wait...";
  /* Modal Body */
  document.querySelector(
    "#order_new_print_modal_body"
  ).innerHTML = loaderElement;
  document.querySelector("#order_new_print_modal_body").style.padding = "0";
  document.querySelector("#order_new_print_modal_body").style.display = "flex";
  document.querySelector("#order_new_print_modal_body").style.justifyContent =
    "center";
  document.querySelector("#order_new_print_modal_body").style.alignItems =
    "center";
  document.querySelector("#order_new_print_modal_body").style.top = "0vh";
  /* Modal Footer */
  document.querySelector("#order_new_print_footer_body").innerHTML = "";
  document.querySelector("#order_new_print_modal_footer_body").style.top =
    "calc(50vh - 16vmin)";
};

/* Success HTML */
const newOrderSubmitSuccess = () => {
  /* Modal Header */
  document.querySelector("#order_new_print_modal_header_text").innerHTML =
    "Submitted";
  /* Modal Body */
  const newOrderSubmitSuccessBodyHTML =
    "<div id='new_order_submit_success_body'>" +
    "<div id='new_order_submit_success_text'>" +
    "Successfully Submitted a New Order" +
    "</div>" +
    "</div>";
  // Insert Success Modal Body
  document.querySelector(
    "#order_new_print_modal_body"
  ).innerHTML = newOrderSubmitSuccessBodyHTML;
  /* Modal Footer */
  const newOrderSubmitSuccessFooterHTML =
    "<div id='order_new_print_new_order_body' class='order_new_print_button_body'>" +
    "<div id='order_new_print_new_order_text' class='order_new_print_button_text'>New Order</div>" +
    "</div>" +
    "<div id='order_new_print_close_body' class='order_new_print_button_body'>" +
    "<div id='order_new_print_close_text' class='order_new_print_button_text'>Close</div>" +
    "</div>";
  // Insert Success Modal Footer
  document.querySelector(
    "#order_new_print_footer_body"
  ).innerHTML = newOrderSubmitSuccessFooterHTML;
  /* Add Buttons Even Listener */
  // New Order Button
  document
    .querySelector("#order_new_print_new_order_body")
    .addEventListener("click", () => {
      removeModal();
      removeBackdrop();
      addOrderNewPrintForm();
    });
  // Close Button
  document
    .querySelector("#order_new_print_close_body")
    .addEventListener("click", () => {
      removeModal();
      removeBackdrop();
    });
};
