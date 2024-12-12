import { Pokemon } from "@/types/pokemon";
import PokemonCard from "../PokemonCard/PokemonCard";

interface PokemonListProps {
  pokemons: Pokemon[];
  onHover: (pokemon: Pokemon | null) => void;
  onClick: (pokemon: Pokemon | null) => void;
  generation: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onHover, onClick, generation }) => {
  return (
    <div className="p-4 w-full bg-white dark:bg-gray-800 rounded-md shadow-sm transition-colors duration-300">
      <hr className="py-3 border-gray-300 dark:border-gray-700"/>
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100 transition-colors">
        Generation {generation} ({pokemons.length})
      </h2>
      <div className="flex flex-wrap justify-start p-4">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onHover={() => onHover(pokemon)}
            onHoverOut={() => onHover(null)}
            onClick={() => onClick(pokemon)}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
