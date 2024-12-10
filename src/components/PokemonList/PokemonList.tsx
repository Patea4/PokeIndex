import { Pokemon } from "@/types/pokemon";
import PokemonCard from "../PokemonCard/PokemonCard";

interface PokemonListProps {
  pokemons: Pokemon[];
  onHover: (pokemon: Pokemon | null) => void;
  generation: number;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onHover, generation }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Generation: {generation}</h2>
      <div className="flex flex-wrap justify-start gap-4 p-4">
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
