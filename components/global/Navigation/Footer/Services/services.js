// Create Services main object
let footerServicesObject;
let footerServicesContentArray;

const createFooterServicesObject = () => {
  // Assign Contents
  createFooter3DPrintingServiceObject();
  createFooter3DModellingServiceObject();
  createFooterMarketplaceObject();
  // Create an array of services contents
  footerServicesContentArray = [
    footer3DPrintingServiceObject,
    footer3DModellingServiceObject,
    footerMarketplaceObject
  ];
  // Services main object
  footerServicesObject = new FooterCategoryObject(
    "services",
    "SERVICES",
    footerServicesContentArray
  );
};
