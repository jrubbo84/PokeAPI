
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Pokemon, PokemonType, SortBy, SortOrder } from './types';
import { getPokemonInRange, getAllPokemonTypes } from './services/pokeapi';
import PokemonCard from './components/PokemonCard';
import FilterSortControls from './components/FilterSortControls';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [startId, setStartId] = useState<string>('1');
  const [endId, setEndId] = useState<string>('20');
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allTypes, setAllTypes] = useState<PokemonType[]>([]);

  // Filter and Sort State
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.ID);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const fetchTypes = useCallback(async () => {
    try {
      const types = await getAllPokemonTypes();
      setAllTypes(types);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar os tipos de Pokémon.');
    }
  }, []);
  
  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const handleFetchPokemon = async () => {
    setError(null);
    const start = parseInt(startId, 10);
    const end = parseInt(endId, 10);

    if (isNaN(start) || isNaN(end) || start <= 0 || end <= 0 || start > end) {
      setError('Por favor, insira um intervalo de IDs válido.');
      return;
    }
    if (end - start + 1 > 151) {
        setError('O intervalo não pode ser maior que 151 Pokémon por vez.');
        return;
    }

    setLoading(true);
    try {
      const pokemonData = await getPokemonInRange(start, end);
      setAllPokemon(pokemonData);
    } catch (err) {
      setError('Ocorreu um erro ao buscar os Pokémon. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredAndSortedPokemon = useMemo(() => {
    return [...allPokemon]
      .filter(pokemon => {
        if (selectedTypes.length === 0) return true;
        const pokemonTypes = pokemon.types.map(t => t.type.name);
        return selectedTypes.every(st => pokemonTypes.includes(st));
      })
      .sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        
        if (aVal < bVal) return sortOrder === SortOrder.ASC ? -1 : 1;
        if (aVal > bVal) return sortOrder === SortOrder.ASC ? 1 : -1;
        return 0;
      });
  }, [allPokemon, sortBy, sortOrder, selectedTypes]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
            <img src="https://assets-global.website-files.com/5f8ddf5595951e0d6e107ed3/62c5b5502c9842526e792cce_pipefy-logo.svg" alt="Pipefy Logo" className="h-8" />
            <span className="text-xl font-bold text-slate-700">+</span>
            <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeAPI Logo" className="h-8"/>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">Briefing Inicial</h1>
          <p className="text-slate-600">
            Neste teste, você usará o Pipefy e a <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-semibold">PokéAPI</a> para criar uma solução. O objetivo é construir um processo (fluxo) em que o usuário possa inserir dois IDs da Pokédex e obter todos os Pokémon dentro desse intervalo.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-8">
             <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">Funcionalidades</h2>
             <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Permitir que o usuário ordene os Pokémon obtidos com base em um dos seguintes critérios: Peso, Altura ou Experiência Base;</li>
                <li>Fornecer uma opção para selecionar a ordem de classificação: crescente ou decrescente;</li>
                <li>Permitir que o usuário filtre os Pokémon por tipo, suportando a seleção de um ou vários tipos.</li>
             </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={startId}
                        onChange={(e) => setStartId(e.target.value)}
                        placeholder="ID Inicial"
                        className="w-24 p-2 border border-slate-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                    />
                    <span className="text-slate-500 font-semibold">-</span>
                    <input
                        type="number"
                        value={endId}
                        onChange={(e) => setEndId(e.target.value)}
                        placeholder="ID Final"
                        className="w-24 p-2 border border-slate-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                    />
                </div>
                <button
                    onClick={handleFetchPokemon}
                    disabled={loading}
                    className="w-full md:w-auto bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? 'Buscando...' : 'Buscar Pokémon'}
                </button>
            </div>
             {error && <p className="text-red-500 mt-4 text-sm font-semibold">{error}</p>}
        </div>

        {allPokemon.length > 0 && (
            <FilterSortControls
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                allTypes={allTypes}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
            />
        )}
        
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredAndSortedPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
         {allPokemon.length > 0 && filteredAndSortedPokemon.length === 0 && !loading && (
            <div className="text-center py-10 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold text-slate-700">Nenhum Pokémon encontrado</h3>
                <p className="text-slate-500 mt-2">Tente ajustar seus filtros de tipo.</p>
            </div>
         )}
      </main>
    </div>
  );
};

export default App;
