// Create What is Delta 3D Printing main object
let footerWhatIsDelta3DPrintingObject;

// What is Delta 3D Printing main object
const createFooterWhatIsDelta3DPrintingObject = () => {
  footerWhatIsDelta3DPrintingObject = new FooterContentObject(
    "what_is_delta_3d_printing",
    "What is Delta 3D Printing",
    footerWhatIsDelta3DPrintingMethod
  );
};

// Create What is Delta 3D Printing main method
const footerWhatIsDelta3DPrintingMethod = () => {
  console.log("What is Delta 3D Printing");
};
