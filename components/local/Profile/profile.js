// Initialisation
const profileInit = () => {
  bodyPointer.innerHTML = "";
  profileDrawerElements();
  drawerInit(drawerElements);
  addProfileBaseHTML();
  contructProfileNavigation();
};

const profileDrawerElements = () => {
  drawerElements = [
    new SideDrawerObject("home-sidedrawer", "Home", homepageInit),
    new SideDrawerObject("pricing-sidedrawer", "Pricing", pricingInit)
  ];
};

// Create profile base HTML
const profileBaseHTML =
  "<div id='profile_body'>" +
  "<div id='profile_navigation_tabs_body'></div>" +
  "<div id='profile_components_body'></div>" +
  "</div>";
// Add the profile base HTML
const addProfileBaseHTML = () => {
  bodyPointer.insertAdjacentHTML("beforeend", profileBaseHTML);
};

/* ======================== PROFILE TAB OBJECT CONSTRUCTOR ======================== */

class profileComponentObject {
  constructor(id, name, method) {
    this.id = id;
    this.name = name;
    this.method = method;
  }
}

/* ====================== CREATE THE PROFILE NAVIGATION TABS ====================== */
// Keep track of what tab is selected
let selectedProfileComponentId;

let profileComponentObjectsArray;

// Contruct the profile naviagtion
const contructProfileNavigation = () => {
  constructProfileComponentObjectsArray();
  constructProfileNavigationTabs(profileComponentObjectsArray);
  selectProfileNavigationTab(profileComponentObjectsArray[0]);
};

// Construct the profile component objects array
const constructProfileComponentObjectsArray = () => {
  // Assign Object Values
  contructProfileDashboardObject();
  contructProfileOrdersObject();
  contructProfileSettingsObject();
  // Assign Object Array Value
  profileComponentObjectsArray = [
    profileDashboardObject,
    profileOrdersObject,
    profileSettingsObject
  ];
};

// Contruct the profile navigation tabs
const constructProfileNavigationTabs = objArr => {
  // Determine the width of each tabs
  const profileNavigationTabWidth = 100 / objArr.length + "%";
  objArr.forEach(obj => {
    // Create the profile navigation tab HTML
    const profileNavigationTabHTML =
      "<div id='" +
      obj.id +
      "_profile_navigation_tab_body' class='profile_navigation_tab_body' style='width:" +
      profileNavigationTabWidth +
      "'>" +
      "<div id='" +
      obj.id +
      "_profile_navigation_tab_text' class='profile_navigation_tab_text'>" +
      obj.name +
      "</div>" +
      "</div>";
    // Add the HTML to the navigation tabs body
    document
      .querySelector("#profile_navigation_tabs_body")
      .insertAdjacentHTML("beforeend", profileNavigationTabHTML);
    // Add Event Listener for Tab Selection
    document
      .querySelector("#" + obj.id + "_profile_navigation_tab_body")
      .addEventListener("click", () => {
        selectProfileNavigationTab(obj);
      });
  });
};

// Select Profile Navigation Tab
const selectProfileNavigationTab = obj => {
  // First, deselect any selected tab
  deselectProfileNavigationTab();

  // Create a pointer
  const pointer = document.querySelector(
    "#" + obj.id + "_profile_navigation_tab_body"
  );

  // Change CSS Stylings
  pointer.style.opacity = "1";
  pointer.style.backgroundColor = "rgb(245, 245, 245)";
  pointer.style.borderStyle = "none none solid none";
  document.querySelector(
    "#" + obj.id + "_profile_navigation_tab_text"
  ).style.color = "rgb(170, 10, 10)";

  // Execute selected tab's method
  // Clear Page
  document.querySelector("#profile_components_body").innerHTML = "";
  obj.method();

  // Update selected tab
  selectedProfileComponentId = obj.id;
};

// Deselect Profile Navigation Tab
const deselectProfileNavigationTab = () => {
  if (!selectedProfileComponentId) {
    return;
  }

  const pointer = document.querySelector(
    "#" + selectedProfileComponentId + "_profile_navigation_tab_body"
  );

  // Change CSS Stylings
  pointer.style.opacity = "0.3";
  pointer.style.backgroundColor = "rgb(170, 10, 10)";
  pointer.style.borderStyle = "none none none none";
  document.querySelector(
    "#" + selectedProfileComponentId + "_profile_navigation_tab_text"
  ).style.color = "white";
};
