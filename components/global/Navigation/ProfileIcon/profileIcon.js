const profileIconInit = () => {
  document
    .querySelector("#toolbar")
    .insertAdjacentHTML("beforeend", profileIconBodyHTML);
  document
    .querySelector("#profile_icon_body")
    .insertAdjacentHTML("beforeend", profileImage);
  profileDrawerInit();
};

class ProfileDrawerObject {
  constructor(id, name, method) {
    this.id = id;
    this.name = name;
    this.method = method;
  }
}

const profileImage =
  '<img src="https://rawgit.com/delta3dprinting/delta3dprinting/master/assets/profile.png" alt="Profile" id="profile_image">';

const profileIconBodyHTML =
  "<div id='profile_icon_body' onclick='profileClicked();'></div>";

const profileClicked = () => {
  toggleProfileDrawer();
};