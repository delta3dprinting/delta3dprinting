// Construct the Upload Model Form
const constructUploadModelForm = obj => {
  const uploadModelFormHTML =
    "<div id='order_new_prints_step_1_body' class='order_new_prints_step_body'>" +
    "<div id='order_new_prints_step_1_header_body' class='order_new_prints_steps_header_body'>" +
    "<div id='order_new_prints_step_1_header_text' class='order_new_prints_steps_header_text'>Step 1: Upload 3D " +
    "Model</div>" +
    "</div>" +
    "</div>";

  orderNewPrintPointer.insertAdjacentHTML("beforeend", uploadModelFormHTML);
};
