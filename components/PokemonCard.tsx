
import React from 'react';
import { Pokemon } from '../types';
import { POKEMON_TYPE_COLORS } from '../constants';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center text-center">
      <div className="w-32 h-32 md:w-40 md:h-40 mb-4">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-sm font-semibold text-slate-500">#{pokemon.id.toString().padStart(3, '0')}</span>
      <h3 className="text-xl font-bold text-slate-800 mt-1">{capitalize(pokemon.name)}</h3>
      <div className="flex gap-2 mt-3">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className={`px-3 py-1 text-xs font-semibold rounded-full ${POKEMON_TYPE_COLORS[type.name] || 'bg-gray-200'}`}
          >
            {capitalize(type.name)}
          </span>
        ))}
      </div>
       <div className="w-full text-left mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="font-semibold text-slate-600">Altura:</div>
            <div>{pokemon.height / 10} m</div>
            <div className="font-semibold text-slate-600">Peso:</div>
            <div>{pokemon.weight / 10} kg</div>
            <div className="font-semibold text-slate-600">Exp. Base:</div>
            <div>{pokemon.base_experience}</div>
        </div>
    </div>
  );
};

export default PokemonCard;
