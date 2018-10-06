const plaName = "PLA";
const plaId = "pla";
const plaSuitableFor =
  "PLA is the most commonly used filament. It’s biodegradable, easy to print, and very strong. The perfect choice for printing large objects thanks to its low thermal expansion (little to no warping) and for printing tiny parts because of its low melting temperature.";
const plaQualityArray = ["Normal Quality", "High Quality", "Very High Quality"];
const plaZResolutionArray = [
  "200 Micron or 0.2mm",
  "100 Micron or 0.1mm",
  "50 Micron or 0.05mm"
];
const plaSuitableDimensionArray = [
  "[PLA SUITABLE DIMENSION 1 PLACEHOLDER]",
  "[PLA SUITABLE DIMENSION 2 PLACEHOLDER]",
  "[PLA SUITABLE DIMENSION 3 PLACEHOLDER]"
];
const plaBasicPricingArray = [
  "20 cents per gram",
  "30 cents per gram",
  "45 cents per gram"
];
const plaPriorityPricingArray = [
  "28 cents per gram",
  "42 cents per gram",
  "63 cents per gram"
];

// Create PLA Object
const plaPricingObject = new MaterialType(
  plaName,
  plaId,
  plaSuitableFor,
  plaQualityArray,
  plaZResolutionArray,
  plaSuitableDimensionArray,
  plaBasicPricingArray,
  plaPriorityPricingArray
);
