// Declare the New Order FDM Object Variable
let newOrderFDMObject;

// Create the New Order FDM Object Property
const newOrderFDMId = "fdm";
const newOrderFDMName = "FDM";

// Construct the New Order FDM Object
const constructNewOrderFDMObject = () => {
  // Construct the FDM Material Object Array
  constructNewOrderPLAObject();
  constructNewOrderABSObject();
  constructNewOrderPETGObject();
  constructNewOrderFLEXObject();

  const newOrderFDMMaterialObjectArray = [
    newOrderPLAObject,
    newOrderABSObject,
    newOrderPETGObject,
    newOrderFLEXObject
  ];

  // Construct the FDM Object Array
  newOrderFDMObject = new NewPrintOrderProcessObject(
    newOrderFDMId,
    newOrderFDMName,
    newOrderFDMMaterialObjectArray
  );
};
