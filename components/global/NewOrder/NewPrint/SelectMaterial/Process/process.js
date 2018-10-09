// Create Class Object for a Process
class NewPrintOrderProcessObject {
  constructor(id, name, materialObjectArray) {
    this.id = id;
    this.name = name;
    this.materialObjectArray = materialObjectArray;
  }
}

const constructSelectMaterialFormProcess = objArr => {
  document.querySelector("#order_new_prints_processes_input_body").innerHTML =
    "";
  document.querySelector("#order_new_prints_materials_input_body").innerHTML =
    "";
  selectedSelectMaterialProcessId = undefined;
  objArr.forEach(obj => {
    const selectMaterialFormProcessHTML =
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
      .querySelector("#order_new_prints_processes_input_body")
      .insertAdjacentHTML("beforeend", selectMaterialFormProcessHTML);

    document
      .querySelector("#order_new_prints_" + obj.id + "_body")
      .addEventListener("click", () => {
        deselectSelectMaterialProcess(obj);
        selectSelectMaterialProcess(obj);
      });
  });
};

let selectedSelectMaterialProcessId;
/* Select Process */
const selectSelectMaterialProcess = obj => {
  if (selectedSelectMaterialProcessId == obj.id) {
    return;
  }

  constructSelectMaterialFormMaterial(obj.materialObjectArray);

  // Change the CSS of Selected Process
  const processBodyPointer = document.querySelector(
    "#order_new_prints_" + obj.id + "_body"
  );
  const processTextPointer = document.querySelector(
    "#order_new_prints_" + obj.id + "_text"
  );
  // Body
  processBodyPointer.style.opacity = "1";
  processBodyPointer.style.boxShadow = "0 0 0 0 rgba(20, 40, 50, 0.3)";
  processBodyPointer.style.borderWidth = "0.8vmin";
  processBodyPointer.style.borderColor = "rgb(170, 10, 10)";
  // Text
  processTextPointer.style.fontWeight = "bold";
  processTextPointer.style.color = "rgb(170, 10, 10)";

  // Update selectedSelectMaterialProcessId Variable
  selectedSelectMaterialProcessId = obj.id;
};

/* Deselect Selected Process */
const deselectSelectMaterialProcess = obj => {
  if (
    !selectedSelectMaterialProcessId ||
    selectedSelectMaterialProcessId == obj.id
  ) {
    return;
  }

  // Change the CSS of Selected Material Group
  const processBodyPointer = document.querySelector(
    "#order_new_prints_" + selectedSelectMaterialProcessId + "_body"
  );
  const processTextPointer = document.querySelector(
    "#order_new_prints_" + selectedSelectMaterialProcessId + "_text"
  );
  // Body
  processBodyPointer.style.opacity = "0.5";
  processBodyPointer.style.boxShadow =
    "0 0.5vmin 2vmin 0 rgba(20, 40, 50, 0.3)";
  processBodyPointer.style.borderWidth = "0.2vmin";
  processBodyPointer.style.borderColor = "rgb(100, 100, 100)";
  // Text
  processTextPointer.style.fontWeight = "500";
  processTextPointer.style.color = "rgb(100, 100, 100)";
};
