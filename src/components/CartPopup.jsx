import { useEffect, useState } from "react";
import CartStore from "../stores/cartStore";

function CartPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = (state) => {
      setVisible(state.showPopup);
    };

    CartStore.subscribe(update);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        fixed top-20 right-6 z-50
        bg-green-600 text-white
        px-6 py-3 rounded-xl shadow-lg
        animate-cart-popup
      "
    >
      🛒 Item added to cart
    </div>
  );
}

export default CartPopup;
