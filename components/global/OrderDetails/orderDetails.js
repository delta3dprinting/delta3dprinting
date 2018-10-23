const viewOrderDetails = orderNumber => {
  $.ajax({
    type: "POST",
    url: "/order",
    data: { orderNumber: orderNumber },
    success: data => {
      if (data.orderStatus == "Awaiting Quote") {
        awaitingQuoteInit(data);
      } else if (data.orderStatus == "Awaiting Payment") {
        awaitingPaymentInit(data);
      } else if (data.orderStatus == "Awaiting Payment Confirmation") {
        awaitingPaymentConfirmationInit(data);
      } else if (data.orderStatus == "Printing Order") {
        printingOrderInit(data);
      } else if (data.orderStatus == "Ready for Delivery") {
        readyForDeliveryInit(data);
      } else if (data.orderStatus == "Order Shipped") {
        orderShippedInit(data);
      } else if (data.orderStatus == "Order Completed") {
        orderCompletedInit(data);
      } else {
        console.log("Couldn't Determine Order Status");
      }
    }
  });
};

const constructOrderStatusId = orderStatus => {
  return orderStatus.toLowerCase().replace(" ", "_");
};

/* MODAL */
const orderDetailsModalHeader = "Order Details";

/* HTML STRUCTURE */
const constructHTMLStructure = orderStatusId => {
  const htmlStructure =
    "<div id='" +
    orderStatusId +
    "_body' class='order_details_main_body'>" +
    "<div id='" +
    orderStatusId +
    "_order_status_description_body' class='order_status_description_body order_details_body'></div>" +
    "<div id='" +
    orderStatusId +
    "_order_options_details_body' class='order_options_details_body order_details_body'></div>" +
    "<div id='" +
    orderStatusId +
    "_order_details_attached_files_body' class='order_details_attached_files_body order_details_body'></div>" +
    "<div id='" +
    orderStatusId +
    "_order_details_comments_body' class='order_details_comments_body order_details_body'></div>" +
    "</div>";

  document.querySelector(
    "#" + orderStatusId + "_modal_body"
  ).innerHTML = htmlStructure;
};

// Construct Order Status Description Body Tabs
const orderStatusDescriptionBodyTabs = (orderStatusId, delivery) => {
  const orderStatusDescriptionBodyTabsHTML =
    "<div id='order_status_tabs_body'>" +
    "<div id='awaiting_quote_order_status_tab_body' class='order_status_tab_body'>" +
    "<div id='awaiting_quote_order_status_tab_text' class='order_status_tab_text'>" +
    "Awaiting Quote" +
    "</div>" +
    "</div>" +
    "<div id='awaiting_payment_order_status_tab_body' class='order_status_tab_body'>" +
    "<div id='awaiting_payment_order_status_tab_text' class='order_status_tab_text'>" +
    "Awaiting Payment" +
    "</div>" +
    "</div>" +
    "<div id='awaiting_payment_confirmation_order_status_tab_body' class='order_status_tab_body'>" +
    "<div id='awaiting_payment_confirmation_order_status_tab_text' class='order_status_tab_text'>" +
    "Awaiting Payment Confirmation" +
    "</div>" +
    "</div>" +
    "<div id='printing_order_order_status_tab_body' class='order_status_tab_body'>" +
    "<div id='printing_order_order_status_tab_text' class='order_status_tab_text'>" +
    "Printing Order" +
    "</div>" +
    "</div>" +
    "</div>";

  document
    .querySelector("#awaiting_quote_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyTabsHTML);

  if (delivery == "Pickup") {
    const orderStatusPickupTabsHTML =
      "<div id='ready_for_pickup_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='ready_for_pickup_order_status_tab_text' class='order_status_tab_text'>" +
      "Ready for Pickup" +
      "</div>" +
      "</div>" +
      "<div id='order_completed_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='order_completed_order_status_tab_text' class='order_status_tab_text'>" +
      "Order Completed" +
      "</div>" +
      "</div>";

    document
      .querySelector("#order_status_tabs_body")
      .insertAdjacentHTML("beforeend", orderStatusPickupTabsHTML);
  } else {
    const orderStatusShippingTabsHTML =
      "<div id='ready_for_shipping_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='ready_for_shipping_order_status_tab_text' class='order_status_tab_text'>" +
      "Ready for Shipping" +
      "</div>" +
      "</div>" +
      "<div id='order_shipped_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='order_shipped_order_status_tab_text' class='order_status_tab_text'>" +
      "Order Shipped" +
      "</div>" +
      "</div>" +
      "<div id='order_completed_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='order_completed_order_status_tab_text' class='order_status_tab_text'>" +
      "Order Completed" +
      "</div>" +
      "</div>";

    document
      .querySelector("#order_status_tabs_body")
      .insertAdjacentHTML("beforeend", orderStatusShippingTabsHTML);
  }

  document
    .querySelector("#" + orderStatusId + "_order_status_tab_body")
    .classList.add("order_status_tab_body_selected");
  document
    .querySelector("#" + orderStatusId + "_order_status_tab_text")
    .classList.add("order_status_tab_text_selected");
};

const orderStatusDescriptionBodyHeader = (orderStatus, orderStatusId) => {
  let heading;

  if (orderStatus == "Awaiting Quote") {
    heading = "Awaiting Quote";
  } else if (orderStatus == "Awaiting Payment") {
    heading = "Waiting for Your Payment";
  } else if (orderStatus == "Awaiting Payment Confirmation") {
    heading = "Awaiting Payment Confirmation";
  } else if (orderStatus == "Printing Order") {
    heading = "Awaiting Your Order's Completion";
  } else if (orderStatus == "Ready for Pickup") {
    heading = "Waiting for Pickup";
  } else if (orderStatus == "Ready for Shipping") {
    heading = "Wait while We Ship Your Order";
  } else if (orderStatus == "Order Shipped") {
    heading = "Wait for Your Shipment's Arrival";
  } else if (orderStatus == "Order Completed") {
    heading = "Your Order has been Completed";
  }

  const orderStatusDescriptionBodyHeaderHTML =
    "<div id='order_status_description_heading_body'>" +
    "<div id='order_status_description_heading_text'>" +
    heading +
    "</div>" +
    "</div>";

  document
    .querySelector("#" + orderStatusId + "_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyHeaderHTML);
};

/* PARTS OPTIONS */
const constructOrderDetailsOrderOptionsDetails = (order, orderStatusId) => {
  const orderDetailsOrderOptionsHeaderHTML =
    "<div class='order_details_order_options_header'>Parts:</div>";
  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderOptionsHeaderHTML);
  order.parts.forEach(ele => {
    const orderDetailsPartDetailsHTML =
      "<div class='order_details_part_details_body'>" +
      "<div class='order_details_part_details_file_name_body'>" +
      "<div class='order_details_part_details_file_name_content'>" +
      ele.fileName +
      "</div>" +
      "</div>" +
      "<div class='order_details_part_details_quantity_body'>" +
      "<div class='order_details_part_details_quantity_header'>Quantity:</div>" +
      "<div class='order_details_part_details_quantity_content'>" +
      ele.producedQuantity +
      "/" +
      ele.orderQuantity +
      "</div>" +
      "</div>" +
      "<div class='order_details_part_details_price_body'>" +
      "<div class='order_details_part_details_price_header'>Price:</div>" +
      "<div class='order_details_part_details_price_content'>Pending</div>" +
      "</div>" +
      "</div>";

    document
      .querySelector("#" + orderStatusId + "_order_options_details_body")
      .insertAdjacentHTML("beforeend", orderDetailsPartDetailsHTML);
  });
};

/* ORDER DETAILS ATTACHMENTS */
const constructOrderDetailsAttachments = (order, orderStatusId) => {
  const orderDetailsAttachmentsStructureHTML =
    "<div class='order_details_attachments_header'>Attachments:</div>" +
    "<div id='order_details_add_attachment_body'></div>" +
    "<div id='order_details_attachments_body'></div>";
  document
    .querySelector("#" + orderStatusId + "_order_details_attached_files_body")
    .insertAdjacentHTML("beforeend", orderDetailsAttachmentsStructureHTML);
};
