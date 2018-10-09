let modalActive = false;
let modalPointer;

// Add Modal
const addModal = id => {
  // Create the Modal HTML
  const modalHTML = "<div id='" + id + "_modal' class='modal'></div>";

  if (modalActive) {
    removeModal();
    removeBackdrop();
  }
  rootPointer.insertAdjacentHTML("afterbegin", modalHTML);
  modalPointer = document.querySelector("#" + id + "_modal");
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
