import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onHover?: () => void;
  onHoverOut?: () => void;
  onClick?: () => void;

}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onHover, onHoverOut, onClick}) => {
  const imageUrl = `/images/sprites/${pokemon.id}.png`;
  return (
    <div
      className="
        p-2 m-2 rounded-lg 
        cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400
        bg-white dark:bg-gray-800 hover:shadow-md transition-shadow 
        text-gray-700 dark:text-gray-200
      "
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={pokemon.name}
        width={60}
        height={60}
        className="object-contain mx-auto"
      />
      <p className="text-center text-sm font-medium mt-1 capitalize">
        {pokemon.name}
      </p>
    </div>
  );
};

export default PokemonCard;
