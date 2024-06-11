import { useState } from "react";
import "./App.css";
import Pagination from "./Pagination";
import SearchPokemon from "./SearchPokemon";
import { useListPokemon } from "./hook/useListPokemon";
import { usePokemonDetail } from "./hook/usePokemonDetail";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const {
    total,
    loading,
    limit,
    offset,
    filteredList,
    setOffset,
    handlePrevious,
    handleNext,
  } = useListPokemon(100, searchValue);

  const { pokemonDetail, loadingPokeDetail, getPokemonDetail } =
    usePokemonDetail();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-screen">
          <div className={`flex w-100 h-[calc(100vh-100px)] p-10`}>
            <div className="w-1/2 ">
              <SearchPokemon
                value={searchValue}
                onChange={handleSearchChange}
              />
              <div
                className={`flex flex-col items-center w-full h-full overflow-auto`}
              >
                {filteredList.map((pokemon) => (
                  <button
                    onClick={() => getPokemonDetail(pokemon.url)}
                    className="btn mb-1 w-[200px]"
                    key={pokemon.name}
                  >
                    {pokemon.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-1/2 h-full">
              {!!pokemonDetail && !loadingPokeDetail ? (
                <div className=" bg-gray-100 min-h-full py-6 flex flex-col justify-center sm:py-12">
                  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                      <div className="max-w-md mx-auto">
                        <div className="flex justify-center">
                          <div className="rounded-full bg-gray-200 h-32 w-32 flex items-center justify-center">
                            <img
                              src={pokemonDetail?.sprites.front_default}
                              alt="Pokemon Image"
                              className="h-32 w-32 rounded-full"
                            />
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <h1 className="text-xl font-bold text-gray-900">
                            {pokemonDetail?.name}
                          </h1>
                          <p className="mt-2 text-gray-600">
                            ID: #{pokemonDetail?.id}
                          </p>
                        </div>
                        <div className="mt-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-600">Height:</p>
                              <p className="font-semibold text-black">
                                {pokemonDetail?.height}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Weight:</p>
                              <p className="font-semibold text-black">
                                {pokemonDetail?.weight}
                              </p>
                            </div>
                          </div>
                          <div className="mt-6">
                            <p className="text-gray-600">Abilities:</p>
                            <ul className="list-disc list-inside text-black">
                              {pokemonDetail?.abilities.map(
                                (ability, index) => (
                                  <li key={index}>
                                    {ability.ability.name}
                                    {ability.is_hidden ? " (Hidden)" : ""}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                          <div className="mt-6">
                            <p className="text-gray-600">Base Experience:</p>
                            <p className="font-semibold text-black">
                              {pokemonDetail?.base_experience}
                            </p>
                          </div>
                          <div className="mt-6">
                            <p className="text-gray-600">
                              Location Encounters:
                            </p>
                            <a
                              href={pokemonDetail?.location_area_encounters}
                              className="text-blue-500 hover:underline"
                            >
                              Encounters
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
          <Pagination
            total={total}
            limit={limit}
            offset={offset}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            setOffset={setOffset}
          />
        </div>
      )}
    </div>
  );
}

export default App;
