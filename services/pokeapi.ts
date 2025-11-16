
import { Pokemon, PokemonType } from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon with ID: ${id}`);
  }
  return response.json();
};

export const getPokemonInRange = async (startId: number, endId: number): Promise<Pokemon[]> => {
  const promises: Promise<Pokemon>[] = [];
  for (let i = startId; i <= endId; i++) {
    promises.push(getPokemonById(i));
  }
  return Promise.all(promises);
};

export const getAllPokemonTypes = async (): Promise<PokemonType[]> => {
    const response = await fetch(`${API_BASE_URL}/type`);
    if(!response.ok) {
        throw new Error('Failed to fetch Pokémon types');
    }
    const data = await response.json();
    return data.results;
};
