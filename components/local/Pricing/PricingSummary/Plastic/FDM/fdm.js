let fdmPricingObject;

const createFDMPricingObject = () => {
  const materialTypePricingObjectArray = [
    plaPricingObject,
    absPricingObject,
    petgPricingObject,
    flexPricingObject
  ];
  fdmPricingObject = new ManufacturingMethod(
    "FDM",
    "fdm",
    materialTypePricingObjectArray
  );
};
