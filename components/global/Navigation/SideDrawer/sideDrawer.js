// Initialisation
const sideDrawerInit = () => {
  addSideDrawer();
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
  document
    .querySelector("#body")
    .insertAdjacentHTML("afterbegin", sideDrawerHTML);

  sideDrawerPointer = document.querySelector("#side_drawer");
};
