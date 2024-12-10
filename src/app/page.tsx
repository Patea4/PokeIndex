import Image from "next/image";
import PokemonCard from "@/components/PokemonCard/PokemonCard";

export default function Home() {
  const pikachu = {
    name : "Pikachu",
    image : "/images/pikachu.png",
    types : ["Electric"],
    generation: 1
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <PokemonCard pokemon = {pikachu} />
    </div>
  );
}
