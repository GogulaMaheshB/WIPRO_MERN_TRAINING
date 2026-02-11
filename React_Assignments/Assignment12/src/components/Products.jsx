import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/productSlice";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((s) => s.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      {products.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}