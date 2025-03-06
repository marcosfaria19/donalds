import Image from "next/image";

import { getRestaurantBySlug } from "@/data/get-restaurants-by-slug";

import ConsunptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* Logo e nome do restaurante */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant?.name}
          width={82}
          height={82}
        />
        <h2 className="text-2xl font-semibold">{restaurant?.name}</h2>
      </div>
      {/* Boas vindas */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Boas vindas!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsunptionMethodOption
          slug={slug}
          buttonText="Para comer aqui"
          imageAlt="Para comer aqui"
          imageUrl="/dine_in.png"
          option="DINE_IN"
        />
        <ConsunptionMethodOption
          slug={slug}
          buttonText="Para levar"
          imageAlt="Para levar"
          imageUrl="/takeaway.png"
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
