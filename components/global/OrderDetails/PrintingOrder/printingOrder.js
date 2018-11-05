/* ======================================= INITIALISATION ======================================= */

const printingOrderInit = order => {
  const orderStatusId = order.orderStatus.toLowerCase().replace(/ /g, "_");
  constructOrderDetailsPrintingOrderModal(order, orderStatusId);
  constructHTMLStructure(orderStatusId);
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  printingOrderDescriptionBodyDetails();
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsPrintingOrderModal = (order, orderStatusId) => {
  // ELEMENTS
  const orderDetailsPrintingOrderModalHeader = orderDetailsModalHeader;
  const orderDetailsPrintingOrderModalFooter =
    "<div class='order_details_footer_buttons_body'>" +
    "<div class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Request Refund</div>" +
    "</div>" +
    "</div>";
  const orderDetailsPrintingOrderModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsPrintingOrderModalHeader,
    orderDetailsPrintingOrderModalFooter
  );
  // CSS
  const orderDetailsPrintingOrderModalMobileHeight = 90;
  const orderDetailsPrintingOrderModalMobileWidth = 90;
  const orderDetailsPrintingOrderModalDesktopHeight = 90;
  const orderDetailsPrintingOrderModalDesktopWidth = 60;
  const orderDetailsPrintingOrderModalFooterHeight = 14;
  const orderDetailsPrintingOrderModalCSSObject = new modalCSSObject(
    orderDetailsPrintingOrderModalMobileHeight,
    orderDetailsPrintingOrderModalMobileWidth,
    orderDetailsPrintingOrderModalDesktopHeight,
    orderDetailsPrintingOrderModalDesktopWidth,
    orderDetailsPrintingOrderModalFooterHeight
  );

  addModal(
    orderDetailsPrintingOrderModalElementObject,
    orderDetailsPrintingOrderModalCSSObject
  );
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const printingOrderDescriptionBodyDetails = () => {
  const orderStatusDescriptionBodyDetailsHTML =
    "<div id='order_status_description_details_body'>" +
    "<div id='order_status_description_details_text'>" +
    "We are now printing your order! Expect your order to finish printing in:" +
    "</div>" +
    "</div>";

  document
    .querySelector("#printing_order_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);
};

/* ============================================================================================== */
