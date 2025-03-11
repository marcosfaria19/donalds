"use client";

import { Prisma } from "@prisma/client";
import { ChefHat, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/formatCurrency";

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
    <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl bg-white p-5">
      {/* Cabeçalho fixo */}

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

      <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

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

      {/* Área de conteúdo rolável */}
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
              <div className="text-sm text-muted-foreground">
                {product.ingredients.map((ingredient, index) => (
                  <p key={index} className="flex items-center gap-2">
                    <span>•</span>
                    {ingredient}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Botão fixo no final */}
      <Button className="sticky bottom-0 mt-4 w-full rounded-full shadow-lg">
        Adicionar ao carrinho
      </Button>
    </div>
  );
};

export default ProductDetails;
