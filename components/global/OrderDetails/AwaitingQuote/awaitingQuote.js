const awaitingQuoteOrderDetailsModalFooter = "<div></div>";

/* Construct Order Status Description Body */
const awaitingQuoteOrderStatusDescriptionBody = (order, orderStatusId) => {
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  awaitingQuoteDescriptionBodyDetails();
};

const awaitingQuoteDescriptionBodyDetails = () => {
  const details =
    "Please wait while we analyse and generate a quote for your order.";

  const orderStatusDescriptionBodyDetailsHTML =
    "<div id='order_status_description_details_body'>" +
    "<div id='order_status_description_details_text'>" +
    details +
    "</div>" +
    "</div>";

  document
    .querySelector("#awaiting_quote_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);
};
