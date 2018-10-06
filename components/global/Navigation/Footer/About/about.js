// Create About main object
let footerAboutObject;
let footerAboutContentArray;

const createFooterAboutObject = () => {
  // Assign Contents
  createFooterAboutUsObject();
  createFooterWhatIsDelta3DPrintingObject();
  // Create an array of about contents
  footerAboutContentArray = [
    footerAboutUsObject,
    footerWhatIsDelta3DPrintingObject
  ];
  // About main object
  footerAboutObject = new FooterCategoryObject(
    "about",
    "ABOUT",
    footerAboutContentArray
  );
};
