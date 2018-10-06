const petgName = "PETG";
const petgId = "petg";
const petgSuitableFor =
  "PETG is a very tough material with good thermal resistance. It is a universal material, but it's especially suitable for mechanical parts and both indoor and outdoor use. PETG has almost no warping​, so printing large objects isn’t a problem.";
const petgQualityArray = [
  "Normal Quality",
  "High Quality",
  "Very High Quality"
];
const petgZResolutionArray = [
  "200 Micron or 0.2mm",
  "100 Micron or 0.1mm",
  "50 Micron or 0.05mm"
];
const petgSuitableDimensionArray = [
  "[PETG SUITABLE DIMENSION 1 PLACEHOLDER]",
  "[PETG SUITABLE DIMENSION 2 PLACEHOLDER]",
  "[PETG SUITABLE DIMENSION 3 PLACEHOLDER]"
];
const petgBasicPricingArray = [
  "24 cents per gram",
  "36 cents per gram",
  "54 cents per gram"
];
const petgPriorityPricingArray = [
  "32 cents per gram",
  "48 cents per gram",
  "72 cents per gram"
];

// Create PETG Object
const petgPricingObject = new MaterialType(
  petgName,
  petgId,
  petgSuitableFor,
  petgQualityArray,
  petgZResolutionArray,
  petgSuitableDimensionArray,
  petgBasicPricingArray,
  petgPriorityPricingArray
);
