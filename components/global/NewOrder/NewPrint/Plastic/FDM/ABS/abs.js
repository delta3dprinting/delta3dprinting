// Declare the New Order ABS Object Variable
let newOrderABSObject;

// Create the New Order ABS Object Property
const newOrderABSId = "abs";
const newOrderABSName = "ABS";
const newOrderABSMethod = () => {
  constructNewOrderABSOptionsObject();
  populateChooseOptionsBasicOptionsSelectField(newOrderABSOptionsObject);
};

// Construct the New Order ABS Object
const constructNewOrderABSObject = () => {
  newOrderABSObject = new NewPrintOrderMaterialObject(
    newOrderABSId,
    newOrderABSName,
    newOrderABSMethod
  );
};

/* ========================================= CHOOSE OPTIONS ========================================= */

let newOrderABSOptionsObject = "";

const constructNewOrderABSOptionsObject = () => {
  constructNewOrderABSOptionsQualityDefaultValuesObject();
  constructNewOrderABSOptionsStrengthDefaultValuesObject();
  constructNewOrderABSOptionsColorsObjectArray();

  newOrderABSOptionsObject = new NewPrintOrderMaterialOptionsObject(
    newOrderABSId,
    newOrderABSName,
    newOrderABSOptionsQualityDefaultValuesObjectArray,
    newOrderABSOptionsDefaultQualityValue,
    newOrderABSOptionsStrengthDefaultValuesObjectArray,
    newOrderABSOptionsDefaultStrengthValue,
    newOrderABSOptionsColorsObjectArray,
    newOrderABSOptionsDefaultColorValue
  );
};

/* --------------------------------------------- COLORS --------------------------------------------- */

let newOrderABSOptionsColorsObjectArray = [];
const newOrderABSOptionsDefaultColorValue = "No Preference";

const newOrderABSOptionsColorIdsArray = [
  "no_preference",
  "black",
  "white",
  "gray",
  "red",
  "blue"
];

const newOrderABSOptionsColorNamesArray = [
  "No Preference",
  "Black",
  "White",
  "Gray",
  "Red",
  "Blue"
];

const newOrderABSOptionsColorStylesArray = [
  "none",
  "black",
  "white",
  "gray",
  "red",
  "blue"
];

const constructNewOrderABSOptionsColorsObjectArray = () => {
  for (i = 0; i < newOrderABSOptionsColorIdsArray.length; i++) {
    const newOrderABSOptionsColorsObject = new NewPrintOrderMaterialOptionsColorObject(
      newOrderABSOptionsColorIdsArray[i],
      newOrderABSOptionsColorNamesArray[i],
      newOrderABSOptionsColorStylesArray[i]
    );

    newOrderABSOptionsColorsObjectArray[i] = newOrderABSOptionsColorsObject;
  }
};

/* ------------------------------------- QUALITY DEFAULT VALUES ------------------------------------- */

let newOrderABSOptionsQualityDefaultValuesObjectArray = [];
const newOrderABSOptionsDefaultQualityValue = "Normal";

const absQualityOptionsIdArray = ["normal", "high", "very high"];
const absQualityOptionsNameArray = ["Normal", "High", "Very High"];
const absQualityOptionsZResolutionArray = ["0.200", "0.100", "0.050"];

const constructNewOrderABSOptionsQualityDefaultValuesObject = () => {
  for (i = 0; i < absQualityOptionsIdArray.length; i++) {
    const newOrderABSOptionsQualityDefaultValuesObject = new NewPrintOrderMaterialOptionsQualityDefaultValuesObject(
      absQualityOptionsIdArray[i],
      absQualityOptionsNameArray[i],
      absQualityOptionsZResolutionArray[i]
    );

    newOrderABSOptionsQualityDefaultValuesObjectArray[
      i
    ] = newOrderABSOptionsQualityDefaultValuesObject;
  }
};

/* ------------------------------------ STRENGTH DEFAULT VALUES ------------------------------------- */

let newOrderABSOptionsStrengthDefaultValuesObjectArray = [];
const newOrderABSOptionsDefaultStrengthValue = "Normal";

const absStrengthOptionsIdArray = [
  "hollow",
  "normal",
  "strong",
  "very strong",
  "solid"
];
const absStrengthOptionsNameArray = [
  "Hollow",
  "Normal",
  "Strong",
  "Very Strong",
  "Solid"
];
const absStrengthOptionsInfillArray = ["0", "25", "50", "75", "100"];
const absStrengthOptionsWallThicknessArray = [
  "0.8",
  "1.2",
  "1.6",
  "2.0",
  "2.4"
];

const constructNewOrderABSOptionsStrengthDefaultValuesObject = () => {
  for (i = 0; i < absStrengthOptionsIdArray.length; i++) {
    const newOrderABSOptionsStrengthDefaultValuesObject = new NewPrintOrderMaterialOptionsStrengthDefaultValuesObject(
      absStrengthOptionsIdArray[i],
      absStrengthOptionsNameArray[i],
      absStrengthOptionsInfillArray[i],
      absStrengthOptionsWallThicknessArray[i]
    );

    newOrderABSOptionsStrengthDefaultValuesObjectArray[
      i
    ] = newOrderABSOptionsStrengthDefaultValuesObject;
  }
};
