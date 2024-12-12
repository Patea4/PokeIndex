import PokemonInfoCard from '@/components/PokemonInfoCard/PokemonInfoCard';
import PokemonList from "@/components/PokemonList/PokemonList";
import { useState } from 'react';
import Header from '@/components/header/header';
import { Pokemon, Ability } from '@/types/pokemon';
import clientPromise from '@/utils/mongodb';
import { GetStaticProps } from 'next';
import { transformGeneration } from '@/utils/generation';

interface HomeProps {
  pokemons: Pokemon[];
}

const generations = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export default function Home({ pokemons }: HomeProps) {
  const [hoveredPokemon, setHoveredPokemon] = useState<Pokemon | null>(null);
  const [clickedPokemon, setClickedPokemon] = useState<Pokemon | null>(null);
  const [searchState, setSearchState] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const tokens = searchState.toLowerCase().split(/\s+/).filter(Boolean);

  const filteredPokemons = pokemons.filter((pokemon) => {
    return tokens.every(token => {
      const inName = pokemon.name.toLowerCase().includes(token);
      const inTypes = pokemon.types.some(type => type.toLowerCase().includes(token));
      const inColor = pokemon.color && pokemon.color.toLowerCase().includes(token);
      const inDescription = pokemon.description && pokemon.description.toLowerCase().includes(token);
      const inAbilities = pokemon.abilities.some(ability => ability.ability.name.toLowerCase().includes(token));

      return inName || inTypes || inColor || inDescription || inAbilities;
    });
  });

  const selectedPokemon = hoveredPokemon || clickedPokemon;

  const getPokemonsByGeneration = (gen: string) =>
    filteredPokemons.filter((pokemon) => pokemon.generation === gen);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
        <Header
          searchState={searchState}
          setSearchStateAction={setSearchState}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <div className="flex-1 pt-20 flex flex-col lg:flex-row">
          <div className="
            w-full lg:w-[400px] p-4 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700
            h-auto lg:h-full lg:overflow-y-auto lg:fixed lg:top-20 lg:left-0 shadow-lg transition-colors duration-300
          ">
            {selectedPokemon ? (
              <PokemonInfoCard pokemon={selectedPokemon} />
            ) : (
              <p className="text-center mt-10 italic text-gray-600 dark:text-gray-400">Hover over a Pokémon</p>
            )}
          </div>

          <div className="flex flex-col w-full lg:ml-[400px] p-4 space-y-4 overflow-y-auto">
            {generations.map((generation) => {
              const pokemonInGen = getPokemonsByGeneration(generation);
              return (
                <PokemonList
                  pokemons={pokemonInGen}
                  onHover={setHoveredPokemon}
                  onClick={setClickedPokemon}
                  generation={generation}
                  key={generation}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    const pokemonsData = await db.collection('pokemon').find({}).toArray();

    const pokemons: Pokemon[] = pokemonsData.map((doc) => {
      const generation = transformGeneration(doc.generation || '');

      const abilities: Ability[] = (doc.abilities || []).map((abilityObj: Ability) => ({
        ability: {
          name: abilityObj.ability.name.replaceAll("-", " ") || 'Unknown Ability',
          url: abilityObj.ability.url || '',
        },
        is_hidden: abilityObj?.is_hidden ?? null,
        slot: abilityObj?.slot ?? null,
      }));

      return {
        id: doc.id,
        name: doc.name,
        types: doc.types,
        description: doc.description || "no description available",
        generation: generation,
        stats: doc.stats,
        abilities: abilities,
        height: doc.height,
        weight: doc.weight,
        evolutions: doc.evolutions,
        color: doc.color
      }
    });

    return {
      props: {
        pokemons,
      },
    }

  } catch (e) {
    console.error(e);
    return {
      props: {
        pokemons: [],
      }
    }
  }
};
