// Declare Array for the Selectable Materials
let selectMaterialObjectArray;

// Construct Array for the Selectable Materials
const constructSelectMaterialObjectArray = () => {
  constructNewOrderPlasticObject();
  constructNewOrderMetalObject();
  selectMaterialObjectArray = [newOrderPlasticObject, newOrderMetalObject];
};

// Construct the Select Material Form
const constructSelectMaterialForm = obj => {
  constSelectMaterialFormHTML =
    "<div id='order_new_prints_step_2_body' class='order_new_prints_step_body'>" +
    "<div id='order_new_prints_step_2_header_body' class='order_new_prints_steps_header_body'>" +
    "<div id='order_new_prints_step_2_header_text' class='order_new_prints_steps_header_text'>Step 2: Select " +
    "Material</div>" +
    "</div>" +
    "<div id='order_new_prints_material_groups_body' " +
    "class='order_new_prints_step_2_input_field_body'>" +
    "<div id='order_new_prints_material_groups_header_body' class='order_new_prints_step_2_header_body'>" +
    "<div id='order_new_prints_material_group_header_text' class='order_new_prints_step_2_header_text'>Material " +
    "Group</div>" +
    "</div>" +
    "<div id='order_new_prints_material_groups_input_body' class='order_new_prints_step_2_input_body'></div>" +
    "</div>" +
    "<div id='order_new_prints_processes_body' class='order_new_prints_step_2_input_field_body'>" +
    "<div id='order_new_prints_processes_header_body' class='order_new_prints_step_2_header_body'>" +
    "<div id='order_new_prints_processes_header_text' class='order_new_prints_step_2_header_text'>Process</div>" +
    "</div>" +
    "<div id='order_new_prints_processes_input_body' class='order_new_prints_step_2_input_body'></div>" +
    "</div>" +
    "<div id='order_new_prints_materials_body' class='order_new_prints_step_2_input_field_body'>" +
    "<div id='order_new_prints_materials_header_body' class='order_new_prints_step_2_header_body'>" +
    "<div id='order_new_prints_materials_header_text' class='order_new_prints_step_2_header_text'>Material</div>" +
    "</div>" +
    "<div id='order_new_prints_materials_input_body' class='order_new_prints_step_2_input_body'></div>" +
    "</div>" +
    "</div>";

  orderNewPrintPointer.insertAdjacentHTML(
    "beforeend",
    constSelectMaterialFormHTML
  );

  constructSelectMaterialFormMaterialGroup(obj);
};
