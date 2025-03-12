"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addProduct = (product: CartProduct) => {
    setProducts((prevProducts) => {
      const productIsAlreadyInCart = prevProducts.some(
        (prevProduct) => prevProduct.id === product.id,
      );
      if (!productIsAlreadyInCart) {
        return [...prevProducts, product];
      }
      return prevProducts.map((prevProduct) =>
        prevProduct.id === product.id
          ? {
              ...prevProduct,
              quantity: prevProduct.quantity + product.quantity,
            }
          : prevProduct,
      );
    });
  };

  return (
    <CartContext.Provider value={{ isOpen, products, toggleCart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};
