// Check if User is Logged In and if user is Real
const loginStatus = new Promise((resolve, reject) => {
  $.ajax({
    url: "/users/login-status",
    success: data => {
      resolve(data);
    }
  });
});
