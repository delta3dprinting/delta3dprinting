/* =================================== ADD BUTTON EVENT LISTENERS =================================== */
const addNewOrderOrderButtonEventListener = () => {
  document
    .querySelector("#order_new_print_order_body")
    .addEventListener("click", () => {
      /* Collect Input Values and Create New Order Attributes Object */
      const newOrderAttributesObject = {
        materialGroup: selectedSelectMaterialMaterialGroupId,
        process: selectedSelectMaterialProcessId,
        material: selectedSelectMaterialMaterialId,
        quantity: document.querySelector(
          "#order_new_prints_quantity_option_input_number"
        ).value,
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

      // Loading Screen
      newOrderSubmitLoading();

      /* Submit New Order Attributes */
      $.ajax({
        type: "POST",
        url: "/new_order",
        processData: false,
        contentType: false,
        data: formData,
        success: data => {
          // Success Screen
          newOrderSubmitSuccess();
          loadProfileOrdersPrintsOrdersListTableContents();
        }
      });
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
