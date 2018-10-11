// Declare the New Order PETG Object Variable
let newOrderPETGObject;

// Create the New Order PETG Object Property
const newOrderPETGId = "petg";
const newOrderPETGName = "PETG";
const newOrderPETGMethod = () => {
  constructNewOrderPETGOptionsObject();
  populateChooseOptionsBasicOptionsSelectField(newOrderPETGOptionsObject);
};

// Construct the New Order PETG Object
const constructNewOrderPETGObject = () => {
  newOrderPETGObject = new NewPrintOrderMaterialObject(
    newOrderPETGId,
    newOrderPETGName,
    newOrderPETGMethod
  );
};

/* ========================================= CHOOSE OPTIONS ========================================= */

let newOrderPETGOptionsObject = "";

const constructNewOrderPETGOptionsObject = () => {
  constructNewOrderPETGOptionsQualityDefaultValuesObject();
  constructNewOrderPETGOptionsStrengthDefaultValuesObject();
  constructNewOrderPETGOptionsColorsObjectArray();

  newOrderPETGOptionsObject = new NewPrintOrderMaterialOptionsObject(
    newOrderPETGId,
    newOrderPETGName,
    newOrderPETGOptionsQualityDefaultValuesObjectArray,
    newOrderPETGOptionsDefaultQualityValue,
    newOrderPETGOptionsStrengthDefaultValuesObjectArray,
    newOrderPETGOptionsDefaultStrengthValue,
    newOrderPETGOptionsColorsObjectArray,
    newOrderPETGOptionsDefaultColorValue
  );
};

/* --------------------------------------------- COLORS --------------------------------------------- */

let newOrderPETGOptionsColorsObjectArray = [];
const newOrderPETGOptionsDefaultColorValue = "No Preference";

const newOrderPETGOptionsColorIdsArray = ["no_preference"];

const newOrderPETGOptionsColorNamesArray = ["No Preference"];

const newOrderPETGOptionsColorStylesArray = ["none"];

const constructNewOrderPETGOptionsColorsObjectArray = () => {
  for (i = 0; i < newOrderPETGOptionsColorIdsArray.length; i++) {
    const newOrderPETGOptionsColorsObject = new NewPrintOrderMaterialOptionsColorObject(
      newOrderPETGOptionsColorIdsArray[i],
      newOrderPETGOptionsColorNamesArray[i],
      newOrderPETGOptionsColorStylesArray[i]
    );

    newOrderPETGOptionsColorsObjectArray[i] = newOrderPETGOptionsColorsObject;
  }
};

/* ------------------------------------- QUALITY DEFAULT VALUES ------------------------------------- */

let newOrderPETGOptionsQualityDefaultValuesObjectArray = [];
const newOrderPETGOptionsDefaultQualityValue = "Normal";

const petgQualityOptionsIdArray = ["normal", "high", "very high"];
const petgQualityOptionsNameArray = ["Normal", "High", "Very High"];
const petgQualityOptionsZResolutionArray = ["0.200", "0.100", "0.050"];

const constructNewOrderPETGOptionsQualityDefaultValuesObject = () => {
  for (i = 0; i < petgQualityOptionsIdArray.length; i++) {
    const newOrderPETGOptionsQualityDefaultValuesObject = new NewPrintOrderMaterialOptionsQualityDefaultValuesObject(
      petgQualityOptionsIdArray[i],
      petgQualityOptionsNameArray[i],
      petgQualityOptionsZResolutionArray[i]
    );

    newOrderPETGOptionsQualityDefaultValuesObjectArray[
      i
    ] = newOrderPETGOptionsQualityDefaultValuesObject;
  }
};

/* ------------------------------------ STRENGTH DEFAULT VALUES ------------------------------------- */

let newOrderPETGOptionsStrengthDefaultValuesObjectArray = [];
const newOrderPETGOptionsDefaultStrengthValue = "Normal";

const petgStrengthOptionsIdArray = [
  "hollow",
  "normal",
  "strong",
  "very strong",
  "solid"
];
const petgStrengthOptionsNameArray = [
  "Hollow",
  "Normal",
  "Strong",
  "Very Strong",
  "Solid"
];
const petgStrengthOptionsInfillArray = ["0", "25", "50", "75", "100"];
const petgStrengthOptionsWallThicknessArray = [
  "0.8",
  "1.2",
  "1.6",
  "2.0",
  "2.4"
];

const constructNewOrderPETGOptionsStrengthDefaultValuesObject = () => {
  for (i = 0; i < petgStrengthOptionsIdArray.length; i++) {
    const newOrderPETGOptionsStrengthDefaultValuesObject = new NewPrintOrderMaterialOptionsStrengthDefaultValuesObject(
      petgStrengthOptionsIdArray[i],
      petgStrengthOptionsNameArray[i],
      petgStrengthOptionsInfillArray[i],
      petgStrengthOptionsWallThicknessArray[i]
    );

    newOrderPETGOptionsStrengthDefaultValuesObjectArray[
      i
    ] = newOrderPETGOptionsStrengthDefaultValuesObject;
  }
};
