let plasticPricingObject;

const createPlasticPricingObject = () => {
  createFDMPricingObject();
  createSLAPricingObject();
  const manufacturingMethodPricingObjectArray = [
    fdmPricingObject,
    slaPricingObject
  ];
  plasticPricingObject = new MaterialCategory(
    "Plastic",
    "plastic",
    manufacturingMethodPricingObjectArray
  );
};
