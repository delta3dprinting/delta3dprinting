// Declare the New Order PLA Object Variable
let newOrderPLAObject;

// Create the New Order PLA Object Property
const newOrderPLAId = "pla";
const newOrderPLAName = "PLA";
const newOrderPLAMethod = () => {
  constructNewOrderPLAOptionsObject();
  populateChooseOptionsBasicOptionsSelectField(newOrderPLAOptionsObject);
};

// Construct the New Order PLA Object
const constructNewOrderPLAObject = () => {
  newOrderPLAObject = new NewPrintOrderMaterialObject(
    newOrderPLAId,
    newOrderPLAName,
    newOrderPLAMethod
  );
};

/* ========================================= CHOOSE OPTIONS ========================================= */

let newOrderPLAOptionsObject = "";

const constructNewOrderPLAOptionsObject = () => {
  constructNewOrderPLAOptionsQualityDefaultValuesObject();
  constructNewOrderPLAOptionsStrengthDefaultValuesObject();
  constructNewOrderPLAOptionsColorsObjectArray();

  newOrderPLAOptionsObject = new NewPrintOrderMaterialOptionsObject(
    newOrderPLAId,
    newOrderPLAName,
    newOrderPLAOptionsQualityDefaultValuesObjectArray,
    newOrderPLAOptionsDefaultQualityValue,
    newOrderPLAOptionsStrengthDefaultValuesObjectArray,
    newOrderPLAOptionsDefaultStrengthValue,
    newOrderPLAOptionsColorsObjectArray,
    newOrderPLAOptionsDefaultColorValue
  );
};

/* --------------------------------------------- COLORS --------------------------------------------- */

let newOrderPLAOptionsColorsObjectArray = [];
const newOrderPLAOptionsDefaultColorValue = "No Preference";

const newOrderPLAOptionsColorIdsArray = [
  "no_preference",
  "black",
  "white",
  "gray",
  "red",
  "blue"
];

const newOrderPLAOptionsColorNamesArray = [
  "No Preference",
  "Black",
  "White",
  "Gray",
  "Red",
  "Blue"
];

const newOrderPLAOptionsColorStylesArray = [
  "none",
  "black",
  "white",
  "gray",
  "red",
  "blue"
];

const constructNewOrderPLAOptionsColorsObjectArray = () => {
  for (i = 0; i < newOrderPLAOptionsColorIdsArray.length; i++) {
    const newOrderPLAOptionsColorsObject = new NewPrintOrderMaterialOptionsColorObject(
      newOrderPLAOptionsColorIdsArray[i],
      newOrderPLAOptionsColorNamesArray[i],
      newOrderPLAOptionsColorStylesArray[i]
    );

    newOrderPLAOptionsColorsObjectArray[i] = newOrderPLAOptionsColorsObject;
  }
};

/* ------------------------------------- QUALITY DEFAULT VALUES ------------------------------------- */

let newOrderPLAOptionsQualityDefaultValuesObjectArray = [];
const newOrderPLAOptionsDefaultQualityValue = "Normal";

const plaQualityOptionsIdArray = ["normal", "high", "very high"];
const plaQualityOptionsNameArray = ["Normal", "High", "Very High"];
const plaQualityOptionsZResolutionArray = ["0.200", "0.100", "0.050"];

const constructNewOrderPLAOptionsQualityDefaultValuesObject = () => {
  for (i = 0; i < plaQualityOptionsIdArray.length; i++) {
    const newOrderPLAOptionsQualityDefaultValuesObject = new NewPrintOrderMaterialOptionsQualityDefaultValuesObject(
      plaQualityOptionsIdArray[i],
      plaQualityOptionsNameArray[i],
      plaQualityOptionsZResolutionArray[i]
    );

    newOrderPLAOptionsQualityDefaultValuesObjectArray[
      i
    ] = newOrderPLAOptionsQualityDefaultValuesObject;
  }
};

/* ------------------------------------ STRENGTH DEFAULT VALUES ------------------------------------- */

let newOrderPLAOptionsStrengthDefaultValuesObjectArray = [];
const newOrderPLAOptionsDefaultStrengthValue = "Normal";

const plaStrengthOptionsIdArray = [
  "hollow",
  "normal",
  "strong",
  "very strong",
  "solid"
];
const plaStrengthOptionsNameArray = [
  "Hollow",
  "Normal",
  "Strong",
  "Very Strong",
  "Solid"
];
const plaStrengthOptionsInfillArray = ["0", "25", "50", "75", "100"];
const plaStrengthOptionsWallThicknessArray = [
  "0.8",
  "1.2",
  "1.6",
  "2.0",
  "2.4"
];

const constructNewOrderPLAOptionsStrengthDefaultValuesObject = () => {
  for (i = 0; i < plaStrengthOptionsIdArray.length; i++) {
    const newOrderPLAOptionsStrengthDefaultValuesObject = new NewPrintOrderMaterialOptionsStrengthDefaultValuesObject(
      plaStrengthOptionsIdArray[i],
      plaStrengthOptionsNameArray[i],
      plaStrengthOptionsInfillArray[i],
      plaStrengthOptionsWallThicknessArray[i]
    );

    newOrderPLAOptionsStrengthDefaultValuesObjectArray[
      i
    ] = newOrderPLAOptionsStrengthDefaultValuesObject;
  }
};
