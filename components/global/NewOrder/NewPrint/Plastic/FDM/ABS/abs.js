// Declare the New Order ABS Object Variable
let newOrderABSObject;

// Create the New Order ABS Object Property
const newOrderABSId = "abs";
const newOrderABSName = "ABS";
const newOrderABSMethod = () => {
  console.log("Material: ABS");
};

// Construct the New Order ABS Object
const contructNewOrderABSObject = () => {
  newOrderABSObject = new NewPrintOrderMaterialObject(
    newOrderABSId,
    newOrderABSName,
    newOrderABSMethod
  );
};
