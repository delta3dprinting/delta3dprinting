// Initialisation
const homepageInit = () => {
  homepageBodyPointer.innerHTML = "";
  componentStructureHTML();
  homepageDrawerElements();
  drawerInit(drawerElements);
};

// Create the Component Structure for the Homepage
const componentStructureHTML = () => {
  addServicesBody();
};

const homepageDrawerElements = () => {
  drawerElements = [
    new SideDrawerObject("home-sidedrawer", "Home", homepageInit),
    new SideDrawerObject("pricing-sidedrawer", "Pricing", pricingInit)
  ];
};

let homepageBodyPointer;
