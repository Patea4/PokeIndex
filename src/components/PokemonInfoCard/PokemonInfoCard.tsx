import { Pokemon } from "@/types/pokemon";
import { getTypeClasses } from "@/utils/getTypeClasses";
import Image from 'next/image';

interface PokemonInfoCardProps {
  pokemon: Pokemon;
}

const PokemonInfoCard: React.FC<PokemonInfoCardProps> = ({ pokemon }) => {
  const imageUrl = `/images/sprites/${pokemon.id}.png`;

  return (
    <div className="flex flex-col h-full p-4 ">
      <div className="flex justify-center mb-4">
        <Image
          src={imageUrl}
          alt={pokemon.name}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">{pokemon.name}</h2>
      <p className="text-gray-300 text-center mb-4 ">
        {pokemon.description}
      </p>
      <div className="flex justify-center space-x-2 mb-4">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={getTypeClasses(type)}
          >
            {type}
          </span>
        ))}
      </div>
      <div className="space-y-2">
        <p><strong>Generation:</strong> {pokemon.generation}</p>
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
      </div>
    </div>
  );
};

export default PokemonInfoCard;
