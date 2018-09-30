const printingServiceId = "make";

const printingServiceTabName = "Make";

// 3D Printing Service Title
const printingServiceTitle =
  "<div id='printing_service_title_body' class='service_title_body'><div id='printing_service_title_text' class='service_title_text'>3D Printing Service</div></div>";

const printingServiceSummaryQuote =
  "<div id='printing_service_summary_quote_body' class='service_summary_quote_body'><div id='printing_service_summary_quote_text' class='service_summary_quote_text'>Manufacturing scaled for you</div></div>";

// 3D Printing Service Button
const printingServiceButton =
  "<div id='printing_service_button_body' class='service_button_body'><div id='printing_service_button' class='service_button' onclick='printingServiceButtonClicked();'><div id='printing_service_button_text' class='service_button_text'>GET A QUOTE</div></div></div>";

// 3D Printing Service Summary Quote

// 3D Printing Service Description
const printingServiceDescription =
  "<div id='printing_service_description_body' class='service_description_body'><div id='printing_service_description_text' class='service_description_text'>We manufacture high-quality, affordable products. Upload for an instant quote or contact us to co-develop a solution for unique products.</div></div>";

const printingServiceContent =
  printingServiceTitle +
  printingServiceSummaryQuote +
  printingServiceButton +
  printingServiceDescription;

const printingServiceObject = new serviceObject(
  printingServiceId,
  printingServiceTabName,
  printingServiceContent
);

// 3D Printing Service Modal
const printingServiceModalBodyHTML =
  "<div id='printing_service_modal_body' class='service_modal_body'></div>";

const printingServiceTempModalTitleHTML =
  "<div id='printing_service_temp_modal_title' class='temp_modal_title'>*TEMPORARY*</div>";

const printingServiceTempModalContentHTML =
  "<div id='printing_service_temp_modal_content' class='temp_modal_content'>For a quotation please email <strong>carlvelasco96@gmail.com</strong>. In the email, please include the STL file of your 3D model.</div>";

const printingServiceModalContentsHTML =
  printingServiceTempModalTitleHTML + printingServiceTempModalContentHTML;

const printingServiceButtonClicked = () => {
  addModal();
  modalPointer.insertAdjacentHTML("beforeend", printingServiceModalBodyHTML);
  document
    .querySelector("#printing_service_modal_body")
    .insertAdjacentHTML("beforeend", printingServiceModalContentsHTML);
};
