export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  generation: string;
  description: string;
  weight: string,
  height: string,
  abilities: Ability[],
  evolutions: string[],
  color: string,
  // add more info
}

export interface AbilityDetail {
  name: string;
  url: string;
}

export interface Ability {
  ability: AbilityDetail;
  is_hidden: boolean;
  slot: number;
}

export interface DbPokemon {
  id: number;
  name: string;
  types: string[];
  generation: string;
  description?: string;
  abilities?: Ability[];
  height: string;
  weight: string;
  evolutions: string[];
}

