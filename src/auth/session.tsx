export const isLogin =
  typeof localStorage !== "undefined" && localStorage.getItem("access_token")
    ? true
    : false;

export function createOrUpdateToken(data: any) {
  localStorage.setItem("access_token", JSON.stringify(data));
}

export function createOrUpdateRefreshToken(data: any) {
  localStorage.setItem("refresh_token", JSON.stringify(data));
}

export function createOrUpdateUser(data: any) {
  localStorage.setItem("user", JSON.stringify(data));
}

export function createOrUpdateRoles(data: any) {
  localStorage.setItem("roles", JSON.stringify(data));
}

export function destroySession() {
  if (isLogin) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
  }
}

export function getUser() {
  if (isLogin) {
    return JSON.parse(JSON.stringify(localStorage.getItem("user")));
  }
}

export function getRoles() {
  if (isLogin) {
    return JSON.parse(JSON.stringify(localStorage.getItem("roles")));
  }
}

export function getAccessToken() {
  if (isLogin) {
    return JSON.parse(JSON.stringify(localStorage.getItem("access_token")));
  }
}
