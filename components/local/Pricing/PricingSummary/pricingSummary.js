// Add Pricing Summary Component
const addPricingSummary = () => {
  bodyPointer.insertAdjacentHTML("beforeend", pricingSummaryBaseHTML);
  assignPricingSummaryElementPointers();
  createCategoryPricingObjects();
  addMaterialCategoryTabs(materialCategoryPricingArray);
};

const pricingSummaryBaseHTML =
  "<div id='pricing_summary_body'>" +
  "<div id='material_category_pricing_tabs_body' class='material_pricing_tabs'></div>" +
  "<div id='manufacturing_method_pricing_tabs_body' class='material_pricing_tabs'></div>" +
  "<div id='material_type_pricing_tabs_body' class='material_pricing_tabs'></div>" +
  "<div id='material_details_pricing_body'></div>" +
  "</div>";

let materialCategoryPricingTabsBodyPointer;

let manufacturingMethodPricingTabsBodyPointer;

let materialTypePricingTabsBodyPointer;

let materialDetailsPricingBodyPointer;

const assignPricingSummaryElementPointers = () => {
  materialCategoryPricingTabsBodyPointer = document.querySelector(
    "#material_category_pricing_tabs_body"
  );
  manufacturingMethodPricingTabsBodyPointer = document.querySelector(
    "#manufacturing_method_pricing_tabs_body"
  );
  materialTypePricingTabsBodyPointer = document.querySelector(
    "#material_type_pricing_tabs_body"
  );
  materialDetailsPricingBodyPointer = document.querySelector(
    "#material_details_pricing_body"
  );
};
