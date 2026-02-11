let isAdmin = false;
const listeners = [];

const AuthStore = {
  subscribe(fn) {
    listeners.push(fn);
  },

  notify() {
    listeners.forEach(fn => fn(isAdmin));
  },

  login(user, pass) {
    if (user === "MaheshBabu" && pass === "MaheshBabu@1437") {
      isAdmin = true;
      localStorage.setItem("admin", "true");
      this.notify();
      return true;
    }
    return false;
  },

  logout() {
    isAdmin = false;
    localStorage.removeItem("admin");
    this.notify();
  },

  isAuthenticated() {
    return isAdmin || !!localStorage.getItem("admin");
  }
};

export default AuthStore;
