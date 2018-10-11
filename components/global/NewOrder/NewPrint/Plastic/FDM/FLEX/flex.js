// Declare the New Order FLEX Object Variable
let newOrderFLEXObject;

// Create the New Order FLEX Object Property
const newOrderFLEXId = "flex";
const newOrderFLEXName = "FLEX";
const newOrderFLEXMethod = () => {
  constructNewOrderFLEXOptionsObject();
  populateChooseOptionsBasicOptionsSelectField(newOrderFLEXOptionsObject);
};

// Construct the New Order FLEX Object
const constructNewOrderFLEXObject = () => {
  newOrderFLEXObject = new NewPrintOrderMaterialObject(
    newOrderFLEXId,
    newOrderFLEXName,
    newOrderFLEXMethod
  );
};

/* ========================================= CHOOSE OPTIONS ========================================= */

let newOrderFLEXOptionsObject = "";

const constructNewOrderFLEXOptionsObject = () => {
  constructNewOrderFLEXOptionsQualityDefaultValuesObject();
  constructNewOrderFLEXOptionsStrengthDefaultValuesObject();
  constructNewOrderFLEXOptionsColorsObjectArray();

  newOrderFLEXOptionsObject = new NewPrintOrderMaterialOptionsObject(
    newOrderFLEXId,
    newOrderFLEXName,
    newOrderFLEXOptionsQualityDefaultValuesObjectArray,
    newOrderFLEXOptionsDefaultQualityValue,
    newOrderFLEXOptionsStrengthDefaultValuesObjectArray,
    newOrderFLEXOptionsDefaultStrengthValue,
    newOrderFLEXOptionsColorsObjectArray,
    newOrderFLEXOptionsDefaultColorValue
  );
};

/* --------------------------------------------- COLORS --------------------------------------------- */

let newOrderFLEXOptionsColorsObjectArray = [];
const newOrderFLEXOptionsDefaultColorValue = "No Preference";

const newOrderFLEXOptionsColorIdsArray = ["no_preference"];

const newOrderFLEXOptionsColorNamesArray = ["No Preference"];

const newOrderFLEXOptionsColorStylesArray = ["none"];

const constructNewOrderFLEXOptionsColorsObjectArray = () => {
  for (i = 0; i < newOrderFLEXOptionsColorIdsArray.length; i++) {
    const newOrderFLEXOptionsColorsObject = new NewPrintOrderMaterialOptionsColorObject(
      newOrderFLEXOptionsColorIdsArray[i],
      newOrderFLEXOptionsColorNamesArray[i],
      newOrderFLEXOptionsColorStylesArray[i]
    );

    newOrderFLEXOptionsColorsObjectArray[i] = newOrderFLEXOptionsColorsObject;
  }
};

/* ------------------------------------- QUALITY DEFAULT VALUES ------------------------------------- */

let newOrderFLEXOptionsQualityDefaultValuesObjectArray = [];
const newOrderFLEXOptionsDefaultQualityValue = "Normal";

const flexQualityOptionsIdArray = ["normal", "high", "very high"];
const flexQualityOptionsNameArray = ["Normal", "High", "Very High"];
const flexQualityOptionsZResolutionArray = ["0.200", "0.100", "0.050"];

const constructNewOrderFLEXOptionsQualityDefaultValuesObject = () => {
  for (i = 0; i < flexQualityOptionsIdArray.length; i++) {
    const newOrderFLEXOptionsQualityDefaultValuesObject = new NewPrintOrderMaterialOptionsQualityDefaultValuesObject(
      flexQualityOptionsIdArray[i],
      flexQualityOptionsNameArray[i],
      flexQualityOptionsZResolutionArray[i]
    );

    newOrderFLEXOptionsQualityDefaultValuesObjectArray[
      i
    ] = newOrderFLEXOptionsQualityDefaultValuesObject;
  }
};

/* ------------------------------------ STRENGTH DEFAULT VALUES ------------------------------------- */

let newOrderFLEXOptionsStrengthDefaultValuesObjectArray = [];
const newOrderFLEXOptionsDefaultStrengthValue = "Normal";

const flexStrengthOptionsIdArray = [
  "hollow",
  "normal",
  "strong",
  "very strong",
  "solid"
];
const flexStrengthOptionsNameArray = [
  "Hollow",
  "Normal",
  "Strong",
  "Very Strong",
  "Solid"
];
const flexStrengthOptionsInfillArray = ["0", "25", "50", "75", "100"];
const flexStrengthOptionsWallThicknessArray = [
  "0.8",
  "1.2",
  "1.6",
  "2.0",
  "2.4"
];

const constructNewOrderFLEXOptionsStrengthDefaultValuesObject = () => {
  for (i = 0; i < flexStrengthOptionsIdArray.length; i++) {
    const newOrderFLEXOptionsStrengthDefaultValuesObject = new NewPrintOrderMaterialOptionsStrengthDefaultValuesObject(
      flexStrengthOptionsIdArray[i],
      flexStrengthOptionsNameArray[i],
      flexStrengthOptionsInfillArray[i],
      flexStrengthOptionsWallThicknessArray[i]
    );

    newOrderFLEXOptionsStrengthDefaultValuesObjectArray[
      i
    ] = newOrderFLEXOptionsStrengthDefaultValuesObject;
  }
};
