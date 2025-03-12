"use client";

import { Prisma } from "@prisma/client";
import { ChefHat, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/formatCurrency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../contexts/cart";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: { select: { name: true; avatarImageUrl: true } } };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart } = useContext(CartContext);
  const handleAddToCart = () => {
    toggleCart();
  };

  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () =>
    setQuantity((prev) => Math.max(prev - 1, 0));

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl bg-white p-5">
        {/* Cabeçalho fixo - Restaurante e logo */}

        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>

        {/* Nome do produto */}
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        {/* Preço e quantidade */}
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* Área de conteúdo rolável - Descrição e ingredientes */}
        <div className="my-3 flex-auto overflow-hidden">
          <ScrollArea className="h-full flex-shrink-0 flex-grow">
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Sobre</h4>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  <ChefHat size={16} />
                  <h4 className="font-semibold">Ingredientes</h4>
                </div>
                <ul className="list-disc px-5 text-sm text-muted-foreground">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Botão fixo no final */}
        <Button
          className="sticky bottom-0 mt-4 w-full rounded-full shadow-lg"
          onClick={handleAddToCart}
        >
          Adicionar ao carrinho
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
