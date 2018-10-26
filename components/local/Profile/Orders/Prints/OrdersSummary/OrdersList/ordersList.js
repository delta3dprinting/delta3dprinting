/* ================================ INITIALISATION ================================ */

const profileOrdersPrintsOrdersListInit = () => {
  addProfileOrdersPrintsOrdersListBody();
  addProfileOrdersPrintsOrdersListTableHeader();
  addProfileOrdersPrintsOrdersListContentBody();
  loadProfileOrdersPrintsOrdersListTableContents();
};

/* ============================ ORDERS LIST MAIN BODY ============================= */

const addProfileOrdersPrintsOrdersListBody = () => {
  const profileOrdersPrintsOrdersListBodyHTML =
    "<div id='profile_orders_prints_orders_list_body'></div>";
  document
    .querySelector("#profile_orders_prints_orders_summary_body")
    .insertAdjacentHTML("beforeend", profileOrdersPrintsOrdersListBodyHTML);
};

/* ================================= ORDERS LIST ================================== */

/* --------------------------------- CREATE TABLE --------------------------------- */

const addProfileOrdersPrintsOrdersListTableHeader = () => {
  const profileOrdersPrintsOrdersListTableHeaderHTML =
    "<div id='profile_orders_prints_orders_list_table_header_main_body'>" +
    "<table class='profile_orders_prints_orders_list_table'>" +
    "<thead id='profile_orders_prints_orders_list_table_header_body'>" +
    "<tr id='profile_orders_prints_orders_list_table_header_row' class='profile_orders_prints_orders_list_table_row'>" +
    "<th id='profile_orders_prints_orders_list_order_number_header' class='profile_orders_prints_orders_list_table_header profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_order_number_content'>Order No.</th>" +
    "<th id='profile_orders_prints_orders_list_creation_date_header' class='profile_orders_prints_orders_list_table_header profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_creation_date_content'>Date of Creation</th>" +
    "<th id='profile_orders_prints_orders_list_status_header' class='profile_orders_prints_orders_list_table_header profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_status_content'>Status</th>" +
    "<th id='profile_orders_prints_orders_list_last_update_header' class='profile_orders_prints_orders_list_table_header profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_update_content'>Last Update</th>" +
    "<th id='profile_orders_prints_orders_list_quantity_header' class='profile_orders_prints_orders_list_table_header profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_quantity_content'>Quantity</th>" +
    "<th id='profile_orders_prints_orders_list_deadline_header' class='profile_orders_prints_orders_list_table_header profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_deadline_content'>Deadline</th>" +
    "<th id='profile_orders_prints_orders_list_print_setting_header' class='profile_orders_prints_orders_list_table_header profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_print_setting_content'>Print Setting</th>" +
    "</tr>" +
    "</thead>" +
    "</table>" +
    "</div>";
  document
    .querySelector("#profile_orders_prints_orders_list_body")
    .insertAdjacentHTML(
      "beforeend",
      profileOrdersPrintsOrdersListTableHeaderHTML
    );
};

const addProfileOrdersPrintsOrdersListContentBody = () => {
  const profileOrdersPrintsOrdersListContentBodyHTML =
    "<div id='profile_orders_prints_orders_list_table_content_main_body'></div>";
  document
    .querySelector("#profile_orders_prints_orders_list_body")
    .insertAdjacentHTML(
      "beforeend",
      profileOrdersPrintsOrdersListContentBodyHTML
    );
};

const loadProfileOrdersPrintsOrdersListTableContents = () => {
  if (
    document.querySelector(
      "#profile_orders_prints_orders_list_table_content_main_body"
    )
  ) {
    document.querySelector(
      "#profile_orders_prints_orders_list_table_content_main_body"
    ).innerHTML = loaderElement;
    $.ajax({
      type: "GET",
      url: "/orders",
      success: data => {
        addProfileOrdersPrintsOrdersListTableContents(data);
      }
    });
  }
};

const addProfileOrdersPrintsOrdersListTableContents = objArr => {
  // Table Body
  const profileOrdersPrintsOrdersListTableBodyHTML =
    "<table class='profile_orders_prints_orders_list_table'>" +
    "<tbody id='profile_orders_prints_orders_list_table_content_body'></tbody>" +
    "</table>";
  document.querySelector(
    "#profile_orders_prints_orders_list_table_content_main_body"
  ).innerHTML = profileOrdersPrintsOrdersListTableBodyHTML;
  // Populate the Table with Contents
  objArr.forEach(ele => {
    let totalOrderedQuantity = 0;
    let totalProducedQuantity = 0;
    let deadline = "";

    for (i = 0; i < ele.parts.length; i++) {
      totalOrderedQuantity += Number(ele.parts[i].orderQuantity);
      totalProducedQuantity += Number(ele.parts[i].producedQuantity);
    }

    if (!ele.deadline) {
      deadline = "---";
    } else {
      deadline = ele.deadline;
    }

    const profileOrdersPrintsOrdersListTableContent =
      "<tr id='profile_orders_prints_order_number_" +
      ele.orderNumber +
      "' class='profile_orders_prints_orders_list_table_row'>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_order_number_content'>" +
      ele.orderNumber +
      "</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_creation_date_content'>" +
      ele.creationDate +
      "</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_status_content'>" +
      ele.orderStatus +
      "</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_update_content'>" +
      ele.lastUpdateDate +
      "</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_quantity_content'>" +
      totalProducedQuantity +
      "/" +
      totalOrderedQuantity +
      "</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_deadline_content'>" +
      deadline +
      "</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_print_setting_content'>" +
      ele.pricing +
      ", " +
      ele.delivery +
      "</td>" +
      "</tr>";
    document
      .querySelector("#profile_orders_prints_orders_list_table_content_body")
      .insertAdjacentHTML(
        "beforeend",
        profileOrdersPrintsOrdersListTableContent
      );
    document
      .querySelector("#profile_orders_prints_order_number_" + ele.orderNumber)
      .addEventListener("click", () => {
        viewOrderDetails(ele.orderNumber);
      });
  });
};
