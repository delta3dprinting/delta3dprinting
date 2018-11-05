/* ======================================= INITIALISATION ======================================= */

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
      } else if (data.orderStatus == "Ready for Pickup") {
        readyForPickupInit(data);
      } else if (data.orderStatus == "Order Picked Up") {
        orderPickedUpInit(data);
      } else if (data.orderStatus == "Ready for Shipping") {
        readyForShippingInit(data);
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
  return orderStatus.toLowerCase().replace(/ /g, "_");
};

/* MODAL */
const orderDetailsModalHeader = "Order Details";

/* ======================================= HTML STRUCTURE ======================================= */

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

/* =============================== ORDER STATUS DESCRIPTION BODY ================================ */

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
    .querySelector("#" + orderStatusId + "_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyTabsHTML);

  if (delivery == "Pickup") {
    const orderStatusPickupTabsHTML =
      "<div id='ready_for_pickup_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='ready_for_pickup_order_status_tab_text' class='order_status_tab_text'>" +
      "Ready for Pickup" +
      "</div>" +
      "</div>" +
      "<div id='order_pickedup_order_status_tab_body' class='order_status_tab_body'>" +
      "<div id='order_pickedup_order_status_tab_text' class='order_status_tab_text'>" +
      "Order Picked Up" +
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
  } else if (orderStatus == "Order Picked Up") {
    heading = "You have Picked Up Your Order";
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

/* =================================== ORDER OPTIONS DETAILS ==================================== */

let orderDetailsTotalOrderPrice;

const constructOrderDetailsOrderOptionsDetails = (order, orderStatusId) => {
  orderDetailsTotalOrderPrice = 0;

  const orderDetailsOrderOptionsHeaderHTML =
    "<div class='order_details_order_options_header'>Parts:</div>";
  document
    .querySelector("#" + orderStatusId + "_order_options_details_body")
    .insertAdjacentHTML("beforeend", orderDetailsOrderOptionsHeaderHTML);

  for (i = 0; i < order.parts.length; i++) {
    $.ajax({
      type: "POST",
      async: false,
      url: "/order/price",
      data: JSON.stringify({ fileId: order.parts[i].fileId }),
      contentType: "application/json",
      success: data => {
        let partPriceLabel;
        if (data == "pending") {
          partPriceLabel = "Pending";
        } else {
          const partPrice = Number(
            (Number(data) * Number(order.parts[i].orderQuantity)).toFixed(2)
          );

          orderDetailsTotalOrderPrice = orderDetailsTotalOrderPrice + partPrice;

          partPriceLabel = "$" + partPrice;
        }

        const orderDetailsPartDetailsHTML =
          "<div class='order_details_part_details_body'>" +
          "<div class='order_details_part_details_file_name_body'>" +
          "<div class='order_details_part_details_file_name_content'>" +
          order.parts[i].fileName +
          "</div>" +
          "</div>" +
          "<div class='order_details_part_details_quantity_body'>" +
          "<div class='order_details_part_details_quantity_header'>Quantity:</div>" +
          "<div class='order_details_part_details_quantity_content'>" +
          order.parts[i].producedQuantity +
          "/" +
          order.parts[i].orderQuantity +
          "</div>" +
          "</div>" +
          "<div class='order_details_part_details_price_body'>" +
          "<div class='order_details_part_details_price_header'>Price:</div>" +
          "<div class='order_details_part_details_price_content'>" +
          partPriceLabel +
          "</div>" +
          "</div>" +
          "</div>";

        document
          .querySelector("#" + orderStatusId + "_order_options_details_body")
          .insertAdjacentHTML("beforeend", orderDetailsPartDetailsHTML);
      }
    });
  }
};

/* ================================ ORDER DETAILS ATTACHED FILES ================================ */

const constructOrderDetailsAttachments = (order, orderStatusId) => {
  const orderDetailsAttachmentsStructureHTML =
    "<div class='order_details_attachments_header'>Attachments:</div>" +
    "<div id='order_details_add_attachment_body'></div>" +
    "<div id='order_details_attachments_body'></div>";
  document
    .querySelector("#" + orderStatusId + "_order_details_attached_files_body")
    .insertAdjacentHTML("beforeend", orderDetailsAttachmentsStructureHTML);
};

/* =================================== ORDER DETAILS COMMENTS =================================== */

const constructOrderDetailsComments = (order, orderStatusId) => {
  const orderDetailsCommentsStructureHTML =
    "<div class='order_details_comments_header'>Comments:</div>" +
    "<div id='order_details_add_comment_body'>" +
    "<textarea id='order_details_add_comment_input'></textarea>" +
    "<div id='order_details_add_comment_post_button_body'>" +
    "<div id='order_details_add_comment_post_button'>Post</div>" +
    "</div>" +
    "</div>" +
    "<div id='order_details_comments_body'></div> ";

  document
    .querySelector("#" + orderStatusId + "_order_details_comments_body")
    .insertAdjacentHTML("beforeend", orderDetailsCommentsStructureHTML);

  loadOrderDetailsComments(order.ownerId, order.orderNumber);

  document
    .querySelector("#order_details_add_comment_post_button")
    .addEventListener("click", () => {
      postOrderDetailsComments(order);
    });
};

const postOrderDetailsComments = order => {
  const comment = document.querySelector("#order_details_add_comment_input")
    .value;
  if (!comment) {
    return;
  }

  $.ajax({
    type: "POST",
    url: "/Profile/order-comment",
    contentType: "application/json",
    data: JSON.stringify({ order: order, comment: comment }),
    success: data => {
      loadOrderDetailsComments(data.orderOwnerId, data.orderOrderNumber);
    },
    dataType: "json"
  });
};

const loadOrderDetailsComments = (ownerId, orderNumber) => {
  loadLoader(document.querySelector("#order_details_comments_body")).then(
    () => {
      $.ajax({
        type: "POST",
        url: "/Profile/order-comments",
        contentType: "application/json",
        data: JSON.stringify({ ownerId: ownerId, orderNumber: orderNumber }),
        success: data => {
          populateOrderDetailsComments(data);
        }
      });
    }
  );
};

const orderDetailsCompareDates = (a, b) => {
  if (a.date.year === b.date.year) {
    if (a.date.month[1] === b.date.month[1]) {
      if (a.date.date === b.date.date) {
        if (a.date.hour[1] === b.date.hour[1]) {
          if (a.date.minute === b.date.minute) {
            if (a.date.second === b.date.second) {
              return 0;
            } else if (a.date.second > b.date.second) {
              return -1;
            } else if (a.date.second < b.date.second) {
              return 1;
            }
          } else if (a.date.minute > b.date.minute) {
            return -1;
          } else if (a.date.minute < b.date.minute) {
            return 1;
          }
        } else if (a.date.hour[1] > b.date.hour[1]) {
          return -1;
        } else if (a.date.hour[1] < b.date.hour[1]) {
          return 1;
        }
      } else if (a.date.date > b.date.date) {
        return -1;
      } else if (a.date.date < b.date.date) {
        return 1;
      }
    } else if (a.date.month[1] > b.date.month[1]) {
      return -1;
    } else if (a.date.month[1] < b.date.month[1]) {
      return 1;
    }
  } else if (a.date.year > b.date.year) {
    return -1;
  } else if (a.date.year < b.date.year) {
    return 1;
  }
};

const populateOrderDetailsComments = data => {
  document.querySelector("#order_details_comments_body").innerHTML = "";

  let commentsObjectArray = [];

  class CommentObject {
    constructor(userName, comment, date, ownership) {
      this.userName = userName;
      this.comment = comment;
      this.date = date;
      this.ownership = ownership;
    }
  }
  for (i = 0; i < data.length; i++) {
    commentsObjectArray.push(
      new CommentObject(
        data[i].userName,
        data[i].comment,
        dateFormatter(data[i].dateCreated),
        data[i].ownership
      )
    );
  }
  commentsObjectArray.sort(orderDetailsCompareDates);

  commentsObjectArray.forEach(element => {
    addOrderDetailsComment(element);
  });
};

const addOrderDetailsComment = commentDetail => {
  let orderDetailsCommentHTML;
  if (commentDetail.ownership) {
    orderDetailsCommentHTML =
      "<div class='order_details_comment_body'>" +
      "<div class='order_details_comment'>" +
      "<div class='order_details_comment_date'>" +
      commentDetail.date.fromNow +
      "</div>" +
      "<div class='order_details_comment_text'>" +
      commentDetail.comment +
      "</div>" +
      "</div>" +
      "<div class='order_details_comment_author_details'>" +
      "<div class='order_details_comment_author_profile_picture'></div>" +
      "<div class='order_details_comment_author_profile_name'>" +
      commentDetail.userName +
      "</div>" +
      "</div>" +
      "</div>";
  } else {
    orderDetailsCommentHTML =
      "<div class='order_details_comment_body'>" +
      "<div class='order_details_comment_author_details'>" +
      "<div class='order_details_comment_author_profile_picture'></div>" +
      "<div class='order_details_comment_author_profile_name'>" +
      commentDetail.userName +
      "</div>" +
      "</div>" +
      "<div class='order_details_comment'>" +
      "<div class='order_details_comment_date'>" +
      commentDetail.date.fromNow +
      "</div>" +
      "<div class='order_details_comment_text'>" +
      commentDetail.comment +
      "</div>" +
      "</div>" +
      "</div>";
  }
  document
    .querySelector("#order_details_comments_body")
    .insertAdjacentHTML("beforeend", orderDetailsCommentHTML);
};

/* ============================================================================================== */
