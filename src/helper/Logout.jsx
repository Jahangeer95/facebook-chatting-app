export const logoutUser = () => {
    localStorage.removeItem("user_auth_token");
    sessionStorage.removeItem("fb_page_id");
    sessionStorage.removeItem("fb_access_token");
    localStorage.removeItem("user_id");
    sessionStorage.removeItem("fb_ad_account_id");
    localStorage.removeItem("user")
    // redirect to login page
    window.location.href = "/"; 
  };