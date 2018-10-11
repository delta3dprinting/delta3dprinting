const orderNewPrintId = "order_new_print";
const orderNewPrintModalHeader = "New Order";
const orderNewPrintModalFooter =
  "<div id='order_new_print_order_body' class='order_new_print_button_body'>" +
  "<div id='order_new_print_order_text' class='order_new_print_button_text'>Order</div>" +
  "</div>" +
  "<div id='order_new_print_cancel_body' class='order_new_print_button_body'>" +
  "<div id='order_new_print_cancel_text' class='order_new_print_button_text'>Cancel</div>" +
  "</div>";
let orderNewPrintPointer;

/* Create the New Print Order Form */
const addOrderNewPrintForm = () => {
  if (loginStatus) {
    addModal(
      orderNewPrintId,
      orderNewPrintModalHeader,
      orderNewPrintModalFooter
    );
    constructSelectMaterialObjectArray();
    constructOrderNewPrintForm(selectMaterialObjectArray);
  } else {
    constructLoginModal();
  }
};

/* Create the Base HTML for Order New Print Form */
const addOrderNewPrintFormBase = () => {
  const orderNewPrintFormBaseHTML = "<div id='order_new_prints_body'></div>";

  document.querySelector(
    "#order_new_print_modal_body"
  ).innerHTML = orderNewPrintFormBaseHTML;

  orderNewPrintPointer = document.querySelector("#order_new_prints_body");
};

/* Construct the Order New Print Form */
const constructOrderNewPrintForm = obj => {
  addOrderNewPrintFormBase();
  constructUploadModelForm(obj);
  constructSelectMaterialForm(obj);
  constructChooseOptionsForm(obj);
};
