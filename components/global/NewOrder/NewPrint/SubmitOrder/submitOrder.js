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

      document.querySelector(
        "#order_new_print_modal"
      ).innerHTML = loaderElement;

      document.querySelector("#order_new_print_modal").style.height = "30vh";

      /* Submit New Order Attributes */
      $.ajax({
        type: "POST",
        url: "/new_order",
        processData: false,
        contentType: false,
        data: formData,
        success: function(data) {
          console.log(data);
          newOrderSubmitSuccess();
        }
      });
    });
};

/* Success HTML */
const newOrderSubmitSuccess = () => {
  const newOrderSubmitSuccessHTML =
    "<div id='new_order_submit_success_body'>" +
    "<div id='new_order_submit_success_text'>" +
    "Successfully Submitted a New Order" +
    "</div>" +
    "</div>" +
    "<div class='new_order_submit_success_button_body'>" +
    "<div class='new_order_submit_success_button_text'>" +
    "Ok" +
    "</div>" +
    "</div>" +
    "<div class='new_order_submit_success_button_body'>" +
    "<div class='new_order_submit_success_button_text'>" +
    "Submit New Order" +
    "</div>" +
    "</div>";

  document.querySelector(
    "#order_new_print_modal"
  ).innerHTML = newOrderSubmitSuccessHTML;
};
