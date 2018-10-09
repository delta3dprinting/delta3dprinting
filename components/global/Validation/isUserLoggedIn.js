// Check if User is Logged In and if user is Real
const isUserLoggedIn = (pointer, callback) => {
  pointer.innerHTML = loaderElement;

  const checkIfUserIsAuthenticated = new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("/users/login-status").then(res => {
        loginStatus = res.data;
        console.log(loginStatus);
        resolve();
      });
    }, 2000);
  });

  checkIfUserIsAuthenticated.then(() => {
    pointer.innerHTML = "";
    callback();
  });
};
