const modellingServiceId = "model";

const modellingServiceTabName = "Model";

// 3D Modelling Service Title
const modellingServiceTitle =
  "<div id='modelling_service_title_body' class='service_title_body'><div id='modelling_service_title_text' class='service_title_text'>3D Modelling Service</div></div>";

const modellingServiceSummaryQuote =
  "<div id='modelling_service_summary_quote_body' class='service_summary_quote_body'><div id='modelling_service_summary_quote_text' class='service_summary_quote_text'>Design your products with us</div></div>";

// 3D Modelling Service Button
const modellingServiceButton =
  "<div id='modelling_service_button_body' class='service_button_body'><div id='modelling_service_button' class='service_button' onclick='modellingServiceButtonClicked();'><div id='modelling_service_button_text' class='service_button_text'>QUERY FOR A SERVICE</div></div></div>";

// 3D Modelling Service Description
const modellingServiceDescription =
  "<div id='modelling_service_description_body' class='service_description_body'><div id='modelling_service_description_text' class='service_description_text'>Work with a skilled product designer to turn your ideas into real products. We can start from scratch or evolve a product for on-going 3D-printed manufacturing.</div></div>";

const modellingServiceContent =
  modellingServiceTitle +
  modellingServiceSummaryQuote +
  modellingServiceButton +
  modellingServiceDescription;

const modellingServiceObject = new serviceObject(
  modellingServiceId,
  modellingServiceTabName,
  modellingServiceContent
);

// 3D Modelling Service Modal
const modellingServiceModalBodyHTML =
  "<div id='modelling_service_modal_body' class='service_modal_body'></div>";

const modellingServiceTempModalTitleHTML =
  "<div id='modelling_service_temp_modal_title' class='temp_modal_title'>*TEMPORARY*</div>";

const modellingServiceTempModalContentHTML =
  "<div id='modelling_service_temp_modal_content' class='temp_modal_content'>For a 3D Modelling Service please email <strong>carlvelasco96@gmail.com</strong>. In the email, please include any relevant information and files.</div>";

const modellingServiceModalContentsHTML =
  modellingServiceTempModalTitleHTML + modellingServiceTempModalContentHTML;

const modellingServiceButtonClicked = () => {
  addModal();
  modalPointer.insertAdjacentHTML("beforeend", modellingServiceModalBodyHTML);
  document
    .querySelector("#modelling_service_modal_body")
    .insertAdjacentHTML("beforeend", modellingServiceModalContentsHTML);
};
