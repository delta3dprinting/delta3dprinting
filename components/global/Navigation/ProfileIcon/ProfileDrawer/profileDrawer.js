const profileDrawerInit = () => {
  rootPointer.insertAdjacentHTML("afterbegin", profileDrawerHTML);
  profileDrawerPointer = document.querySelector("#profile_drawer_body");
  if (loginStatus) {
    addProfileDrawerElements(userProfileObject());
  } else {
    addProfileDrawerElements(visitorProfileObject());
  }
};

const profileDrawerHTML = "<div id='profile_drawer_body'></div>";

let profileDrawerPointer;

let profileDrawerToggleStatus = false;

const toggleProfileDrawer = () => {
  if (sideDrawerToggleStatus) {
    toggleSideDrawer();
  }

  if (profileDrawerToggleStatus) {
    closeProfileDrawer();
    profileDrawerToggleStatus = false;
  } else {
    openProfileDrawer();
    profileDrawerToggleStatus = true;
  }
};

const openProfileDrawer = () => {
  profileDrawerPointer.style.transform = "translateX(0)";

  // Add Backdrop
  addBackdrop();
  backdropPointer.addEventListener("click", toggleProfileDrawer);
};

const closeProfileDrawer = () => {
  profileDrawerPointer.style.transform = "translateX(100%)";

  // Remove Backdrop
  removeBackdrop();
};

// Populate Profile Drawer
const addProfileDrawerElements = objArr => {
  // Set Height of Side Drawer
  const sideDrawerHeight = objArr.length * 16 + "vmin";
  profileDrawerPointer.style.height = sideDrawerHeight;

  objArr.forEach(ele => {
    // Create Drawer HTML
    const drawerHTML =
      '<div id="' +
      ele.id +
      '_profile_drawer_element" class="profile_drawer_element">' +
      ele.name +
      "</div>";

    profileDrawerPointer.insertAdjacentHTML("beforeend", drawerHTML);

    document
      .querySelector("#" + ele.id + "_profile_drawer_element")
      .addEventListener("click", () => {
        toggleProfileDrawer();
        ele.method();
      });
  });
};
