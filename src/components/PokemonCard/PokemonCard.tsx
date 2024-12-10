// components/PokemonCard/PokemonCard.tsx

import Image from 'next/image';

interface Pokemon {
  name: string;
  image: string;
  types: string[];
  generation: number;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: {[key: string]: string} = {
  electric: "bg-yellow-400 text-white",
  water: "bg-blue-400 text-white",
  fire: "bg-red-400 text-white",
  grass: "bg-green-400 text-white",
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200 bg-white">
      <div className="flex justify-center">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <h2 className="text-xl font-semibold text-center mt-2">{pokemon.name}</h2>
      <p className="text-gray-600 text-center">Generation: {pokemon.generation}</p>
      <div className="flex justify-center space-x-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              typeColors[type.toLowerCase()] || 'bg-gray-300 text-gray-800'
            }`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
