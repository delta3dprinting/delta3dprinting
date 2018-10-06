// Create About Us main object
let footerAboutUsObject;

const createFooterAboutUsObject = () => {
  // About Us main object
  footerAboutUsObject = new FooterContentObject(
    "about_us",
    "About Us",
    footerAboutUsMethod
  );
};

// Create About Us main method
const footerAboutUsMethod = () => {
  console.log("About Us");
};
