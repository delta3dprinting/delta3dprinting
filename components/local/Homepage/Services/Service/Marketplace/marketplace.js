const marketplaceId = "sell";

const marketplaceTabName = "Sell";

// Marketplace Title
const marketplaceTitle =
  "<div id='marketplace_title_body' class='service_title_body'><div id='marketplace_title_text' class='service_title_text'>Marketplace</div></div>";

const marketplaceSummaryQuote =
  "<div id='marketplace_summary_quote_body' class='service_summary_quote_body'><div id='marketplace_summary_quote_text' class='service_summary_quote_text'>Create or simplify your business</div></div>";

// Marketplace Button
const marketplaceButton =
  "<div id='marketplace_button_body' class='service_button_body'><div id='marketplace_button' class='service_button' onclick='marketplaceButtonClicked();'><div id='marketplace_button_text' class='service_button_text'>EXPLORE THE MARKETPLACE</div></div></div>";

// Marketplace Description
const marketplaceDescription =
  "<div id='marketplace_description_body' class='service_description_body'><div id='marketplace_description_text' class='service_description_text'>Outsource your fulfillment with a simple connection to our platform. Services include: ordering, manufacturing, assembly, custom packaging, and shipping.</div></div>";

const marketplaceContent =
  marketplaceTitle +
  marketplaceSummaryQuote +
  marketplaceButton +
  marketplaceDescription;

const marketplaceObject = new serviceObject(
  marketplaceId,
  marketplaceTabName,
  marketplaceContent
);

// Marketplace Modal
const marketplaceModalHeader = "Marketplace";

const marketplaceModalBodyHTML =
  "<div id='marketplace_modal_body' class='service_modal_body'></div>";

const marketplaceTempModalTitleHTML =
  "<div id='marketplace_temp_modal_title' class='temp_modal_title'>*COMING SOON*</div>";

const marketplaceTempModalContentHTML =
  "<div id='marketplace_temp_modal_content' class='temp_modal_content'></div>";

const marketplaceModalContentsHTML =
  marketplaceTempModalTitleHTML + marketplaceTempModalContentHTML;

const marketplaceButtonClicked = () => {
  addModal("marketplace", marketplaceModalHeader);
  modalBodyPointer.insertAdjacentHTML("beforeend", marketplaceModalBodyHTML);
  document
    .querySelector("#marketplace_modal_body")
    .insertAdjacentHTML("beforeend", marketplaceModalContentsHTML);
};
