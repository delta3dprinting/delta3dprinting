const absName = "ABS";
const absId = "abs";
const absSuitableFor =
  "ABS is a very strong and versatile material with great thermal resistance. It’s suitable for both indoor and outdoor use. ABS includes high wear-resistance synthetic rubber, which makes it very strong and impact resistant​.";
const absQualityArray = ["Normal Quality", "High Quality", "Very High Quality"];
const absZResolutionArray = [
  "200 Micron or 0.2mm",
  "100 Micron or 0.1mm",
  "50 Micron or 0.05mm"
];
const absSuitableDimensionArray = [
  "[ABS SUITABLE DIMENSION 1 PLACEHOLDER]",
  "[ABS SUITABLE DIMENSION 2 PLACEHOLDER]",
  "[ABS SUITABLE DIMENSION 3 PLACEHOLDER]"
];
const absBasicPricingArray = [
  "20 cents per gram",
  "30 cents per gram",
  "45 cents per gram"
];
const absPriorityPricingArray = [
  "28 cents per gram",
  "42 cents per gram",
  "63 cents per gram"
];

// Create ABS Object
const absPricingObject = new MaterialType(
  absName,
  absId,
  absSuitableFor,
  absQualityArray,
  absZResolutionArray,
  absSuitableDimensionArray,
  absBasicPricingArray,
  absPriorityPricingArray
);
