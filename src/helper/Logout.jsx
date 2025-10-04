export const logoutUser = () => {
    localStorage.removeItem("user_auth_token");
    sessionStorage.removeItem("fb_page_id");
    sessionStorage.removeItem("fb_access_token");
    sessionStorage.removeItem("user_id");
    // redirect to login page
    window.location.href = "/"; 
  };