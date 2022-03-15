import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";


export const getPokemonInfo = async (idOrName: string) => {

  const { data: { id, name, sprites } } = await pokeApi.get<Pokemon>(`/pokemon/${idOrName}`);

  return {
    id,
    name,
    sprites
  }
}