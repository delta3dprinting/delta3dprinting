// Create Marketplace main object
let footerMarketplaceObject;

const createFooterMarketplaceObject = () => {
  // Marketplace main object
  footerMarketplaceObject = new FooterContentObject(
    "marketplace",
    "Marketplace",
    footerMarketplaceMethod
  );
};

// Create Marketplace main method
const footerMarketplaceMethod = () => {
  console.log("Marketplace");
};
