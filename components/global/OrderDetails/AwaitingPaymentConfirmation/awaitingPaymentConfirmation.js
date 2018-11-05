/* ======================================= INITIALISATION ======================================= */

const awaitingPaymentConfirmationInit = order => {
  const orderStatusId = order.orderStatus.toLowerCase().replace(/ /g, "_");
  constructOrderDetailsAwaitingPaymentConfirmationModal(order, orderStatusId);
  constructHTMLStructure(orderStatusId);
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  awaitingPaymentConfirmationDescriptionBodyDetails();
};

const constructOrderDetailsAwaitingPaymentConfirmationModal = (
  order,
  orderStatusId
) => {
  // ELEMENTS
  const orderDetailsAwaitingPaymentConfirmationModalHeader = orderDetailsModalHeader;
  const orderDetailsAwaitingPaymentConfirmationModalFooter =
    "<div class='order_details_footer_buttons_body'>" +
    "<div class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Request Refund</div>" +
    "</div>" +
    "</div>";
  const orderDetailsAwaitingPaymentConfirmationModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsAwaitingPaymentConfirmationModalHeader,
    orderDetailsAwaitingPaymentConfirmationModalFooter
  );
  // CSS
  const orderDetailsAwaitingPaymentConfirmationModalMobileHeight = 90;
  const orderDetailsAwaitingPaymentConfirmationModalMobileWidth = 90;
  const orderDetailsAwaitingPaymentConfirmationModalDesktopHeight = 90;
  const orderDetailsAwaitingPaymentConfirmationModalDesktopWidth = 60;
  const orderDetailsAwaitingPaymentConfirmationModalFooterHeight = 14;
  const orderDetailsAwaitingPaymentConfirmationModalCSSObject = new modalCSSObject(
    orderDetailsAwaitingPaymentConfirmationModalMobileHeight,
    orderDetailsAwaitingPaymentConfirmationModalMobileWidth,
    orderDetailsAwaitingPaymentConfirmationModalDesktopHeight,
    orderDetailsAwaitingPaymentConfirmationModalDesktopWidth,
    orderDetailsAwaitingPaymentConfirmationModalFooterHeight
  );

  addModal(
    orderDetailsAwaitingPaymentConfirmationModalElementObject,
    orderDetailsAwaitingPaymentConfirmationModalCSSObject
  );
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const awaitingPaymentConfirmationDescriptionBodyDetails = () => {
  const orderStatusDescriptionBodyDetailsHTML =
    "<div id='order_status_description_details_body'>" +
    "<div id='order_status_description_details_text'>" +
    "Please wait while we verify your payment. We appreciate your patience!" +
    "</div>" +
    "</div>";

  document
    .querySelector(
      "#awaiting_payment_confirmation_order_status_description_body"
    )
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);
};

/* ============================================================================================== */
