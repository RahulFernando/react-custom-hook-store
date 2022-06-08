import React, { createContext, useState } from "react";

const PRODUCTS = [
  {
    id: "p1",
    title: "Red Scarf",
    description: "A pretty red scarf.",
    isFavorite: false,
  },
  {
    id: "p2",
    title: "Blue T-Shirt",
    description: "A pretty blue t-shirt.",
    isFavorite: false,
  },
  {
    id: "p3",
    title: "Green Trousers",
    description: "A pair of lightly green trousers.",
    isFavorite: false,
  },
  {
    id: "p4",
    title: "Orange Hat",
    description: "Street style! An orange hat.",
    isFavorite: false,
  },
];

export const ProductsContext = createContext({
  products: [],
  toggleFav: (productId) => {}
});

export default (props) => {
  const [products, setProducts] = useState(PRODUCTS);

  const toggleFav = (productId) => {
    setProducts((current) => {
      const prodIndex = current.findIndex((p) => p.id === productId);
      const newFavStatus = !current[prodIndex].isFavorite;
      const updatedProducts = [...current];
      updatedProducts[prodIndex] = {
        ...current[prodIndex],
        isFavorite: newFavStatus,
      };
      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider value={{ products, toggleFav }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
