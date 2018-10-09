// Create Class Object for a Material
class NewPrintOrderMaterialObject {
  constructor(id, name, method) {
    this.id = id;
    this.name = name;
    this.method = method;
  }
}

const constructSelectMaterialFormMaterial = objArr => {
  document.querySelector("#order_new_prints_materials_input_body").innerHTML =
    "";
  selectedSelectMaterialMaterialId = undefined;
  objArr.forEach(obj => {
    const selectMaterialFormMaterialHTML =
      "<div id='order_new_prints_" +
      obj.id +
      "_body' class='order_new_prints_process_body'>" +
      "<div id='order_new_prints_" +
      obj.id +
      "_text' class='order_new_prints_process_text'>" +
      obj.name +
      "</div>" +
      "</div>";

    document
      .querySelector("#order_new_prints_materials_input_body")
      .insertAdjacentHTML("beforeend", selectMaterialFormMaterialHTML);

    document
      .querySelector("#order_new_prints_" + obj.id + "_body")
      .addEventListener("click", () => {
        deselectSelectMaterialMaterial(obj);
        selectSelectMaterialMaterial(obj);
      });
  });
};

let selectedSelectMaterialMaterialId;

/* Select Material */
const selectSelectMaterialMaterial = obj => {
  if (selectedSelectMaterialMaterialId == obj.id) {
    return;
  }
  // Execute the Method
  obj.method();

  // Change the CSS of Selected Material
  const materialBodyPointer = document.querySelector(
    "#order_new_prints_" + obj.id + "_body"
  );
  const materialTextPointer = document.querySelector(
    "#order_new_prints_" + obj.id + "_text"
  );
  // Body
  materialBodyPointer.style.opacity = "1";
  materialBodyPointer.style.boxShadow = "0 0 0 0 rgba(20, 40, 50, 0.3)";
  materialBodyPointer.style.borderWidth = "0.8vmin";
  materialBodyPointer.style.borderColor = "rgb(170, 10, 10)";
  // Text
  materialTextPointer.style.fontWeight = "bold";
  materialTextPointer.style.color = "rgb(170, 10, 10)";

  // Update selectedSelectMaterialMaterialId Variable
  selectedSelectMaterialMaterialId = obj.id;
};

/* Deselect Selected Material Group */
const deselectSelectMaterialMaterial = obj => {
  if (
    !selectedSelectMaterialMaterialId ||
    selectedSelectMaterialMaterialId == obj.id
  ) {
    return;
  }

  // Change the CSS of Selected Material Group
  const materialBodyPointer = document.querySelector(
    "#order_new_prints_" + selectedSelectMaterialMaterialId + "_body"
  );
  const materialTextPointer = document.querySelector(
    "#order_new_prints_" + selectedSelectMaterialMaterialId + "_text"
  );
  // Body
  materialBodyPointer.style.opacity = "0.5";
  materialBodyPointer.style.boxShadow =
    "0 0.5vmin 2vmin 0 rgba(20, 40, 50, 0.3)";
  materialBodyPointer.style.borderWidth = "0.2vmin";
  materialBodyPointer.style.borderColor = "rgb(100, 100, 100)";
  // Text
  materialTextPointer.style.fontWeight = "500";
  materialTextPointer.style.color = "rgb(100, 100, 100)";
};
