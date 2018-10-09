// Declare the New Order PLA Object Variable
let newOrderPLAObject;

// Create the New Order PLA Object Property
const newOrderPLAId = "pla";
const newOrderPLAName = "PLA";
const newOrderPLAMethod = () => {
  console.log("Material: PLA");
};

// Construct the New Order PLA Object
const contructNewOrderPLAObject = () => {
  newOrderPLAObject = new NewPrintOrderMaterialObject(
    newOrderPLAId,
    newOrderPLAName,
    newOrderPLAMethod
  );
};
