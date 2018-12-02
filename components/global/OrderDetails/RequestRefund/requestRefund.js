/* ======================================= INITIALISATION ======================================= */

const orderDetailsRequestRefundInit = (orderNumber, orderStatusId) => {
  addOrderDetailsRequestRefundFooter(orderStatusId);
  addOrderDetailsRequestRefundButtonClickListener(orderNumber, orderStatusId);
};

/* ================================= ADD REQUEST REFUND FOOTER ================================== */

const addOrderDetailsRequestRefundFooter = orderStatusId => {
  // Element
  const footerContentElement = document.querySelector(
    "#" + orderStatusId + "_modal_footer_contents"
  );

  const requestRefundFooter =
    "<div id='request_refund_footer_buttons_body' class='order_details_footer_buttons_body request_refund_footer_buttons_body_close'>" +
    "<div id='order_details_request_refund_form_body'></div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='request_refund_send_request_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Send Request</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_details_footer_button_body'>" +
    "<div id='request_refund_cancel_request_footer_button' class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Cancel Request</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  footerContentElement.insertAdjacentHTML("beforeend", requestRefundFooter);

  orderDetailsRequestRefundForm();
};

/* ============================== ADD REQUEST REFUND BUTTON FOOTER ============================== */

const addOrderDetailsRequestRefundButtonClickListener = (
  orderNumber,
  orderStatusId
) => {
  // Elements
  const modalElement = document.querySelector("#" + orderStatusId + "_modal");
  const footerElement = document.querySelector(
    "#" + orderStatusId + "_modal_footer"
  );
  const footerButtonsBodyElement = document.querySelector(
    "#" + orderStatusId + "_footer_buttons_body"
  );

  // Request Refund Button
  document
    .querySelector("#" + orderStatusId + "_request_refund_footer_button")
    .addEventListener("click", () => {
      toggleRequestRefundButton(
        modalElement,
        footerElement,
        footerButtonsBodyElement
      );
    });

  // Cancel Refund Request Button
  document
    .querySelector("#request_refund_cancel_request_footer_button")
    .addEventListener("click", () => {
      toggleRequestRefundButton(
        modalElement,
        footerElement,
        footerButtonsBodyElement
      );
    });

  // Send Refund Request Button
  document
    .querySelector("#request_refund_send_request_footer_button")
    .addEventListener("click", () => {
      submitRefundRequest(orderNumber);
    });
};

/* ======================================== REFUND FORM ========================================= */

const orderDetailsRequestRefundForm = () => {
  // HTML Request Refund Form
  const requestRefundForm =
    "<div class='order_details_request_refund_form'>" +
    "<div class='order_details_request_refund_input_field'>" +
    "<div class='order_details_request_refund_input_header_body'>" +
    "<div class='order_details_request_refund_input_header'>Reason:</div>" +
    "</div>" +
    "<div class='order_details_request_refund_input_body'>" +
    "<textarea id='order_details_request_refund_reason_input' class='order_details_request_refund_input_textarea'></textarea>" +
    "</div>" +
    "<div class='order_details_request_refund_error_body'>" +
    "<div id='order_details_request_refund_reason_error' class='order_details_request_refund_error'></div>" +
    "</div>" +
    "</div>" +
    "</div>";

  // Insert HTML
  document.querySelector(
    "#order_details_request_refund_form_body"
  ).innerHTML = requestRefundForm;
};

/* ========================== TOGGLE REQUEST REFUND OR CANCEL REQUEST =========================== */

let requestRefundToggled = false;

const toggleRequestRefundButton = (
  modalElement,
  footerElement,
  footerButtonsBodyElement
) => {
  // Set new CSS
  footerButtonsBodyElement.classList.toggle(
    "order_details_footer_buttons_body_open"
  );

  document
    .querySelector("#request_refund_footer_buttons_body")
    .classList.toggle("request_refund_footer_buttons_body_open");

  // Screensize
  const screensize = window.matchMedia("(min-width: 600px)");

  screensize.addListener(() => {
    if (screensize.matches) {
      if (!requestRefundToggled) {
        footerElement.style.height = "7vmin";
        footerElement.style.top = "calc(95vh - 7vmin)";
        modalElement.style.paddingBottom = "7vmin";
      } else {
        footerElement.style.height = "22vmin";
        footerElement.style.top = "calc(95vh - 22vmin)";
        modalElement.style.paddingBottom = "22vmin";
      }
    } else {
      if (!requestRefundToggled) {
        footerElement.style.height = "14vmin";
        footerElement.style.top = "calc(95vh - 14vmin)";
        modalElement.style.paddingBottom = "14vmin";
      } else {
        footerElement.style.height = "44vmin";
        footerElement.style.top = "calc(95vh - 44vmin)";
        modalElement.style.paddingBottom = "44vmin";
      }
    }
  });

  if (screensize.matches) {
    if (requestRefundToggled) {
      requestRefundToggled = false;
      footerElement.style.height = "7vmin";
      footerElement.style.top = "calc(95vh - 7vmin)";
      modalElement.style.paddingBottom = "7vmin";
    } else {
      requestRefundToggled = true;
      footerElement.style.height = "22vmin";
      footerElement.style.top = "calc(95vh - 22vmin)";
      modalElement.style.paddingBottom = "22vmin";
    }
  } else {
    if (requestRefundToggled) {
      requestRefundToggled = false;
      footerElement.style.height = "14vmin";
      footerElement.style.top = "calc(95vh - 14vmin)";
      modalElement.style.paddingBottom = "14vmin";
    } else {
      requestRefundToggled = true;
      footerElement.style.height = "44vmin";
      footerElement.style.top = "calc(95vh - 44vmin)";
      modalElement.style.paddingBottom = "44vmin";
    }
  }
};

/* =================================== SUBMIT REFUND REQUEST ==================================== */

const submitRefundRequest = orderNumber => {
  // Validate Input
  validateRefundRequestInputs()
    .then(() => {
      // Validate if Request is Coming from Owner
      validateOrderOwnership(orderNumber)
        .then(() => {
          collectRefundRequestInformation().then(refundRequestInformation => {
            submitRefundRequestInformation(
              orderNumber,
              refundRequestInformation
            );
          });
        })
        .catch(() => {
          return console.log("not owner");
        });
    })
    .catch(() => {
      return console.log("invalid input(s)");
    });
};

/* =============================== VALIDATE REFUND REQUEST INPUTS =============================== */

const validateRefundRequestInputs = () => {
  return new Promise((resolve, reject) => {
    let messageObjectArray = [];
    let validity = true;

    // REASON
    // Input
    const reasonInput = document.querySelector(
      "#order_details_request_refund_reason_input"
    ).value;
    // Element ID
    const reasonErrorElementId = "order_details_request_refund_reason_error";
    // Error Message
    let reasonErrorMessage;

    if (!reasonInput) {
      // Check if any message is provided
      reasonErrorMessage = "please describe your reason";

      messageObjectArray.push(
        new MessageObject(reasonErrorElementId, reasonErrorMessage)
      );

      validity = false;
    } else {
      // If valid, proceed while removing any error message
      reasonErrorMessage = "";

      messageObjectArray.push(
        new MessageObject(reasonErrorElementId, reasonErrorMessage)
      );
    }

    // Display or clear error messages
    displayMessage(messageObjectArray);

    if (validity) {
      resolve(true);
    } else {
      reject(false);
    }
  });
};

/* ===================================== VALIDATE OWNERSHIP ===================================== */

const validateOrderOwnership = orderNumber => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/order/check-ownership",
      data: { orderNumber },
      success: data => {
        if (data === "true") {
          resolve(true);
        } else {
          reject(false);
        }
      }
    });
  });
};

/* ============================= SUBMIT REFUND REQUEST INFORMATION ============================== */

const submitRefundRequestInformation = (
  orderNumber,
  refundRequestInformation
) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/order/request-refund",
      contentType: "application/json",
      data: JSON.stringify({ orderNumber, refundRequestInformation }),
      success: data => {
        console.log(data);
      }
    });
  });
};

/* ==================== COLLECT REFUND REQUEST INFORMATION AND CREATE OBJECT ==================== */

// Refund Request Information Object Constructor
class RefundRequestInformationObject {
  constructor(reason) {
    this.reason = reason;
  }
}

const collectRefundRequestInformation = () => {
  return new Promise((resolve, reject) => {
    const reason = document.querySelector(
      "#order_details_request_refund_reason_input"
    ).value;

    resolve(new RefundRequestInformationObject(reason));
  });
};

/* ============================================================================================== */
