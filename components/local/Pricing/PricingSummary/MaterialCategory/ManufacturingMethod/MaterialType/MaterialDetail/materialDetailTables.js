// Add the Tables
const addMaterialDetailTablePricingHTML = obj => {
  // Create Base HTML for Pricing Contents
  const materialDetailTablePricingHTML =
    "<table id='" +
    obj.id +
    "_pricing_table' class='material_detail_pricing_table'>" +
    "<tbody id='" +
    obj.id +
    "_pricing_table_body' class='material_detail_pricing_table_body'>" +
    "<tr id='" +
    obj.id +
    "_pricing_suitable_for_row_body' class='material_detail_pricing_suitable_for_row_body material_detail_pricing_row_body'>" +
    "<td id='" +
    obj.id +
    "_pricing_suitable_for_row_header' class='material_detail_pricing_suitable_for_row_header  material_detail_pricing_header'>Suitable for</td>" +
    "<td id='" +
    obj.id +
    "_pricing_suitable_for_row_detail' class='material_detail_pricing_suitable_for_row_detail material_detail_pricing_detail_odd'>" +
    obj.suitableFor +
    "</td>" +
    "</tr>" +
    "<tr id='" +
    obj.id +
    "_pricing_quality_row_body' class='material_detail_pricing_quality_row_body material_detail_pricing_row_body'>" +
    "<td id='" +
    obj.id +
    "_pricing_quality_row_header' class='material_detail_pricing_quality_row_header  material_detail_pricing_header'>Quality</td>" +
    "</tr>" +
    "<tr id='" +
    obj.id +
    "_pricing_z_resolution_row_body' class='material_detail_pricing_z_resolution_row_body material_detail_pricing_row_body'>" +
    "<td id='" +
    obj.id +
    "_pricing_z_resolution_row_header' class='material_detail_pricing_z_resolution_row_header  material_detail_pricing_header'>Z-Resolution</td>" +
    "</tr>" +
    "<tr id='" +
    obj.id +
    "_pricing_suitable_dimension_row_body' class='material_detail_pricing_suitable_dimension_row_body material_detail_pricing_row_body'>" +
    "<td id='" +
    obj.id +
    "_pricing_suitable_dimension_row_header' class='material_detail_pricing_suitable_dimension_row_header  material_detail_pricing_header'>Suitable Dimension</td>" +
    "</tr>" +
    "<tr id='" +
    obj.id +
    "_pricing_basic_pricing_row_body' class='material_detail_pricing_basic_pricing_row_body material_detail_pricing_row_body'>" +
    "<td id='" +
    obj.id +
    "_pricing_basic_pricing_row_header' class='material_detail_pricing_basic_pricing_row_header  material_detail_pricing_header'>Basic Pricing</td>" +
    "</tr>" +
    "<tr id='" +
    obj.id +
    "_pricing_priority_pricing_row_body' class='material_detail_pricing_priority_pricing_row_body material_detail_pricing_row_body'>" +
    "<td id='" +
    obj.id +
    "_pricing_priority_pricing_row_header' class='material_detail_pricing_priority_pricing_row_header  material_detail_pricing_header'>Priority Pricing</td>" +
    "</tr>" +
    "</tbody>" +
    "</table>";

  materialDetailsPricingBodyPointer.insertAdjacentHTML(
    "beforeend",
    materialDetailTablePricingHTML
  );

  addMaterialDetailQualityDetails(obj.id, obj.qualityArray);
  addMaterialDetailZResolutionDetails(obj.id, obj.zResolutionArray);
  addMaterialDetailSuitableDimensionDetails(obj.id, obj.suitableDimesnionArray);
  addMaterialDetailBasicPricingDetails(obj.id, obj.basicPricingArray);
  addMaterialDetailPriorityPricingDetails(obj.id, obj.priorityPricingArray);
};

const addMaterialDetailQualityDetails = (id, arr) => {
  const materialDetailPricingDetailsArrayWidth = 75 / arr.length + "%";
  arr.forEach(ele => {
    const materialDetailQualityDetail =
      "<td style='max-width:" +
      materialDetailPricingDetailsArrayWidth +
      ";width:" +
      materialDetailPricingDetailsArrayWidth +
      ";min-width:" +
      materialDetailPricingDetailsArrayWidth +
      "' class='material_detail_pricing_details_array_even material_detail_quality_pricing_details_array'>" +
      ele +
      "</td>";
    document
      .querySelector("#" + id + "_pricing_quality_row_body")
      .insertAdjacentHTML("beforeend", materialDetailQualityDetail);
  });
};

const addMaterialDetailZResolutionDetails = (id, arr) => {
  const materialDetailPricingDetailsArrayWidth = 75 / arr.length + "%";
  arr.forEach(ele => {
    const materialDetailZResolutionDetail =
      "<td style='max-width:" +
      materialDetailPricingDetailsArrayWidth +
      ";width:" +
      materialDetailPricingDetailsArrayWidth +
      ";min-width:" +
      materialDetailPricingDetailsArrayWidth +
      "' class='material_detail_pricing_details_array_odd material_detail_z_resolution_pricing_details_array'>" +
      ele +
      "</td>";
    document
      .querySelector("#" + id + "_pricing_z_resolution_row_body")
      .insertAdjacentHTML("beforeend", materialDetailZResolutionDetail);
  });
};

const addMaterialDetailSuitableDimensionDetails = (id, arr) => {
  const materialDetailPricingDetailsArrayWidth = 75 / arr.length + "%";
  arr.forEach(ele => {
    const materialDetailSuitableDimensionDetail =
      "<td style='max-width:" +
      materialDetailPricingDetailsArrayWidth +
      ";width:" +
      materialDetailPricingDetailsArrayWidth +
      ";min-width:" +
      materialDetailPricingDetailsArrayWidth +
      "' class='material_detail_pricing_details_array_even material_detail_suitable_dimension_pricing_details_array'>" +
      ele +
      "</td>";
    document
      .querySelector("#" + id + "_pricing_suitable_dimension_row_body")
      .insertAdjacentHTML("beforeend", materialDetailSuitableDimensionDetail);
  });
};

const addMaterialDetailBasicPricingDetails = (id, arr) => {
  const materialDetailPricingDetailsArrayWidth = 75 / arr.length + "%";
  arr.forEach(ele => {
    const materialDetailBasicPricingDetail =
      "<td style='max-width:" +
      materialDetailPricingDetailsArrayWidth +
      ";width:" +
      materialDetailPricingDetailsArrayWidth +
      ";min-width:" +
      materialDetailPricingDetailsArrayWidth +
      "' class='material_detail_basic_pricing_pricing_details_array material_detail_pricing_details_array_odd'>" +
      ele +
      "</td>";
    document
      .querySelector("#" + id + "_pricing_basic_pricing_row_body")
      .insertAdjacentHTML("beforeend", materialDetailBasicPricingDetail);
  });
};

const addMaterialDetailPriorityPricingDetails = (id, arr) => {
  const materialDetailPricingDetailsArrayWidth = 75 / arr.length + "%";
  arr.forEach(ele => {
    const materialDetailPriorityPricingDetail =
      "<td style='max-width:" +
      materialDetailPricingDetailsArrayWidth +
      ";width:" +
      materialDetailPricingDetailsArrayWidth +
      ";min-width:" +
      materialDetailPricingDetailsArrayWidth +
      "' class='material_detail_priority_pricing_pricing_details_array material_detail_pricing_details_array_even'>" +
      ele +
      "</td>";
    document
      .querySelector("#" + id + "_pricing_priority_pricing_row_body")
      .insertAdjacentHTML("beforeend", materialDetailPriorityPricingDetail);
  });
};
