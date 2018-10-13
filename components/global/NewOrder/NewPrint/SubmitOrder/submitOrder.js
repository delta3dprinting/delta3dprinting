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

      /* Submit New Order Attributes */
      $.ajax({
        type: "POST",
        url: "/new_order",
        processData: false,
        contentType: false,
        data: formData,
        success: function(data) {
          console.log(data);
        }
      });
    });
};
