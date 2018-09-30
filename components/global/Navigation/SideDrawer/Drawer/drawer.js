// Initialisation
const drawerInit = objArr => {
  addDrawerElements(objArr);
};

const addDrawerElements = objArr => {
  // Set Height of Side Drawer
  const sideDrawerHeight = objArr.length * 16 + "vmin";
  sideDrawerPointer.style.height = sideDrawerHeight;

  objArr.forEach(ele => {
    // Create Drawer HTML
    const drawerHTML =
      '<div id="' + ele.id + '" class="drawer_element">' + ele.name + "</div>";

    sideDrawerPointer.insertAdjacentHTML("beforeend", drawerHTML);

    document.querySelector("#" + ele.id).addEventListener("click", () => {
      toggleSideDrawer();
      ele.method();
    });
  });
};
