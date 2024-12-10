import PokemonInfoCard from '@/components/PokemonInfoCard/PokemonInfoCard';
import PokemonList from "@/components/PokemonList/PokemonList";
import {useState} from 'react';
import Header from '@/components/header/header';
import { Pokemon } from '@/types/pokemon';
import clientPromise from '@/utils/mongodb';
import { GetStaticProps } from 'next';

interface HomeProps {
  pokemons: Pokemon[];
}

export default function Home({pokemons}: HomeProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  
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
          <PokemonList pokemons={pokemons} onHover={setSelectedPokemon} generation="IV" />
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

    const pokemons: Pokemon[] = pokemonsData.map((doc) => ({
      id: doc.id,
      name: doc.name,
      types: ["Fire"],
      description: "a",
      generation: 1,
      stats: doc.stats,
      abilites: [],
      height: doc.height,
      weight: doc.weight,
    }));

    console.log("hiiii");
    console.log(pokemons);

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
