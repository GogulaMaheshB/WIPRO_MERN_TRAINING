import AuthStore from "../stores/authStore";

export const login = (user, pass) => {
  AuthStore.login(user, pass);
};

export const logout = () => {
  AuthStore.logout();
};
