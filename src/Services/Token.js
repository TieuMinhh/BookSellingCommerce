function setToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
  // localStorage.setItem("refreshToken", refreshToken);
}
function getToken() {
  return [localStorage.getItem("userData")];
}
export { setToken, getToken };
