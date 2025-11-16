
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonType {
  name: string;
  url: string;
}

export enum SortBy {
    ID = 'id',
    WEIGHT = 'weight',
    HEIGHT = 'height',
    BASE_EXPERIENCE = 'base_experience'
}

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}
