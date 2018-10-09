// Profile Orders Marketplace Object
let profileOrdersMarketplaceObject;

// Profile Orders Marketplace Object Properties
const profileOrdersMarketplaceId = "marketplace";
const profileOrdersMarketplaceName = "Marketplace";
const profileOrdersMarketplaceMethod = () => {
  console.log("Profile Orders Marketplace");
};

// Contruct Profile Orders Marketplace Object
const contructProfileOrdersMarketplaceObject = () => {
  profileOrdersMarketplaceObject = new profileOrdersComponentObject(
    profileOrdersMarketplaceId,
    profileOrdersMarketplaceName,
    profileOrdersMarketplaceMethod
  );
};
