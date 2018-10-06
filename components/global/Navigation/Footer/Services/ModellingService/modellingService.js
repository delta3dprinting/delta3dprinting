// Create 3D Modelling Service main object
let footer3DModellingServiceObject;

const createFooter3DModellingServiceObject = () => {
  // 3D Modelling Service main object
  footer3DModellingServiceObject = new FooterContentObject(
    "modelling_service",
    "3D Modelling Service",
    footer3DModellingServiceMethod
  );
};

// Create 3D Modelling Service main method
const footer3DModellingServiceMethod = () => {
  console.log("3D Modelling Service");
};
