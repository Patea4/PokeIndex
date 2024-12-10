'use client';

import '@/app/globals.css'
import PokemonInfoCard from '@/components/PokemonInfoCard/PokemonInfoCard';
import PokemonList from "@/components/PokemonList/PokemonList";
import { PokemonType } from '@/types/pokemon';
import {useState} from 'react';

export default function Home() {

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const mockPokemons = [
  {
    id: 1,
    name: 'Pikachu',
    image: '/images/pikachu.png', // Ensure this image exists in public/images/
    types: [PokemonType.Electric],
    description: 'Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.',
    generation: 1,
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90,
    },
    abilities: ['Static', 'Lightning Rod'],
    height: '0.4 m',
    weight: '6.0 kg',
  },
  {
    id: 2,
    name: 'Bulbasaur',
    image: '/images/bulbasaur.png', // Ensure this image exists in public/images/
    types: [PokemonType.Grass, PokemonType.Poison],
    description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
    generation: 1,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
    abilities: ['Overgrow', 'Chlorophyll'],
    height: '0.7 m',
    weight: '6.9 kg',
  }];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-[400px] p-4 bg-[#343A40]">
        {selectedPokemon ? (
          <PokemonInfoCard pokemon={selectedPokemon} />
        ) : (
          <p className="text-center mt-10">Hover over a pokemon </p>
        )}
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <PokemonList pokemons={mockPokemons} onHover={setSelectedPokemon} generation={4} />     
      </div>
    </div>
  );
}
