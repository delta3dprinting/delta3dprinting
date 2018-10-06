// Add Material Category Tabs
const addMaterialCategoryTabs = objArr => {
  // Determine the width of each tab
  const materialCategoryPricingTabWidth = 100 / objArr.length + "%";
  objArr.forEach(ele => {
    // Create the HTML
    const materialCategoryPricingTabHTML =
      "<div id='" +
      ele.id +
      "_pricing_tab_body' class='material_category_pricing_tab_body'><div id='" +
      ele.id +
      "_pricing_tab_text' class='material_category_pricing_tab_text'>" +
      ele.name +
      "</div></div>";

    materialCategoryPricingTabsBodyPointer.insertAdjacentHTML(
      "beforeend",
      materialCategoryPricingTabHTML
    );

    // Assign width of each tab
    document.querySelector(
      "#" + ele.id + "_pricing_tab_body"
    ).style.width = materialCategoryPricingTabWidth;

    document
      .querySelector("#" + ele.id + "_pricing_tab_body")
      .addEventListener("click", () => {
        deselectMaterialCategoryPricingTab(selectedMaterialCategoryPricingTab);
        selectMaterialCategoryPricingTab(ele.materialTypeObjectArray, ele.id);
      });
  });
  selectMaterialCategoryPricingTab(
    objArr[0].materialTypeObjectArray,
    objArr[0].id
  );
};

let selectedMaterialCategoryPricingTab;

const selectMaterialCategoryPricingTab = (objArr, id) => {
  // Create the Material Types for the Selected Manufacturing Method
  manufacturingMethodPricingTabsBodyPointer.innerHTML = "";
  materialTypePricingTabsBodyPointer.innerHTML = "";
  materialDetailsPricingBodyPointer.innerHTML = "";
  addManufacturingMethodPricingTabs(objArr);
  if (objArr.length > 0) {
    selectManufacturingMethodPricingTab(
      objArr[0].materialTypeObjectArray,
      objArr[0].id
    );
  }

  // CSS Designs
  document.querySelector("#" + id + "_pricing_tab_text").style.opacity = 1;
  document.querySelector("#" + id + "_pricing_tab_body").style.backgroundColor =
    "rgb(240, 240, 240)";
  document.querySelector("#" + id + "_pricing_tab_body").style.borderStyle =
    "none none solid none";
  selectedMaterialCategoryPricingTab = id;
};

const deselectMaterialCategoryPricingTab = id => {
  if (!id) {
    return;
  }
  document.querySelector("#" + id + "_pricing_tab_text").style.opacity = 0.5;
  document.querySelector("#" + id + "_pricing_tab_body").style.backgroundColor =
    "rgb(220, 220, 220)";
  document.querySelector("#" + id + "_pricing_tab_body").style.borderStyle =
    "none none none none";
};
