// Create Contact Us main object
let footerContactUsObject;

const createFooterContactUsObject = () => {
  // Contact Us main object
  footerContactUsObject = new FooterContentObject(
    "contact_us",
    "Contact Us",
    footerContactUsMethod
  );
};

// Create Contact Us main method
const footerContactUsMethod = () => {
  console.log("Contact Us");
};
