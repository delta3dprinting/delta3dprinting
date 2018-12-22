// Construct settings: profile object
let profileSettingsProfileObject;

const constructProfileSettingsProfileObject = () => {
  const tabId = "profile_settings_profile";
  const tabName = "Profile";
  const tabMethod = () => {
    profileSettingsProfileInit();
  };

  profileSettingsProfileObject = new profilSettingsComponentObject(
    tabId,
    tabName,
    tabMethod
  );
};

// Initialise settings: profile
const profileSettingsProfileInit = () => {
  constructProfileSettingsProfileStructure();
  profileSettingsProfileBasicInformationInit();
  profileSettingsProfileAddressInit();
  profileSettingsProfileUpdateInputFields();
  profileSettingsProfileUpdateProfileInit();
};

// Construct the structure for settings: profile
const constructProfileSettingsProfileStructure = () => {
  const profileSettingsProfileStructureHTML =
    "<div id='profile_settings_profile_body'>" +
    "<div id='profile_settings_profile_basic_information_body' class='profile_settings_edit_profile_body'></div>" +
    "<div id='profile_settings_profile_shipping_address_body' class='profile_settings_edit_profile_body'></div>" +
    "<div id='profile_settings_profile_button_body'></div>" +
    "</div>";

  document.querySelector(
    "#profile_settings_components_body"
  ).innerHTML = profileSettingsProfileStructureHTML;
};

/* POPULATE INPUT FIELDS */
const profileSettingsProfileUpdateInputFields = () => {
  // Get Profile Details
  $.ajax({
    type: "POST",
    url: "/profile/profile-details",
    success: data => {
      // Populate Input Fields
      profileSettingsProfilePopulateInputFields(data.content);
    }
  });
};

const profileSettingsProfilePopulateInputFields = profileDetails => {
  document.querySelector(
    "#profile_settings_edit_profile_first_name_input"
  ).value = profileDetails.firstName;
  document.querySelector(
    "#profile_settings_edit_profile_middle_names_input"
  ).value = profileDetails.middleNames;
  document.querySelector(
    "#profile_settings_edit_profile_last_name_input"
  ).value = profileDetails.lastName;
  document.querySelector(
    "#profile_settings_edit_profile_street_number_input"
  ).value = profileDetails.shippingAddress.streetNumber;
  document.querySelector("#profile_settings_edit_profile_route_input").value =
    profileDetails.shippingAddress.streetName;
  document.querySelector(
    "#profile_settings_edit_profile_sublocality_level_1_input"
  ).value = profileDetails.shippingAddress.suburb;
  document.querySelector(
    "#profile_settings_edit_profile_locality_input"
  ).value = profileDetails.shippingAddress.city;
  document.querySelector(
    "#profile_settings_edit_profile_postal_code_input"
  ).value = profileDetails.shippingAddress.postcode;
  document.querySelector("#profile_settings_edit_profile_country_input").value =
    profileDetails.shippingAddress.country;
};
