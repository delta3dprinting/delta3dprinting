/* ====================================== INITIALISATION ======================================= */

const addOrderNewPrintGlobalOptionsForm = () => {
  addOrderNewPrintGlobalOptionsHeader();
  addOrderNewPrintPricingOptionForm();
  addOrderNewPrintDeliveryOptionForm();
  addOrderNewPrintAdditionalNoteOptionForm();
};

/* =================================== GLOBAL OPTIONS HEADER =================================== */

const addOrderNewPrintGlobalOptionsHeader = () => {
  // Create the Global Options Header
  const orderNewPrintGlobalOptionsHeaderHTML =
    "<div id='order_new_print_global_options_form_header_body' class='order_new_print_form_header_body'>" +
    "<div id='order_new_print_global_options_form_header_text' class='order_new_print_form_header_text'>" +
    "Global Options" +
    "</div>" +
    "</div>";
  // Insert the Global Options Header
  document
    .querySelector("#order_new_print_global_options_form_body")
    .insertAdjacentHTML("beforeend", orderNewPrintGlobalOptionsHeaderHTML);
};

/* ====================================== PRICING OPTION ======================================= */

const addOrderNewPrintPricingOptionForm = () => {
  // Create the Pricing Option Input Field
  const orderNewPrintPricingOptionFormHTML =
    "<div id='order_new_print_pricing_option_input_field' class='order_new_print_option_input_field'>" +
    "<div id='order_new_print_pricing_option_input_field_header_body' class='order_new_print_option_input_field_header_body'>" +
    "<div id='order_new_print_pricing_option_input_field_header_text' class='order_new_print_option_input_field_header_text'>" +
    "Pricing" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_pricing_option_input_body' class='order_new_print_option_input_body'>" +
    "<select name='pricing' id='order_new_print_pricing_option_input_select' class='order_new_print_option_input_select'>" +
    "<option value='Basic'>Basic</option>" +
    "<option value='Priority'>Priority</option>" +
    "<option value='Urgent'>Urgent</option>" +
    "</select>" +
    "</div>" +
    "</div>";
  // Insert the Pricing Option Input Field
  document
    .querySelector("#order_new_print_global_options_form_body")
    .insertAdjacentHTML("beforeend", orderNewPrintPricingOptionFormHTML);
};

/* ====================================== DELIVERY OPTION ====================================== */

const addOrderNewPrintDeliveryOptionForm = () => {
  // Create the Delivery Option Input Field
  const orderNewPrintDeliveryOptionFormHTML =
    "<div id='order_new_print_delivery_option_input_field' class='order_new_print_option_input_field'>" +
    "<div id='order_new_print_delivery_option_input_field_header_body' class='order_new_print_option_input_field_header_body'>" +
    "<div id='order_new_print_delivery_option_input_field_header_text' class='order_new_print_option_input_field_header_text'>" +
    "Delivery" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_delivery_option_input_body' class='order_new_print_option_input_body'>" +
    "<select name='delivery' id='order_new_print_delivery_option_input' class='order_new_print_option_input_select'>" +
    "<option value='Pickup'>Pickup</option>" +
    "<option value='Tracking'>Tracking</option>" +
    "<option value='Courier'>Courier</option>" +
    "</select>" +
    "</div>" +
    "</div>";
  // Insert the Pricing Option Input Field
  document
    .querySelector("#order_new_print_global_options_form_body")
    .insertAdjacentHTML("beforeend", orderNewPrintDeliveryOptionFormHTML);
};

/* ====================================== ADDITIONAL NOTE ====================================== */

const addOrderNewPrintAdditionalNoteOptionForm = () => {
  // Create the Additional Note Option Input Field
  const orderNewPrintAdditionalNoteOptionFormHTML =
    "<div id='order_new_print_additional_note_option_input_field' class='order_new_print_option_input_field'>" +
    "<div id='order_new_print_additional_note_option_input_field_header_body' class='order_new_print_option_input_field_header_body'>" +
    "<div id='order_new_print_additional_note_option_input_field_header_text' class='order_new_print_option_input_field_header_text'>" +
    "Additional Note" +
    "</div>" +
    "</div>" +
    "<div id='order_new_print_additional_note_option_input_body' class='order_new_print_option_input_body'>" +
    "<textarea name='additionalNote' id='order_new_print_additional_note_option_input' class='order_new_print_option_input_textarea'></textarea>" +
    "</div>" +
    "</div>";
  // Insert the Additional Note Option Input Field
  document
    .querySelector("#order_new_print_global_options_form_body")
    .insertAdjacentHTML("beforeend", orderNewPrintAdditionalNoteOptionFormHTML);
  // Autosize Textarea
  const textarea = $("#order_new_print_additional_note_option_input");
  textarea.on("change drop keydown cut paste", function() {
    textarea.height("auto");
    textarea.height(textarea.prop("scrollHeight"));
  });
};

/* ============================================================================================= */
