// Add Manufacturing Method Tabs
const addManufacturingMethodPricingTabs = objArr => {
  // Determine the width of each tab
  const manufacturingMethodPricingTabWidth = 100 / objArr.length + "%";
  objArr.forEach(ele => {
    // Create the HTML
    const manufacturingMethodPricingTabHTML =
      "<div id='" +
      ele.id +
      "_pricing_tab_body' class='manufacturing_method_pricing_tab_body'><div id='" +
      ele.id +
      "_pricing_tab_text' class='manufacturing_method_pricing_tab_text'>" +
      ele.name +
      "</div></div>";

    manufacturingMethodPricingTabsBodyPointer.insertAdjacentHTML(
      "beforeend",
      manufacturingMethodPricingTabHTML
    );

    // Assign width of each tab
    document.querySelector(
      "#" + ele.id + "_pricing_tab_body"
    ).style.width = manufacturingMethodPricingTabWidth;

    document
      .querySelector("#" + ele.id + "_pricing_tab_body")
      .addEventListener("click", () => {
        deselectManufacturingMethodPricingTab(
          selectedManufacturingMethodPricingTab
        );
        selectManufacturingMethodPricingTab(
          ele.materialTypeObjectArray,
          ele.id
        );
      });
  });
};

let selectedManufacturingMethodPricingTab;

const selectManufacturingMethodPricingTab = (objArr, id) => {
  // Create the Material Types for the Selected Manufacturing Method
  materialTypePricingTabsBodyPointer.innerHTML = "";
  materialDetailsPricingBodyPointer.innerHTML = "";
  addMaterialTypePricingTabs(objArr);
  if (objArr.length > 0) {
    selectMaterialTypePricingTab(objArr[0].id);
  }

  // CSS Designs
  document.querySelector("#" + id + "_pricing_tab_text").style.opacity = 1;
  document.querySelector("#" + id + "_pricing_tab_body").style.backgroundColor =
    "rgb(240, 240, 240)";
  document.querySelector("#" + id + "_pricing_tab_body").style.borderStyle =
    "none none solid none";
  selectedManufacturingMethodPricingTab = id;
};

const deselectManufacturingMethodPricingTab = id => {
  if (!id) {
    return;
  }
  document.querySelector("#" + id + "_pricing_tab_text").style.opacity = 0.5;
  document.querySelector("#" + id + "_pricing_tab_body").style.backgroundColor =
    "rgb(220, 220, 220)";
  document.querySelector("#" + id + "_pricing_tab_body").style.borderStyle =
    "none none none none";
};
