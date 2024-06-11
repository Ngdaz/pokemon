import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { PokemonDetail } from "../types";

export const usePokemonDetail = () => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(
    null,
  );
  const [loadingPokeDetail, setLoadingPokeDetail] = useState(true);

  const getPokemonDetail = async (url: string) => {
    setLoadingPokeDetail(true);
    setPokemonDetail(null);
    try {
      const res: AxiosResponse<PokemonDetail> = await axios.get(url);
      const parseRes = JSON.parse(JSON.stringify(res.data));
      setPokemonDetail(parseRes);
    } catch (error) {
      console.error("Error fetching Pokémon detail:", error);
    } finally {
      setLoadingPokeDetail(false);
    }
  };

  return { pokemonDetail, loadingPokeDetail, getPokemonDetail };
};
