// Declare the New Order Metal Object Variable
let newOrderMetalObject;

// Create the New Order Metal Object Property
const newOrderMetalId = "metal";
const newOrderMetalName = "Metal";

// Construct the New Order Metal Object
const contructNewOrderMetalObject = () => {
  // Construct the Metal Material Object Array

  const newOrderMetalProcessObjectArray = [];

  // Construct the Metal Object Array
  newOrderMetalObject = new NewPrintOrderProcessObject(
    newOrderMetalId,
    newOrderMetalName,
    newOrderMetalProcessObjectArray
  );
};
