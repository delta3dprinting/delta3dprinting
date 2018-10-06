const flexName = "FLEX";
const flexId = "flex";
const flexSuitableFor =
  "Flex is a very strong and flexible material. There are many use cases when hard plastic is not the best option. Whether you need a phone cover, an action camera case or wheels for your RC car, flexible is the way to go. Flex has a very good abrasion resistance, remains flexible in cold environments, and is resistant to many solvents. It doesn’t shrink much when cooling down, so you can be fairly accurate with your measurements and models requiring a perfect fit.";
const flexQualityArray = [
  "Normal Quality",
  "High Quality",
  "Very High Quality"
];
const flexZResolutionArray = [
  "200 Micron or 0.2mm",
  "100 Micron or 0.1mm",
  "50 Micron or 0.05mm"
];
const flexSuitableDimensionArray = [
  "[FLEX SUITABLE DIMENSION 1 FLEXCEHOLDER]",
  "[FLEX SUITABLE DIMENSION 2 FLEXCEHOLDER]",
  "[FLEX SUITABLE DIMENSION 3 FLEXCEHOLDER]"
];
const flexBasicPricingArray = [
  "36 cents per gram",
  "54 cents per gram",
  "81 cents per gram"
];
const flexPriorityPricingArray = [
  "44 cents per gram",
  "66 cents per gram",
  "99 cents per gram"
];

// Create FLEX Object
const flexPricingObject = new MaterialType(
  flexName,
  flexId,
  flexSuitableFor,
  flexQualityArray,
  flexZResolutionArray,
  flexSuitableDimensionArray,
  flexBasicPricingArray,
  flexPriorityPricingArray
);
