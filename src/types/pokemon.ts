export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  generation: number;
  description: string;
  weight: string,
  height: string,
  // add more info
}

export enum PokemonType {
  Electric = "Electric",
  Water = "Water",
  Fire = "Fire",
  Grass = "Grass",
  Poison = "Poison"
}
