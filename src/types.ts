export interface Ability {
  name: string;
  url: string;
}

export interface AbilityDetail {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface Form {
  name: string;
  url: string;
}

export interface PokemonDetail {
  abilities: AbilityDetail[];
  base_experience: number;
  cries: Cries;
  forms: Form[];
  height: number;
  held_items: any[]; // You can define a type for held items if needed
  id: number;
  sprites: {
    front_default: string;
  };
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  weight: number;
}
