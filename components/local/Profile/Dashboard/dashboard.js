// Profile Dashboard Object
let profileDashboardObject;

// Profile Dashboard Object Properties
const profileDashboardId = "dashboard";
const profileDashboardName = "Dashboard";
const profileDashboardMethod = () => {
  console.log("Profile Dashboard");
  addProfileDashboardBody();
  addProfileDashboardHeader();
};

// Contruct Profile Dashboard Object
const contructProfileDashboardObject = () => {
  profileDashboardObject = new profileComponentObject(
    profileDashboardId,
    profileDashboardName,
    profileDashboardMethod
  );
};

// Add Dashboard Body HTML
const addProfileDashboardBody = () => {
  // Dashboard Body HTML
  const profileDashboardBodyHTML =
    "<div id='profile_dashboard_body' class='profile_component_body'></div>";
  // Insert HTML
  document
    .querySelector("#profile_components_body")
    .insertAdjacentHTML("beforeend", profileDashboardBodyHTML);
};

// Add Dashboard Header
const addProfileDashboardHeader = () => {
  // Dashboard Header HTML
  const profileDashboardHeaderHTML =
    "<div id='profile_dashboard_header'>" +
    "<div id='profile_dashboard_header_text'>" +
    "Name" +
    "'s Dashboard</div>" +
    "</div>";

  document
    .querySelector("#profile_dashboard_body")
    .insertAdjacentHTML("beforeend", profileDashboardHeaderHTML);
};

// Add Dashboard Components
const addProfileDashboardComponents = () => {};
