import { Pokemon } from "@/types/pokemon";
import { getTypeColor } from "@/utils/getTypeColor";
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
      <h2 className="text-2xl font-bold text-center mb-2">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <div className="flex justify-center space-x-2 mb-4">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`${getTypeColor(type)} text-white`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
      <p className="text-gray-300 text-center mb-4 ">
        {pokemon.description}
      </p>
      <div className="space-y-2">
        <p><strong>Generation:</strong> {pokemon.generation}</p>
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
      </div>
      <div className="pt-2">
        <p><strong>Abilities:</strong></p>
        <ul className="list-disc list-inside pl-4">
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name} className="capitalize">{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <div className="pt-2">
          <p><strong>Evolution Chain:</strong></p>
          <div className="flex items-center space-x-2">
            {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
              pokemon.evolutions.map((evolution, index) => {
                // Validate evolution ID
                const evolutionId = !isNaN(parseInt(evolution, 10))
                  ? parseInt(evolution, 10).toString()
                  : null;

                if (!evolutionId) {
                  console.warn(`Invalid evolution ID: ${evolution}`);
                  return null; // Skip invalid evolutions
                }
                const imageUrl = `/images/sprites/${evolutionId}.png`;

                return (
                  <div className="flex items-center" key={evolution}>
                    {/* Evolution Image */}
                    <Image
                      src={imageUrl}
                      alt={evolution}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                    {/* Arrow, if not the last evolution */}
                    {index < pokemon.evolutions.length - 1 && (
                      <span className="text-xl font-bold">→</span>
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
