/* ====================================== INITIALISATION ======================================= */

const submitNewPrintOrder = () => {
  // Validate Inputs
  // Check if At least one file is Uploaded
  if (orderNewPrintDeletedPart.length == orderNewPrintPartNumber + 1) {
    document.querySelector("#order_new_print_parts_error_handler").innerHTML =
      "Must upload at least one file";
    return;
  } else {
    document.querySelector("#order_new_print_parts_error_handler").innerHTML =
      "";
  }
  if (orderNewPrintSelectedPart != null) {
    if (!validateUploadModelInput(orderNewPrintSelectedPart)) {
      return;
    }
  }

  // Collect Inputs
  let partObjectArray = [];
  let formData = [];
  for (i = 0; i <= orderNewPrintPartNumber; i++) {
    if (orderNewPrintDeletedPart.indexOf(i) == -1) {
      // Collect File Input
      const formElement = document.querySelector(
        "#order_new_print_parts_part_" + i + "_upload_model_input_body"
      );
      formData.push(new FormData(formElement));
      // Order Attribute Input
      const fileId = undefined;
      const fileName = document.querySelector(
        "#order_new_print_parts_part_" + i + "_upload_model_option_input_file"
      ).files[0].name;
      const materialGroup = orderNewPrintPartSelectedMaterialGroupArrayName[i];
      const process = orderNewPrintPartSelectedProcessArrayName[i];
      const material = orderNewPrintPartSelectedMaterialArrayName[i];
      const orderQuantity = document.querySelector(
        "#order_new_print_parts_part_" + i + "_quantity_option_input"
      ).value;
      const producedQuantity = 0;
      const quality = document.querySelector(
        "#order_new_print_parts_part_" + i + "_quality_option_input"
      ).value;
      const strength = document.querySelector(
        "#order_new_print_parts_part_" + i + "_strength_option_input"
      ).value;
      const color = document.querySelector(
        "#order_new_print_parts_part_" + i + "_color_option_input"
      ).value;
      partObjectArray.push(
        new OrderNewPrintPartObject(
          fileId,
          fileName,
          materialGroup,
          process,
          material,
          orderQuantity,
          producedQuantity,
          quality,
          strength,
          color
        )
      );
    }
  }
  const orderObject = {
    partObjectArray: partObjectArray,
    pricing: document.querySelector(
      "#order_new_print_pricing_option_input_select"
    ).value,
    delivery: document.querySelector("#order_new_print_delivery_option_input")
      .value,
    additionalNote: document.querySelector(
      "#order_new_print_additional_note_option_input"
    ).value
  };

  // Pre Submit
  newOrderSubmitLoading();

  setTimeout(() => {
    // Submit
    for (i = 0; i <= orderNewPrintPartNumber; i++) {
      if (orderNewPrintDeletedPart.indexOf(i) == -1) {
        $.ajax({
          type: "POST",
          url: "/orderNewPrint/saveFile",
          async: false,
          processData: false,
          contentType: false,
          data: formData[i],
          success: data => {
            orderObject.partObjectArray[i].fileId = data;
          }
        });
      }
    }

    $.ajax({
      type: "POST",
      url: "/orderNewPrint/createNewOrder",
      async: false,
      contentType: "application/json",
      data: JSON.stringify(orderObject),
      success: data => {
        // Post Submit
        newOrderSubmitSuccess();
        loadProfileOrdersPrintsOrdersListTableContents();
      }
    });
  }, 0);
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
      orderNewPrint();
    });
  // Close Button
  document
    .querySelector("#order_new_print_close_body")
    .addEventListener("click", () => {
      removeModal();
      removeBackdrop();
    });
};

/* ================================= CLASS OBJECT CONSTRUCTOR ================================== */

class OrderNewPrintPartObject {
  constructor(
    fileId,
    fileName,
    materialGroup,
    process,
    material,
    orderQuantity,
    producedQuantity,
    quality,
    strength,
    color
  ) {
    this.fileId = fileId;
    this.fileName = fileName;
    this.materialGroup = materialGroup;
    this.process = process;
    this.material = material;
    this.orderQuantity = orderQuantity;
    this.producedQuantity = producedQuantity;
    this.quality = quality;
    this.strength = strength;
    this.color = color;
  }
}

/* ============================================================================================= */
