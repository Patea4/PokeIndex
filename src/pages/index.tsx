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
const generations = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
];

export default function Home({ pokemons }: HomeProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const getPokemonsByGeneration = (gen: string) => (
    pokemons.filter((pokemon) => pokemon.generation === gen)
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 pt-20">
        {/* Fixed Sidebar */}
        <div className="hidden lg:block fixed top-20 left-0 w-[400px] p-4 bg-[#343A40] h-full overflow-y-auto">
          {selectedPokemon ? (
            <PokemonInfoCard pokemon={selectedPokemon} />
          ) : (
            <p className="text-center mt-10 text-white">Hover over a Pokémon</p>
          )}
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full lg:ml-[400px] p-4 space-y-4 overflow-y-auto">
          {generations.map((generation) => {
            const pokemonInGen = getPokemonsByGeneration(generation);
            return (
              <PokemonList pokemons={pokemonInGen} onHover={setSelectedPokemon} generation={generation} key={generation} />
            );
          })}
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
          name: abilityObj.ability.name.replaceAll("-"," ") || 'Unknown Ability',
          url: abilityObj.ability.url || '',
        },
        is_hidden: abilityObj?.is_hidden ?? null,
        slot: abilityObj?.slot ?? null,
      }))

      console.log(abilities);

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
        evolutions: doc.evolutions
      }
    });

    const generationCounts: { [key: string]: number } = {};
    pokemons.forEach(pokemon => {
      generationCounts[pokemon.generation] = (generationCounts[pokemon.generation] || 0) + 1;
    });
    console.log('Pokémon Count per Generation:', generationCounts);

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

}
