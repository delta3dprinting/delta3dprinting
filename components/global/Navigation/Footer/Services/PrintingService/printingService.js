// Create 3D Printing Service main object
let footer3DPrintingServiceObject;

const createFooter3DPrintingServiceObject = () => {
  // 3D Printing Service main object
  footer3DPrintingServiceObject = new FooterContentObject(
    "printing_service",
    "3D Printing Service",
    footer3DPrintingServiceMethod
  );
};

// Create 3D Printing Service main method
const footer3DPrintingServiceMethod = () => {
  console.log("3D Printing Service");
};
