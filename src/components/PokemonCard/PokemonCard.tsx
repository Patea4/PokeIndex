import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';


interface PokemonCardProps {
  pokemon: Pokemon;
  onHover?: () => void;
  onHoverOut?: () => void;
}


const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onHover, onHoverOut}) => {
  return (
    <div
      className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
    >
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={100}
        height={100}
        className="rounded-full"
      />
    </div>
  );
};

export default PokemonCard;
