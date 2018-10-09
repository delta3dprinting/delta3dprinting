// Declare the New Order PETG Object Variable
let newOrderPETGObject;

// Create the New Order PETG Object Property
const newOrderPETGId = "petg";
const newOrderPETGName = "PETG";
const newOrderPETGMethod = () => {
  console.log("Material: PETG");
};

// Construct the New Order PETG Object
const contructNewOrderPETGObject = () => {
  newOrderPETGObject = new NewPrintOrderMaterialObject(
    newOrderPETGId,
    newOrderPETGName,
    newOrderPETGMethod
  );
};
