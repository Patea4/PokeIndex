import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';


interface PokemonCardProps {
  pokemon: Pokemon;
  onHover?: () => void;
  onHoverOut?: () => void;
}


const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onHover}) => {
  const imageUrl = `/images/sprites/${pokemon.id}.png`;
  return (
    <div
      className=" rounded-lg p-4 transition-shadow duration-200  cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      onMouseEnter={onHover}
      //onMouseLeave={onHoverOut}
    >
      <Image
        src={imageUrl}
        alt={pokemon.name}
        width={100}
        height={100}
      />
    </div>
  );
};

export default PokemonCard;
