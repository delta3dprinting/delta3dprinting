// Initialisation
const pricingInit = () => {
  homepageBodyPointer.innerHTML = "";
  pricingDrawerElements();
  drawerInit(drawerElements);
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
