// Initialisation
const pricingInit = () => {
  bodyPointer.innerHTML = "";
  pricingDrawerElements();
  drawerInit(drawerElements);
  pricingComponentStructure();
};

// Set Contents of the Side Drawer
const pricingDrawerElements = () => {
  drawerElements = [
    new SideDrawerObject("home-sidedrawer", "Home", homepageInit),
    new SideDrawerObject("pricing-sidedrawer", "Pricing", pricingInit)
  ];
};

// Create the Component Structure for Pricing
const pricingComponentStructure = () => {
  addPricingSummary();
};
