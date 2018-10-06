// Add Material Type Tabs
const addMaterialTypePricingTabs = objArr => {
  // Determine the width of each tab
  const materialTypePricingTabWidth = 100 / objArr.length + "%";
  objArr.forEach(ele => {
    // Create the HTML
    const materialTypePricingTabHTML =
      "<div id='" +
      ele.id +
      "_pricing_tab_body' class='material_type_pricing_tab_body'><div id='" +
      ele.id +
      "_pricing_tab_text' class='material_type_pricing_tab_text'>" +
      ele.name +
      "</div></div>";

    materialTypePricingTabsBodyPointer.insertAdjacentHTML(
      "beforeend",
      materialTypePricingTabHTML
    );

    // Assign width of each tab
    document.querySelector(
      "#" + ele.id + "_pricing_tab_body"
    ).style.width = materialTypePricingTabWidth;
    document.querySelector(
      "#" + ele.id + "_pricing_tab_body"
    ).style.maxWidth = materialTypePricingTabWidth;
    document.querySelector(
      "#" + ele.id + "_pricing_tab_body"
    ).style.minWidth = materialTypePricingTabWidth;

    addMaterialDetailTablePricingHTML(ele);

    document
      .querySelector("#" + ele.id + "_pricing_tab_body")
      .addEventListener("click", () => {
        deselectMaterialTypePricingTab(selectedMaterialTypePricingTab);
        selectMaterialTypePricingTab(ele.id);
      });
  });
};

let selectedMaterialTypePricingTab;

const selectMaterialTypePricingTab = id => {
  document.querySelector("#" + id + "_pricing_table").style.opacity = 1;
  document.querySelector("#" + id + "_pricing_tab_text").style.opacity = 1;
  document.querySelector("#" + id + "_pricing_tab_body").style.backgroundColor =
    "rgb(240, 240, 240)";
  document.querySelector("#" + id + "_pricing_tab_body").style.borderStyle =
    "none none solid none";
  selectedMaterialTypePricingTab = id;
};

const deselectMaterialTypePricingTab = id => {
  if (!id) {
    return;
  }
  document.querySelector("#" + id + "_pricing_table").style.opacity = 0;
  document.querySelector("#" + id + "_pricing_tab_text").style.opacity = 0.5;
  document.querySelector("#" + id + "_pricing_tab_body").style.backgroundColor =
    "rgb(220, 220, 220)";
  document.querySelector("#" + id + "_pricing_tab_body").style.borderStyle =
    "none none none none";
};
