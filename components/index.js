// Declare Pointer Variables
let rootPointer;
let toolbarPointer;
let bodyPointer;
let footerPointer;

// Declare Login Status Variable
let loginStatus;

// Global Initialisation
window.onload = () => {
  rootPointer = document.querySelector("#root");
  createMainPointers();
  isUserLoggedIn(rootPointer, windowOnloadInit);
};

const windowOnloadInit = () => {
  console.log(loginStatus);
  constructRootBaseElements();
  createMainPointers();
  sideDrawerInit();
  profileIconInit();
  footerInit();
  homepageInit();
};

// Construct the Base Elements of the Root Element
const constructRootBaseElements = () => {
  const rootBaseElementsHTML =
    "<div id='toolbar'></div>" +
    "<div id='body'></div>" +
    "<div id='footer'></div>";

  rootPointer.insertAdjacentHTML("beforeend", rootBaseElementsHTML);
};

// Assign Pointers
const createMainPointers = () => {
  toolbarPointer = document.querySelector("#toolbar");
  bodyPointer = document.querySelector("#body");
  footerPointer = document.querySelector("#footer");
};
