// Initialisation
const sideDrawerToggleInit = () => {
  document
    .querySelector("#toolbar")
    .insertAdjacentHTML("afterbegin", sideDrawerToggleHTML);
  sideDrawerToggleStyle = document.querySelector("#side_drawer_toggle").style;
};

// Side Drawer Toggle
const sideDrawerToggleHTML =
  "<div id='side_drawer_toggle' onclick='toggleSideDrawer();'>" +
  "<div class='drawer'></div>" +
  "<div class='drawer'></div>" +
  "<div class='drawer'></div>" +
  "</div>";

// Side Drawer Toggled
let sideDrawerToggleStatus = false;
// Styling Prefix
let sideDrawerToggleStyle;

const toggleSideDrawer = () => {
  if (profileDrawerToggleStatus) {
    toggleProfileDrawer();
  }

  if (sideDrawerToggleStatus) {
    // Change Side Draw Toggle Stylings
    sideDrawerToggleStyle.backgroundColor = "rgb(170, 10, 10)";

    // Hide Drawer
    sideDrawerPointer.style.transform = "translateX(-100%)";

    // Remove Backdrop
    removeBackdrop();

    // Change Toggle Status
    sideDrawerToggleStatus = false;
  } else {
    // Change Side Draw Toggle Stylings
    sideDrawerToggleStyle.backgroundColor = "rgb(200, 20, 20)";

    // Show Drawer
    sideDrawerPointer.style.transform = "translateX(0)";

    // Add Backdrop
    addBackdrop();
    backdropPointer.addEventListener("click", toggleSideDrawer);

    // Change Toggle Status
    sideDrawerToggleStatus = true;
  }
};
