/* ===================================== GLOBAL VARIABLES ====================================== */

let orderNewPrintPartNumber;
let orderNewPrintDeletedPart;
let orderNewPrintSelectedPart;
let orderNewPrintPartSelectedMaterialGroupArrayId;
let orderNewPrintPartSelectedMaterialGroupArrayName;
let orderNewPrintPartSelectedProcessArrayId;
let orderNewPrintPartSelectedProcessArrayName;
let orderNewPrintPartSelectedMaterialArrayId;
let orderNewPrintPartSelectedMaterialArrayName;

/* ====================================== INITIALISATION ======================================= */

const orderNewPrint = () => {
  if (loginStatus) {
    orderNewPrintPartNumber = -1;
    orderNewPrintDeletedPart = [];
    orderNewPrintSelectedPart = null;
    orderNewPrintPartSelectedMaterialGroupArrayId = [];
    orderNewPrintPartSelectedMaterialGroupArrayName = [];
    orderNewPrintPartSelectedProcessArrayId = [];
    orderNewPrintPartSelectedProcessArrayName = [];
    orderNewPrintPartSelectedMaterialArrayId = [];
    orderNewPrintPartSelectedMaterialArrayName = [];
    addOrderNewPrintModal();
    addOrderNewPrintForm();
    addOrderNewPrintParts();
    addOrderNewPrintGlobalOptionsForm();
  } else {
    constructLoginModal();
  }
};

/* =========================================== MODAL =========================================== */

const addOrderNewPrintModal = () => {
  const orderNewPrintModalId = "order_new_print";
  const orderNewPrintModalHeader = "Order New Print";
  const orderNewPrintModalFooter =
    "<div id='order_new_print_footer_body' class='modal_footer_body'>" +
    "<div id='order_new_print_order_button' class='order_new_print_footer_button'>" +
    "<div id='order_new_print_order_button_text' class='order_new_print_footer_button_text'>" +
    "Order" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_cancel_button' class='order_new_print_footer_button'>" +
    "<div id='order_new_print_cancel_button_text' class='order_new_print_footer_button_text'>" +
    "Cancel" +
    "</div>" +
    "</div>" +
    "</div>";
  // Create the Modal
  addModal(
    orderNewPrintModalId,
    orderNewPrintModalHeader,
    orderNewPrintModalFooter
  );
  // Add the Footer Buttons Event Listeners
  // Submit Order
  document
    .querySelector("#order_new_print_order_button")
    .addEventListener("click", () => {
      submitNewPrintOrder();
    });
  // Close Order
  document
    .querySelector("#order_new_print_cancel_button")
    .addEventListener("click", () => {
      removeModal();
      removeBackdrop();
    });
};

/* ============================== CREATE THE ORDER NEW PRINT FORM ============================== */

const addOrderNewPrintForm = () => {
  // Create Order New Print Form base HTML
  const orderNewPrintBaseFormHTML =
    "<div id='order_new_print_form_body'>" +
    "<div id='order_new_print_parts_body'></div>" +
    "<div id='order_new_print_global_options_form_body'></div>" +
    "</div>";
  // Insert Order New Print Form base HTML
  document.querySelector(
    "#order_new_print_modal_body"
  ).innerHTML = orderNewPrintBaseFormHTML;
};

/* ============================================================================================= */
