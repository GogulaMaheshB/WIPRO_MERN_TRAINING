let isAdmin = !!localStorage.getItem("admin");
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
      localStorage.setItem("admin", "true");
      isAdmin = true;
      this.notify();
    }
  },

  logout() {
    localStorage.removeItem("admin");
    isAdmin = false;
    this.notify();
  },

  isAuthenticated() {
    return isAdmin;
  }
};

export default AuthStore;
