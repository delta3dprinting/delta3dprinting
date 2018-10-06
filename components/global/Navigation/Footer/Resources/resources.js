// Create Resources main object
let footerResourcesObject;
let footerResourcesContentArray;

const createFooterResourcesObject = () => {
  // Assign Contents

  // Create an array of resources contents
  footerResourcesContentArray = [];
  // Resources main object
  footerResourcesObject = new FooterCategoryObject(
    "resources",
    "RESOURCES",
    footerResourcesContentArray
  );
};
