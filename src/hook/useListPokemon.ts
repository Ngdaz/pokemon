import axios, { AxiosResponse } from "axios";
import { useEffect, useState, useMemo } from "react";
import { Pokemon, PokemonListResponse } from "../types";

export const useListPokemon = (limit = 100, searchValue = "") => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchPokemon = async () => {
    try {
      const response: AxiosResponse<PokemonListResponse> = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      );
      setPokemonList(response.data.results);
      setTotal(response.data.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, [offset, limit]);

  const filteredList = useMemo(() => {
    if (searchValue === "") {
      return pokemonList; // No filtering if searchValue is empty
    }
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [pokemonList, searchValue]);

  const handlePrevious = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  const handleNext = () => {
    setOffset((prevOffset) => Math.min(prevOffset + limit, total - limit));
  };

  return {
    pokemonList,
    total,
    loading,
    handlePrevious,
    handleNext,
    limit,
    offset,
    setOffset,
    filteredList,
  };
};
