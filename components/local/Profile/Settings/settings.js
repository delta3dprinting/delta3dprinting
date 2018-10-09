// Profile Settings Object
let profileSettingsObject;

// Profile Settings Object Properties
const profileSettingsId = "settings";
const profileSettingsName = "Settings";
const profileSettingsMethod = () => {
  console.log("Profile Settings");
};

// Contruct Profile Settings Object
const contructProfileSettingsObject = () => {
  profileSettingsObject = new profileComponentObject(
    profileSettingsId,
    profileSettingsName,
    profileSettingsMethod
  );
};
