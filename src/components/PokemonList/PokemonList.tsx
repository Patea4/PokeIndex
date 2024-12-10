import { Pokemon } from "@/types/pokemon";
import PokemonCard from "../PokemonCard/PokemonCard";

interface PokemonListProps {
  pokemons: Pokemon[];
  onHover: (pokemon: Pokemon | null) => void;
  generation: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onHover, generation }) => {
  return (
    <div className="p-4 w-full">
      <hr className= "py-3"/>
      <h2 className="text-2xl font-bold mb-4 text-center">Generation {generation} ({pokemons.length})</h2>
      <div className="flex flex-wrap justify-start p-4">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onHover={() => onHover(pokemon)}
            onHoverOut={() => onHover(null)}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
