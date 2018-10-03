// Initialisation
const sideDrawerInit = () => {
  addSideDrawer();
  sideDrawerToggleInit();
};

// Add Side Drawer
const sideDrawerHTML = '<div id="side_drawer"></div>';

// Side Drawer Element Pointer
let sideDrawerPointer;

class SideDrawerObject {
  constructor(id, name, method) {
    this.id = id;
    this.name = name;
    this.method = method;
  }
}

const addSideDrawer = () => {
  rootPointer.insertAdjacentHTML("afterbegin", sideDrawerHTML);
  sideDrawerPointer = document.querySelector("#side_drawer");
};
