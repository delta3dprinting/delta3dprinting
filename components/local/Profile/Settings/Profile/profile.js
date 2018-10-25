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
};

// Construct the structure for settings: profile
const constructProfileSettingsProfileStructure = () => {
  const profileSettingsProfileStructureHTML =
    "<div id='profile_settings_profile_body'>" +
    "<div id='profile_settings_profile_basic_information_body' class='profile_settings_edit_profile_body'></div>" +
    "</div>";

  document.querySelector(
    "#profile_settings_components_body"
  ).innerHTML = profileSettingsProfileStructureHTML;
};
