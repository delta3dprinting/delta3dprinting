// Declare the New Order FLEX Object Variable
let newOrderFLEXObject;

// Create the New Order FLEX Object Property
const newOrderFLEXId = "flex";
const newOrderFLEXName = "FLEX";
const newOrderFLEXMethod = () => {
  console.log("Material: FLEX");
};

// Construct the New Order FLEX Object
const contructNewOrderFLEXObject = () => {
  newOrderFLEXObject = new NewPrintOrderMaterialObject(
    newOrderFLEXId,
    newOrderFLEXName,
    newOrderFLEXMethod
  );
};
