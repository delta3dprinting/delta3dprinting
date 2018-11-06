/* ======================================= INITIALISATION ======================================= */

const readyForPickupInit = order => {
  const orderStatusId = order.orderStatus.toLowerCase().replace(/ /g, "_");
  constructOrderDetailsReadyForPickupModal(order, orderStatusId);
  constructHTMLStructure(orderStatusId);
  orderStatusDescriptionBodyTabs(orderStatusId, order.delivery);
  orderStatusDescriptionBodyHeader(order.orderStatus, orderStatusId);
  constructOrderDetailsOrderOptionsDetails(order, orderStatusId);
  constructOrderDetailsAttachments(order, orderStatusId);
  constructOrderDetailsComments(order, orderStatusId);
  readyForPickupDescriptionBodyDetails(order);
};

/* =========================================== MODAL ============================================ */

const constructOrderDetailsReadyForPickupModal = (order, orderStatusId) => {
  // ELEMENTS
  const orderDetailsReadyForPickupModalHeader = orderDetailsModalHeader;
  const orderDetailsReadyForPickupModalFooter =
    "<div class='order_details_footer_buttons_body'>" +
    "<div class='order_details_footer_button'>" +
    "<div class='order_details_footer_button_text'>Request Refund</div>" +
    "</div>" +
    "</div>";
  const orderDetailsReadyForPickupModalElementObject = new modalElementObject(
    orderStatusId,
    orderDetailsReadyForPickupModalHeader,
    orderDetailsReadyForPickupModalFooter
  );
  // CSS
  const orderDetailsReadyForPickupModalMobileHeight = 90;
  const orderDetailsReadyForPickupModalMobileWidth = 90;
  const orderDetailsReadyForPickupModalDesktopHeight = 90;
  const orderDetailsReadyForPickupModalDesktopWidth = 60;
  const orderDetailsReadyForPickupModalFooterHeight = 14;
  const orderDetailsReadyForPickupModalCSSObject = new modalCSSObject(
    orderDetailsReadyForPickupModalMobileHeight,
    orderDetailsReadyForPickupModalMobileWidth,
    orderDetailsReadyForPickupModalDesktopHeight,
    orderDetailsReadyForPickupModalDesktopWidth,
    orderDetailsReadyForPickupModalFooterHeight
  );

  addModal(
    orderDetailsReadyForPickupModalElementObject,
    orderDetailsReadyForPickupModalCSSObject
  );
};

/* ========================== CONSTRUCT ORDER STATUS DESCRIPTION BODY =========================== */

const readyForPickupDescriptionBodyDetails = order => {
  const instructionOne = "Book a pickup time using the form below";
  const instructionTwo =
    "Send a text to <strong>+64 211 543 805</strong> before heading to the pickup destination (before you leave your place)";
  const instructionThree =
    "Send a text upon arrival on the pickup destination, and enter through the garage upon opening";

  const orderStatusDescriptionBodyDetailsHTML =
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "We have finished printing your order! You can now pickup your order at:" +
    "</div>" +
    "</div>" +
    "<div class='order_details_ready_for_pickup_address_body'>" +
    "<div class='order_details_ready_for_pickup_address_text'>" +
    "16 Dapple Place," +
    "</div>" +
    "<div class='order_details_ready_for_pickup_address_text'>" +
    "Flat Bush," +
    "</div>" +
    "<div class='order_details_ready_for_pickup_address_text'>" +
    "Auckland, 2019," +
    "</div>" +
    "<div class='order_details_ready_for_pickup_address_text'>" +
    "New Zealand," +
    "</div>" +
    "</div>" +
    "<div class='order_status_description_details_body'>" +
    "<div class='order_status_description_details_text'>" +
    "Please Follow the instructions below:" +
    "</div>" +
    "</div>" +
    "<div class='order_details_ready_for_pickup_instruction_body'>" +
    "<div class='order_details_ready_for_pickup_instruction_number'>" +
    "1." +
    "</div>" +
    "<div class='order_details_ready_for_pickup_instruction_text'>" +
    instructionOne +
    "</div>" +
    "</div>" +
    "<div class='order_details_ready_for_pickup_instruction_body'>" +
    "<div class='order_details_ready_for_pickup_instruction_number'>" +
    "2." +
    "</div>" +
    "<div class='order_details_ready_for_pickup_instruction_text'>" +
    instructionTwo +
    "</div>" +
    "</div>" +
    "<div class='order_details_ready_for_pickup_instruction_body'>" +
    "<div class='order_details_ready_for_pickup_instruction_number'>" +
    "3." +
    "</div>" +
    "<div class='order_details_ready_for_pickup_instruction_text'>" +
    instructionThree +
    "</div>" +
    "</div>";

  document
    .querySelector("#ready_for_pickup_order_status_description_body")
    .insertAdjacentHTML("beforeend", orderStatusDescriptionBodyDetailsHTML);

  constructReadyForPickupBookingForm(order);
};

/* ========================================== BOOKING =========================================== */

/* ------------------------------------ PICKUP BOOKING FORM ------------------------------------- */

const constructReadyForPickupBookingForm = order => {
  const readyForPickupBookingFormHTML =
    "<div id='ready_for_pickup_booking_form_body'>" +
    "<div id='ready_for_pickup_booking_form_header'>" +
    "<div id='ready_for_pickup_booking_form_header_text'>" +
    "Booking Form:" +
    "</div>" +
    "</div>" +
    "<div class='ready_for_pickup_booking_form_input_field'>" +
    "<div class='ready_for_pickup_booking_form_input_field_header'>" +
    "<div class='ready_for_pickup_booking_form_input_field_header_text'>Date:</div>" +
    "</div>" +
    "<div class='ready_for_pickup_booking_form_input_body'>" +
    "<select id='ready_for_pickup_booking_date_input' class='ready_for_pickup_booking_form_input_select'>" +
    "<option value='empty'></option>" +
    "</select>" +
    "<select id='ready_for_pickup_booking_month_input' class='ready_for_pickup_booking_form_input_select'>" +
    "<option value='empty'></option>" +
    "</select>" +
    "<select id='ready_for_pickup_booking_year_input' class='ready_for_pickup_booking_form_input_select'>" +
    "<option value='empty'></option>" +
    "</select>" +
    "</div>" +
    "</div>" +
    "<div class='ready_for_pickup_booking_form_input_field'>" +
    "<div id='ready_for_pickup_booking_time_input_field_header' class='ready_for_pickup_booking_form_input_field_header'>" +
    "<div class='ready_for_pickup_booking_form_input_field_header_text'>Time:</div>" +
    "</div>" +
    "<div id='ready_for_pickup_booking_time_input_body' class='ready_for_pickup_booking_form_input_body'>" +
    "<select id='ready_for_pickup_booking_hour_input' class='ready_for_pickup_booking_form_input_select'>" +
    "<option value='empty'></option>" +
    "</select>" +
    "<select id='ready_for_pickup_booking_minute_input' class='ready_for_pickup_booking_form_input_select'>" +
    "<option value='empty'></option>" +
    "</select>" +
    "<select id='ready_for_pickup_booking_period_input' class='ready_for_pickup_booking_form_input_select'>" +
    "<option value='empty'></option>" +
    "</select>" +
    "</div>" +
    "<div class='ready_for_pickup_booking_form_error_body'>" +
    "<div id='ready_for_pickup_booking_form_error_text'></div>" +
    "</div>" +
    "</div>" +
    "<div id='ready_for_pickup_booking_form_button_body'>" +
    "<div id='ready_for_pickup_booking_form_button'>" +
    "<div id='ready_for_pickup_booking_form_button_text'>Book</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  document
    .querySelector("#ready_for_pickup_order_status_description_body")
    .insertAdjacentHTML("beforeend", readyForPickupBookingFormHTML);

  pickupDateSelectOptions(
    document.querySelector("#ready_for_pickup_booking_date_input"),
    document.querySelector("#ready_for_pickup_booking_month_input"),
    document.querySelector("#ready_for_pickup_booking_year_input")
  );

  pickupTimeSelectOptions(
    document.querySelector("#ready_for_pickup_booking_hour_input"),
    document.querySelector("#ready_for_pickup_booking_minute_input"),
    document.querySelector("#ready_for_pickup_booking_period_input")
  );

  if (order.pickupBookingSchedule) {
    populateOrderDetailsReadyForPickupBookingForm(order.pickupBookingSchedule);
  }

  document
    .querySelector("#ready_for_pickup_booking_form_button")
    .addEventListener("click", () => {
      submitOrderDetailsReadyForPickupBookingForm(order);
    });
};

/* ----------------------------------- DATE AND TIME OPTIONS ------------------------------------ */

const pickupDateSelectOptions = (
  dateSelectElement,
  monthSelectElement,
  yearSelectMonth
) => {
  const dateObject = dateFormatter(new Date());
  let dateArray = [];
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let yearArray = [];

  for (i = 0; i < 31; i++) {
    dateArray[i] = i + 1;
  }

  for (i = 0; i < 2; i++) {
    yearArray[i] = Number(dateObject.year) + i;
  }

  dateArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    dateSelectElement.insertAdjacentHTML("beforeend", optionHTML);
  });

  monthArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    monthSelectElement.insertAdjacentHTML("beforeend", optionHTML);
  });

  yearArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    yearSelectMonth.insertAdjacentHTML("beforeend", optionHTML);
  });
};

const pickupTimeSelectOptions = (
  hourSelectElement,
  minuteSelectElement,
  periodSelectMonth
) => {
  let hourArray = [];
  let minuteArray = [];
  const periodArray = ["AM", "PM"];

  for (i = 0; i < 12; i++) {
    hourArray[i] = i + 1;
  }

  for (i = 0; i < 12; i++) {
    minuteArray[i] = i * 5;
  }

  hourArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    hourSelectElement.insertAdjacentHTML("beforeend", optionHTML);
  });

  minuteArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    minuteSelectElement.insertAdjacentHTML("beforeend", optionHTML);
  });

  periodArray.forEach(element => {
    const optionHTML = "<option value=" + element + ">" + element + "</option>";

    periodSelectMonth.insertAdjacentHTML("beforeend", optionHTML);
  });
};

/* ----------------------------------- POPULATE BOOKING FORM ------------------------------------ */

const populateOrderDetailsReadyForPickupBookingForm = pickupBookingSchedule => {
  document.querySelector("#ready_for_pickup_booking_date_input").value =
    pickupBookingSchedule.date;
  document.querySelector("#ready_for_pickup_booking_month_input").value =
    pickupBookingSchedule.month;
  document.querySelector("#ready_for_pickup_booking_year_input").value =
    pickupBookingSchedule.year;
  document.querySelector("#ready_for_pickup_booking_hour_input").value =
    pickupBookingSchedule.hour;
  document.querySelector("#ready_for_pickup_booking_minute_input").value =
    pickupBookingSchedule.minute;
  document.querySelector("#ready_for_pickup_booking_period_input").value =
    pickupBookingSchedule.period;
};

/* --------------------------------------- SUBMIT BOOKING --------------------------------------- */

const submitOrderDetailsReadyForPickupBookingForm = order => {
  if (!collectAndValidateBookingFormInputs()) {
    return;
  }

  $.ajax({
    type: "POST",
    url: "/order/book-pickup",
    data: JSON.stringify({
      orderNumber: order.orderNumber,
      bookingFormInputsObject: bookingFormInputsObject
    }),
    contentType: "application/json",
    success: data => {
      console.log(data);
    }
  });
};

/* -------------------------------- COLLECT BOOKING FORM INPUTS --------------------------------- */

let bookingFormInputsObject;

const collectAndValidateBookingFormInputs = () => {
  bookingFormInputsObject = {
    date: document.querySelector("#ready_for_pickup_booking_date_input").value,
    month: document.querySelector("#ready_for_pickup_booking_month_input")
      .value,
    year: document.querySelector("#ready_for_pickup_booking_year_input").value,
    hour: document.querySelector("#ready_for_pickup_booking_hour_input").value,
    minute: document.querySelector("#ready_for_pickup_booking_minute_input")
      .value,
    period: document.querySelector("#ready_for_pickup_booking_period_input")
      .value
  };

  let bookingFormInputsValidity = true;
  let errorMessage = "requires ";

  for (component in bookingFormInputsObject) {
    if (bookingFormInputsObject[component] == "empty") {
      if (bookingFormInputsValidity) {
        errorMessage = errorMessage + component;
      } else {
        errorMessage = errorMessage + ", " + component;
      }
      bookingFormInputsValidity = false;
    }
  }

  if (!bookingFormInputsValidity) {
    document.querySelector(
      "#ready_for_pickup_booking_form_error_text"
    ).innerHTML = errorMessage;
  } else {
    document.querySelector(
      "#ready_for_pickup_booking_form_error_text"
    ).innerHTML = "";
  }

  return bookingFormInputsValidity;
};

/* ============================================================================================== */
