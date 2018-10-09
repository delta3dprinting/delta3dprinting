// Create Class Object for a Material Group
class NewPrintOrderMaterialGroupObject {
  constructor(id, name, processObjectArray) {
    this.id = id;
    this.name = name;
    this.processObjectArray = processObjectArray;
  }
}

// Construct the Select Material Form Material Group
const constructSelectMaterialFormMaterialGroup = objArr => {
  objArr.forEach(obj => {
    const selectMaterialFormMaterialGroupHTML =
      "<div id='order_new_prints_" +
      obj.id +
      "_body' class='order_new_prints_material_group_body'>" +
      "<div id='order_new_prints_" +
      obj.id +
      "_text' class='order_new_prints_material_group_text'>" +
      obj.name +
      "</div>" +
      "</div>";

    document
      .querySelector("#order_new_prints_material_groups_input_body")
      .insertAdjacentHTML("beforeend", selectMaterialFormMaterialGroupHTML);

    document
      .querySelector("#order_new_prints_" + obj.id + "_body")
      .addEventListener("click", () => {
        deselectSelectMaterialMaterialGroup(obj);
        selectSelectMaterialMaterialGroup(obj);
      });
  });
};

let selectedSelectMaterialMaterialGroupId;

/* Select Material Group */
const selectSelectMaterialMaterialGroup = obj => {
  if (selectedSelectMaterialMaterialGroupId == obj.id) {
    return;
  }
  // Add the Processes
  constructSelectMaterialFormProcess(obj.materialObjectArray);

  // Change the CSS of Selected Material Group
  const materialGroupBodyPointer = document.querySelector(
    "#order_new_prints_" + obj.id + "_body"
  );
  const materialGroupTextPointer = document.querySelector(
    "#order_new_prints_" + obj.id + "_text"
  );
  // Body
  materialGroupBodyPointer.style.opacity = "1";
  materialGroupBodyPointer.style.boxShadow = "0 0 0 0 rgba(20, 40, 50, 0.3)";
  materialGroupBodyPointer.style.borderWidth = "0.8vmin";
  materialGroupBodyPointer.style.borderColor = "rgb(170, 10, 10)";
  // Text
  materialGroupTextPointer.style.fontWeight = "bold";
  materialGroupTextPointer.style.color = "rgb(170, 10, 10)";

  // Update selectedSelectMaterialMaterialGroupId Variable
  selectedSelectMaterialMaterialGroupId = obj.id;
};

/* Deselect Selected Material Group */
const deselectSelectMaterialMaterialGroup = obj => {
  if (
    !selectedSelectMaterialMaterialGroupId ||
    selectedSelectMaterialMaterialGroupId == obj.id
  ) {
    return;
  }

  // Change the CSS of Selected Material Group
  const materialGroupBodyPointer = document.querySelector(
    "#order_new_prints_" + selectedSelectMaterialMaterialGroupId + "_body"
  );
  const materialGroupTextPointer = document.querySelector(
    "#order_new_prints_" + selectedSelectMaterialMaterialGroupId + "_text"
  );
  // Body
  materialGroupBodyPointer.style.opacity = "0.5";
  materialGroupBodyPointer.style.boxShadow =
    "0 0.5vmin 2vmin 0 rgba(20, 40, 50, 0.3)";
  materialGroupBodyPointer.style.borderWidth = "0.2vmin";
  materialGroupBodyPointer.style.borderColor = "rgb(100, 100, 100)";
  // Text
  materialGroupTextPointer.style.fontWeight = "500";
  materialGroupTextPointer.style.color = "rgb(100, 100, 100)";
};
