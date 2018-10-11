let modalActive = false;
let modalPointer;
let modalBodyPointer;

// Add Modal
const addModal = (id, headerText, footerContent) => {
  // Create the Modal HTML
  const modalHTML =
    "<div id='" +
    id +
    "_modal' class='modal'>" +
    "<div id='" +
    id +
    "_modal_header_body' class='modal_header_body'>" +
    "<div id='" +
    id +
    "_modal_header_text' class='modal_header_text'>" +
    headerText +
    "</div>" +
    "</div>" +
    "<div id='" +
    id +
    "_modal_body' class='modal_body'></div>" +
    "<div id='" +
    id +
    "_modal_footer_body' class='modal_footer_body'>" +
    footerContent +
    "</div>" +
    "</div>";

  if (modalActive) {
    removeModal();
    removeBackdrop();
  }
  rootPointer.insertAdjacentHTML("afterbegin", modalHTML);
  modalPointer = document.querySelector("#" + id + "_modal");
  modalBodyPointer = document.querySelector("#" + id + "_modal_body");
  addBackdrop();
  backdropPointer.addEventListener("click", () => {
    removeModal();
    removeBackdrop();
  });
  modalActive = true;
};

// Remove Modal
const removeModal = () => {
  rootPointer.removeChild(modalPointer);
  modalActive = false;
};
