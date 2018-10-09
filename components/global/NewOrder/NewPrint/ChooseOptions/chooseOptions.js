// Construct the Choose Options Form
const constructChooseOptionsForm = obj => {
  const chooseOptionsFormHTML =
    "<div id='order_new_prints_step_3_body' class='order_new_prints_step_body'>" +
    "<div id='order_new_prints_step_3_header_body' class='order_new_prints_steps_header_body'>" +
    "<div id='order_new_prints_step_3_header_text' class='order_new_prints_steps_header_text'>Step 3: Choose Options</div>" +
    "</div>" +
    "</div>";

  orderNewPrintPointer.insertAdjacentHTML("beforeend", chooseOptionsFormHTML);
};
