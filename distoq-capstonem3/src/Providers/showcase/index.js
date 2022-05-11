import { createContext, useState, useEffect } from "react";
import api from "../../services/api";

export const ShowcaseContext = createContext([]);

export const ShowcaseProvider = ({ children }) => {
  const [listProducts, setListProducts] = useState([]);

  const getProducts = () => {
    api.get(`/products`).then((resp) => {
      console.log("data em getProducts", resp.data);
      setListProducts(resp.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ShowcaseContext.Provider value={{ listProducts }}>
      {children}
    </ShowcaseContext.Provider>
  );
};
