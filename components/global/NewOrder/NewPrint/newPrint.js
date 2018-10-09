const orderNewPrintId = "order_new_print";
let orderNewPrintPointer;

/* Create the New Print Order Form */
const addOrderNewPrintForm = () => {
  if (loginStatus) {
    addModal(orderNewPrintId);
    constructSelectMaterialObjectArray();
    constructOrderNewPrintForm(selectMaterialObjectArray);
  } else {
    loginMethod();
  }
};

/* Create the Base HTML for Order New Print Form */
const addOrderNewPrintFormBase = () => {
  const orderNewPrintFormBaseHTML = "<div id='order_new_prints_body'></div>";

  document.querySelector(
    "#order_new_print_modal"
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
