// Add Services Body
// Services Body HTML
const servicesBodyHTML = '<div id="services_body"></div>';

let servicesBodyPointer;

const addServicesBody = () => {
  // Create the Base HTML
  bodyPointer.insertAdjacentHTML("afterbegin", servicesBodyHTML);
  servicesBodyPointer = document.querySelector("#services_body");
  servicesBodyPointer.innerHTML = servicesComponentStructureHTML;
  // Populate the Base HTML with Contents
  addServiceTabs(createServicesObject());
  // Initial Tab Selection when page is loaded
  selectTab("make", createServicesObject());
};

// Structure HTML
const servicesComponentStructureHTML =
  '<div id="services_tab_body">' +
  '<div id="services_upper_half_tab">' +
  "</div>" +
  "</div>" +
  '<div id="service_body"></div>';

// Add Tabs
let selectedTabIndex;
const addServiceTabs = objArr => {
  // Add Tabs
  const tabWidth = 100 / objArr.length; // Calculate Width of Each Tabs
  objArr.forEach(ele => {
    // Base Tab HTML
    const serviceTabHTML =
      '<div id="' +
      ele.id +
      '_tab" class="service_tab"><div id="' +
      ele.id +
      '_text" class="service_tab_text">' +
      ele.tabName +
      "</div>" +
      "</div>";
    document
      .querySelector("#services_tab_body")
      .insertAdjacentHTML("beforeend", serviceTabHTML);
    // Assign CSS Attributes
    document.querySelector("#" + ele.id + "_tab").style.width = tabWidth + "%";
    document
      .querySelector("#" + ele.id + "_tab")
      .addEventListener("click", () => {
        deselectTab(objArr);
        selectTab(ele.id, objArr);
      });
    // HTML Body
    const serviceBodyHTML =
      "<div id='" +
      ele.id +
      "_contents_body' class='service_contents_body'>" +
      ele.content +
      "</div>";
    document
      .querySelector("#service_body")
      .insertAdjacentHTML("beforeend", serviceBodyHTML);
  });
};

const deselectTab = objArr => {
  if (selectedTabIndex != undefined) {
    const id = objArr[selectedTabIndex].id;
    document.querySelector("#" + id + "_tab").style.backgroundColor =
      "rgb(220, 220, 220)";
    document.querySelector("#" + id + "_text").style.opacity = "0.3";
    document.querySelector("#" + id + "_contents_body").style.opacity = "0";
    document.querySelector("#" + id + "_contents_body").style.zIndex = "0";
    // Reset CSS of Adjacent Tabs
    const leftAdjacentTabIndex = selectedTabIndex - 1;
    let leftAdjacentTabId;
    const rightAdjacentTabIndex = selectedTabIndex + 1;
    let rightAdjacentTabId;
    if (selectedTabIndex === 0) {
      rightAdjacentTabId = objArr[rightAdjacentTabIndex].id;
      document.querySelector(
        "#" + rightAdjacentTabId + "_tab"
      ).style.borderRadius = "0 0 0 0";
    } else if (selectedTabIndex === objArr.length - 1) {
      leftAdjacentTabId = objArr[leftAdjacentTabIndex].id;
      document.querySelector(
        "#" + leftAdjacentTabId + "_tab"
      ).style.borderRadius = "0 0 0 0";
    } else {
      rightAdjacentTabId = objArr[rightAdjacentTabIndex].id;
      leftAdjacentTabId = objArr[leftAdjacentTabIndex].id;
      document.querySelector(
        "#" + rightAdjacentTabId + "_tab"
      ).style.borderRadius = "0 0 0 0";
      document.querySelector(
        "#" + leftAdjacentTabId + "_tab"
      ).style.borderRadius = "0 0 0 0";
    }
  }
};

const selectTab = (id, objArr) => {
  selectedTabIndex = objArr.findIndex(x => x.id == id);
  // CSS Selected Tab
  document.querySelector("#" + id + "_tab").style.backgroundColor =
    "rgb(245, 245, 245)";
  document.querySelector("#" + id + "_text").style.opacity = "1";
  document.querySelector("#" + id + "_contents_body").style.opacity = "1";
  document.querySelector("#" + id + "_contents_body").style.zIndex = "1";
  if (selectedTabIndex === 0) {
    document.querySelector("#" + id + "_tab").style.borderRadius =
      "0 7.5vmin 0 0";
  } else if (selectedTabIndex === objArr.length - 1) {
    document.querySelector("#" + id + "_tab").style.borderRadius =
      "7.5vmin 0 0 0";
  } else {
    document.querySelector("#" + id + "_tab").style.borderRadius =
      "7.5vmin 7.5vmin 0 0";
  }
  // CSS Adjacent Tabs
  const leftAdjacentTabIndex = selectedTabIndex - 1;
  let leftAdjacentTabId;
  const rightAdjacentTabIndex = selectedTabIndex + 1;
  let rightAdjacentTabId;
  if (selectedTabIndex === 0) {
    rightAdjacentTabId = objArr[rightAdjacentTabIndex].id;
    document.querySelector(
      "#" + rightAdjacentTabId + "_tab"
    ).style.borderRadius = "0 0 0 7.5vmin";
  } else if (selectedTabIndex === objArr.length - 1) {
    leftAdjacentTabId = objArr[leftAdjacentTabIndex].id;
    document.querySelector(
      "#" + leftAdjacentTabId + "_tab"
    ).style.borderRadius = "0 0 7.5vmin 0";
  } else {
    rightAdjacentTabId = objArr[rightAdjacentTabIndex].id;
    leftAdjacentTabId = objArr[leftAdjacentTabIndex].id;
    document.querySelector(
      "#" + rightAdjacentTabId + "_tab"
    ).style.borderRadius = "0 0 0 7.5vmin";
    document.querySelector(
      "#" + leftAdjacentTabId + "_tab"
    ).style.borderRadius = "0 0 7.5vmin 0";
  }
};
