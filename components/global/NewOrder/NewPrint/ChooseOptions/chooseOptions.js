// Construct the Choose Options Form
const constructChooseOptionsForm = obj => {
  const chooseOptionsFormHTML =
    "<div id='order_new_prints_step_3_body' class='order_new_prints_step_body'>" +
    "<div id='order_new_prints_step_3_header_body' class='order_new_prints_steps_header_body'>" +
    "<div id='order_new_prints_step_3_header_text' class='order_new_prints_steps_header_text'>Step 3: Choose Options</div>" +
    "</div>" +
    "<div id='order_new_prints_strength_option_body' class='order_new_prints_option_body'>" +
    "<div id='order_new_prints_quality_option_header_body' class='order_new_prints_option_header_body'>" +
    "<div id='order_new_prints_quality_option_header_text' class='order_new_prints_option_header_text'>Quality</div>" +
    "</div>" +
    "<div id='order_new_prints_quality_option_input_body' class='order_new_prints_option_input_body'>" +
    "<select name='Quality' id='order_new_prints_quality_option_input_select' class='order_new_prints_option_input_select'></select>" +
    "</div>" +
    "</div>" +
    "<div id='order_new_prints_strength_option_body' class='order_new_prints_option_body'>" +
    "<div id='order_new_prints_strength_option_header_body' class='order_new_prints_option_header_body'>" +
    "<div id='order_new_prints_strength_option_header_text' class='order_new_prints_option_header_text'>Strength</div>" +
    "</div>" +
    "<div id='order_new_prints_strength_option_input_body' class='order_new_prints_option_input_body'>" +
    "<select name='Strength' id='order_new_prints_strength_option_input_select' class='order_new_prints_option_input_select'></select>" +
    "</div>" +
    "</div>" +
    "<div id='order_new_prints_color_option_body' class='order_new_prints_option_body'>" +
    "<div id='order_new_prints_color_option_header_body' class='order_new_prints_option_header_body'>" +
    "<div id='order_new_prints_color_option_header_text' class='order_new_prints_option_header_text'>Color</div>" +
    "</div>" +
    "<div id='order_new_prints_color_option_input_body' class='order_new_prints_option_input_body'>" +
    "<select name='Color' id='order_new_prints_color_option_input_select' class='order_new_prints_option_input_select'></select>" +
    "</div>" +
    "</div>" +
    "</div>";

  orderNewPrintPointer.insertAdjacentHTML("beforeend", chooseOptionsFormHTML);
};

/* CONSTRUCT OPTIONS ON MATERIAL SELECT */
const populateChooseOptionsBasicOptionsSelectField = obj => {
  // Construct the Quality Selection
  document.querySelector(
    "#order_new_prints_quality_option_input_select"
  ).innerHTML = "";

  obj.qualityDefaultValuesArray.forEach(ele => {
    let selected = "";
    if (ele.qualityName === obj.defaultQualityValue) selected = "selected";
    const chooseOptionsQualitySelectFieldOptions =
      "<option value='" +
      ele.qualityName +
      "' id='order_new_prints_" +
      ele.qualityId +
      "_quality_option_input_select_option' " +
      "class='order_new_prints_option_input_select_option' " +
      selected +
      ">" +
      ele.qualityName +
      "</option>";

    document
      .querySelector("#order_new_prints_quality_option_input_select")
      .insertAdjacentHTML("beforeend", chooseOptionsQualitySelectFieldOptions);
  });

  // Construct the Strength Selection
  document.querySelector(
    "#order_new_prints_strength_option_input_select"
  ).innerHTML = "";

  obj.strengthDefaultValuesArray.forEach(ele => {
    let selected = "";
    if (ele.strengthName === obj.defaultStrengthValue) selected = "selected";

    const chooseOptionsStrengthSelectFieldOptions =
      "<option value='" +
      ele.strengthName +
      "' id='order_new_prints_" +
      ele.strengthId +
      "_strength_option_input_select_option' " +
      "class='order_new_prints_option_input_select_option' " +
      selected +
      ">" +
      ele.strengthName +
      "</option>";

    document
      .querySelector("#order_new_prints_strength_option_input_select")
      .insertAdjacentHTML("beforeend", chooseOptionsStrengthSelectFieldOptions);
  });

  // Construct the Color Selection
  document.querySelector(
    "#order_new_prints_color_option_input_select"
  ).innerHTML = "";

  obj.colorsArray.forEach(ele => {
    let selected = "";
    if (ele.colorName === obj.defaultColorValue) selected = "selected";

    const chooseOptionsColorSelectFieldOptions =
      "<option value='" +
      ele.colorName +
      "' id='order_new_prints_" +
      ele.colorId +
      "_strength_option_input_select_option' " +
      "class='order_new_prints_option_input_select_option' " +
      selected +
      ">" +
      ele.colorName +
      "</option>";

    document
      .querySelector("#order_new_prints_color_option_input_select")
      .insertAdjacentHTML("beforeend", chooseOptionsColorSelectFieldOptions);
  });
};
