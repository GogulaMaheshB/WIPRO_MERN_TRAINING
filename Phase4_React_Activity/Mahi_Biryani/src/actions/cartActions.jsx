import CartStore from "../stores/cartStore";

export const addToCart = (food) => {
  CartStore.add(food);
};

export const removeFromCart = (id) => {
  CartStore.remove(id);
};
