// Create the Modal HTML
const modalHTML = "<div id='modal'></div>";

let modalActive = false;

// Add Modal
const addModal = () => {
  if (modalActive) {
    removeModal();
    removeBackdrop();
  }
  rootPointer.insertAdjacentHTML("afterbegin", modalHTML);
  modalPointer = document.querySelector("#modal");
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
