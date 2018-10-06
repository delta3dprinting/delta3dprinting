// Create Support main object
let footerSupportObject;
let footerSupportContentArray;

const createFooterSupportObject = () => {
  // Assign Contents
  createFooterContactUsObject();
  // Create an array of support contents
  footerSupportContentArray = [footerContactUsObject];
  // Support main object
  footerSupportObject = new FooterCategoryObject(
    "support",
    "SUPPORT",
    footerSupportContentArray
  );
};
