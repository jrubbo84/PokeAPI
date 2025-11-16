
import React from 'react';
import { PokemonType, SortBy, SortOrder } from '../types';

interface FilterSortControlsProps {
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
  allTypes: PokemonType[];
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

const FilterSortControls: React.FC<FilterSortControlsProps> = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  allTypes,
  selectedTypes,
  setSelectedTypes,
}) => {
  const handleTypeChange = (typeName: string) => {
    if (selectedTypes.includes(typeName)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== typeName));
    } else {
      setSelectedTypes([...selectedTypes, typeName]);
    }
  };

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sort Controls */}
        <div className="flex flex-col">
          <label htmlFor="sort-by" className="text-sm font-medium text-slate-600 mb-1">Ordenar por:</label>
          <div className="flex">
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="flex-grow bg-slate-100 border border-slate-300 rounded-l-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value={SortBy.ID}>ID</option>
              <option value={SortBy.WEIGHT}>Peso</option>
              <option value={SortBy.HEIGHT}>Altura</option>
              <option value={SortBy.BASE_EXPERIENCE}>Experiência Base</option>
            </select>
            <button
                onClick={() => setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC)}
                className="bg-slate-200 hover:bg-slate-300 p-2 border border-slate-300 border-l-0 rounded-r-md transition-colors"
                aria-label={sortOrder === SortOrder.ASC ? "Ordem Crescente" : "Ordem Decrescente"}
            >
                {sortOrder === SortOrder.ASC ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                )}
            </button>
          </div>
        </div>

        {/* Type Filter */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-600 mb-1 block">Filtrar por tipo:</label>
          <div className="flex flex-wrap gap-2">
            {allTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => handleTypeChange(type.name)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border-2 transition-all duration-200 ${
                  selectedTypes.includes(type.name)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
                }`}
              >
                {capitalize(type.name)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSortControls;
