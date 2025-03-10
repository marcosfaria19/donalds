"use client";

import { Prisma } from "@prisma/client";
import { ChefHat, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currenct";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: { select: { name: true; avatarImageUrl: true } } };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () =>
    setQuantity((prev) => Math.max(prev - 1, 0));

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);

  return (
    <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col rounded-t-3xl p-5">
      <div className="flex-auto">
        {/* Restaurante */}
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

        {/* Preço e quantidade do produto */}
        <div className="flex items-center justify-between">
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

        {/* Descrição do produto */}
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Sobre</h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        {/* Ingredientes */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-1">
            <ChefHat size={16} />
            <h4 className="font-semibold">Ingredientes</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            {product.ingredients.map((ingredient, index) => (
              <span key={index}>
                {index !== 0 && <br />} &bull; {ingredient}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Botão de adicionar ao carrinho */}
      <Button className="mt-6 w-full rounded-full">
        Adicionar ao carrinho
      </Button>
    </div>
  );
};

export default ProductDetails;
