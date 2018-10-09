// Declare the New Order Plastic Object Variable
let newOrderPlasticObject;

// Create the New Order Plastic Object Property
const newOrderPlasticId = "plastic";
const newOrderPlasticName = "Plastic";

// Construct the New Order Plastic Object
const contructNewOrderPlasticObject = () => {
  // Construct the Plastic Material Object Array
  contructNewOrderFDMObject();

  const newOrderPlasticProcessObjectArray = [newOrderFDMObject];

  // Construct the Plastic Object Array
  newOrderPlasticObject = new NewPrintOrderProcessObject(
    newOrderPlasticId,
    newOrderPlasticName,
    newOrderPlasticProcessObjectArray
  );
};
