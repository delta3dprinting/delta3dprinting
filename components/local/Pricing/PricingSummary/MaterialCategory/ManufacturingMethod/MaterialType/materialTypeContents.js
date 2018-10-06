// Material Category Class for Object Creation
class MaterialType {
  constructor(
    name,
    id,
    suitableFor,
    qualityArray,
    zResolutionArray,
    suitableDimesnionArray,
    basicPricingArray,
    priorityPricingArray
  ) {
    this.name = name;
    this.id = id;
    this.suitableFor = suitableFor;
    this.qualityArray = qualityArray;
    this.zResolutionArray = zResolutionArray;
    this.suitableDimesnionArray = suitableDimesnionArray;
    this.basicPricingArray = basicPricingArray;
    this.priorityPricingArray = priorityPricingArray;
  }
}
