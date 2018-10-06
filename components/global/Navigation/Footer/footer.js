// Object for Footer Categories
class FooterCategoryObject {
  constructor(id, name, contentObjectsArray) {
    this.id = id;
    this.name = name;
    this.contentObjectsArray = contentObjectsArray;
  }
}

// Object for Footer Category Content
class FooterContentObject {
  constructor(id, name, method) {
    this.id = id;
    this.name = name;
    this.method = method;
  }
}

// Initialisation
const footerInit = () => {
  // Assign Footer Category Array Values
  createFooterArray();
  // Populate Footer
  // Create Footer Category HTML
  footerCategoryArray.forEach(ele => {
    createFooterCategory(ele);
    createFooterCategoryContents(ele);
  });
};

// Create Footer Array
let footerCategoryArray;

const createFooterArray = () => {
  // Create Content Objects
  createFooterServicesObject();
  createFooterResourcesObject();
  createFooterAboutObject();
  createFooterSupportObject();

  footerCategoryArray = [
    footerServicesObject,
    footerResourcesObject,
    footerAboutObject,
    footerSupportObject
  ];
};

// Create Footer Category HTML
const createFooterCategory = obj => {
  // Footer Category HTML
  const footerCategoryHTML =
    "<div id='" +
    obj.id +
    "_footer_category_body' class='footer_category_body' style='width:" +
    100 / footerCategoryArray.length +
    "%" +
    "'>" +
    "<div id='" +
    obj.id +
    "_footer_category_text' class='footer_category_text'>" +
    obj.name +
    "</div>" +
    "<div id='" +
    obj.id +
    "_footer_contents_body' class='footer_contents_body'>" +
    "</div>" +
    "</div>";

  // Insert the HTML into the Footer Body
  document
    .querySelector("#footer")
    .insertAdjacentHTML("beforeend", footerCategoryHTML);
};

const createFooterCategoryContents = obj => {
  const categoryId = obj.id;
  obj.contentObjectsArray.forEach(ele => {
    const footerContentHTML =
      "<div id='" +
      ele.id +
      "_content_body' class='footer_content_body'>" +
      "<div id='" +
      ele.id +
      "_content_text' class='footer_content_text'>" +
      ele.name +
      "</div>" +
      "</div>";

    document
      .querySelector("#" + categoryId + "_footer_contents_body")
      .insertAdjacentHTML("beforeend", footerContentHTML);

    document
      .querySelector("#" + ele.id + "_content_text")
      .addEventListener("click", () => {
        ele.method();
      });
  });
};
