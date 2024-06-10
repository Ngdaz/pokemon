import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";
import { PokemonDetail } from "./types";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response: AxiosResponse<PokemonListResponse> = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100",
        );
        setPokemonList(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemon();

    return () => {
      // Clean up if necessary
    };
  }, []); // Empty dependency

  const getPokemonDetail = async (url: string) => {
    try {
      const res: AxiosResponse<PokemonDetail> = await axios.get(url);
      const parseRes = JSON.parse(JSON.stringify(res.data));
      setPokemonDetail(parseRes);
    } catch (error) {}
  };

  console.log(pokemonDetail?.weight);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={`flex w-100`}>
          <div
            className={`flex flex-col items-center ${pokemonDetail ? "flex-1" : ""}`}
          >
            {pokemonList.map((pokemon) => (
              <button
                onClick={() => getPokemonDetail(pokemon.url)}
                className="btn mb-1 w-[200px]"
                key={pokemon.name}
              >
                {pokemon.name}
              </button>
            ))}
          </div>
          <div className="flex-1">
            {!!pokemonDetail && (
              <div className="bg-gray-100 min-h-screen py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                  <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                      <div className="flex justify-center">
                        <div className="rounded-full bg-gray-200 h-32 w-32 flex items-center justify-center">
                          <img
                            src={pokemonDetail.sprites.front_default}
                            alt="Pokemon Image"
                            className="h-32 w-32 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <h1 className="text-xl font-bold text-gray-900">
                          {pokemonDetail.name}
                        </h1>
                        <p className="mt-2 text-gray-600">
                          ID: #{pokemonDetail.id}
                        </p>
                      </div>
                      <div className="mt-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-600">Height:</p>
                            <p className="font-semibold text-black">
                              {pokemonDetail.height}
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
                            {pokemonDetail.abilities.map((ability, index) => (
                              <li key={index}>
                                {ability.ability.name}
                                {ability.is_hidden ? " (Hidden)" : ""}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-6">
                          <p className="text-gray-600">Base Experience:</p>
                          <p className="font-semibold text-black">
                            {pokemonDetail.base_experience}
                          </p>
                        </div>
                        <div className="mt-6">
                          <p className="text-gray-600">Location Encounters:</p>
                          <a
                            href={pokemonDetail.location_area_encounters}
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
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
