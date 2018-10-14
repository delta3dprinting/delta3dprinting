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
    "<th id='profile_orders_prints_orders_list_file_header' class='profile_orders_prints_orders_list_table_header profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_file_content'>File</th>" +
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
  document.querySelector(
    "#profile_orders_prints_orders_list_table_content_main_body"
  ).innerHTML = loaderElement;
  $.ajax({
    type: "GET",
    url: "/orders",
    success: data => {
      console.log(data);
      addProfileOrdersPrintsOrdersListTableContents(data);
    }
  });
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
    const profileOrdersPrintsOrdersListTableContent =
      "<tr class='profile_orders_prints_orders_list_table_row'>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_order_number_content'>Order No.</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_file_content'>" +
      ele.filename +
      "</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_status_content'>" +
      ele.orderStatus +
      "</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_update_content'>Last Update</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_quantity_content'>" +
      ele.producedQuantity +
      "/" +
      ele.orderedQuantity +
      "</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_deadline_content'>Deadline</td>" +
      "<td class='profile_orders_prints_orders_list_table_content_text profile_orders_prints_orders_list_table_content profile_orders_prints_orders_list_print_setting_content'>" +
      ele.quality +
      ", " +
      ele.strength +
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
  });
};
