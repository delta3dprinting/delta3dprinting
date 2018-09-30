// Test Object
const testMethod1 = () => {
  console.log("Home");
};

const testMethod2 = () => {
  console.log("Services");
};

const testMethod3 = () => {
  console.log("Login");
};

const testObj = [
  new SideDrawerObject("home-sidedrawer", "Home", testMethod1),
  new SideDrawerObject("services-sidedrawer", "Services", testMethod2),
  new SideDrawerObject("login-sidedrawer", "Login", testMethod3)
];

// Initialisation
const homepageInit = () => {
  rootPointer.innerHTML = coreElementsHTML;
  homepageBodyPointer = document.querySelector("#body");
  componentStructureHTML();
};

// Create the Core HTML Elements
const coreElementsHTML =
  "<div id='toolbar'></div>" +
  "<div id='body'></div>" +
  "<div id='footer'></div>";

// Create the Component Structure for the Homepage
const componentStructureHTML = () => {
  addServicesBody();
};

let homepageBodyPointer = document.querySelector("#body");
