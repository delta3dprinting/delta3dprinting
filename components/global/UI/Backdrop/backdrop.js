const backdropHTML = '<div id="backdrop"></div>';

let backdropPointer;

let backdropActive = false;

const addBackdrop = () => {
  if (backdropActive) {
    removeBackdrop();
  }
  rootPointer.insertAdjacentHTML("afterbegin", backdropHTML);
  backdropPointer = document.querySelector("#backdrop");
  backdropActive = true;
};

const removeBackdrop = () => {
  rootPointer.removeChild(backdropPointer);
  backdropActive = false;
};
