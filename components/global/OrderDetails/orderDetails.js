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
