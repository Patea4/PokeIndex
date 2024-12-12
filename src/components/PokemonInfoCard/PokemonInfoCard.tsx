// components/PokemonInfoCard/PokemonInfoCard.tsx

import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';
import { getTypeColor } from '@/utils/getTypeColor';

interface PokemonInfoCardProps {
  pokemon: Pokemon;
}

const PokemonInfoCard: React.FC<PokemonInfoCardProps> = ({ pokemon }) => {
  const imageUrl = `/images/sprites/${pokemon.id}.png`;

  return (
    <div className="flex flex-col h-full p-4 bg-white dark:bg-gray-800 rounded-md shadow-md transition-colors duration-300">
      <div className="flex justify-center mb-4">
        <Image
          src={imageUrl}
          alt={pokemon.name}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <h2 className="text-xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100 capitalize">{pokemon.name}</h2>
      <div className="flex justify-center space-x-2 mb-4">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`px-2 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(type)}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-4 italic">
        {pokemon.description}
      </p>
      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
        <p><strong>Generation:</strong> {pokemon.generation}</p>
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
      </div>
      <div className="pt-2 text-sm text-gray-700 dark:text-gray-300">
        <p><strong>Abilities:</strong></p>
        <ul className="list-disc list-inside pl-4">
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name} className="capitalize">{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <div className="pt-2 text-sm text-gray-700 dark:text-gray-300">
          <p><strong>Evolution Chain:</strong></p>
          <div className="flex items-center space-x-2 mt-1">
            {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
              pokemon.evolutions.map((evolution, index) => {
                const evolutionId = !isNaN(parseInt(evolution, 10))
                  ? parseInt(evolution, 10).toString()
                  : null;

                if (!evolutionId) {
                  console.warn(`Invalid evolution ID: ${evolution}`);
                  return null;
                }

                const evoImageUrl = `/images/sprites/${evolutionId}.png`;

                return (
                  <div className="flex items-center" key={evolution}>
                    <Image
                      src={evoImageUrl}
                      alt={evolution}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    {index < pokemon.evolutions.length - 1 && (
                      <span className="text-xl font-bold text-gray-600 dark:text-gray-400">→</span>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No evolutions available for this Pokémon.</p>
            )}
          </div>
      </div>
    </div>
  );
};

export default PokemonInfoCard;
