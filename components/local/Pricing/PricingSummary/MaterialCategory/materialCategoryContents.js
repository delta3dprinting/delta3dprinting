class MaterialCategory {
  constructor(name, id, materialTypeObjectArray) {
    this.name = name;
    this.id = id;
    this.materialTypeObjectArray = materialTypeObjectArray;
  }
}

// Create Array containing all Material Category Object
let materialCategoryPricingArray;

const createCategoryPricingObjects = () => {
  createPlasticPricingObject();
  createMetalPricingObject();

  materialCategoryPricingArray = [plasticPricingObject, metalPricingObject];
};
