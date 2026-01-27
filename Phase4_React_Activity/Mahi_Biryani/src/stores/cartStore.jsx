let cart = [];
let showPopup = false;
const listeners = [];

const CartStore = {
  subscribe(fn) {
    listeners.push(fn);
  },

  notify() {
    listeners.forEach((fn) =>
      fn({
        cart:[...cart],
        showPopup,
        total: this.getTotal(),
      })
    );
  },

  add(food) {
    const item = cart.find((i) => i.id === food.id);

    if (item) {
      cart = cart.map((i) =>
        i.id === food.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      cart = [...cart, { ...food, qty: 1 }];
    }

    // ✅ SHOW POPUP
    showPopup = true;
    this.notify();

    // ⏱ AUTO HIDE
    setTimeout(() => {
      showPopup = false;
      this.notify();
    }, 1500);
  },

  remove(id) {
    cart = cart.filter((i) => i.id !== id);
    this.notify();
  },
  clear(){
    cart=[]
    this.notify()
  },
  
  getCart() {
    return [...cart];
  },

  getTotal() {
    return cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  },
};

export default CartStore;
