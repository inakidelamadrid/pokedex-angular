import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Pokemon } from '../../models/pokemon.interface';

export interface PokemonState extends EntityState<Pokemon> {
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPokemons: number;
  pageSize: number;
}

export const pokemonAdapter = createEntityAdapter<Pokemon>({
  selectId: (pokemon: Pokemon) => pokemon.id,
});

export const initialState: PokemonState = pokemonAdapter.getInitialState({
  loading: false,
  error: null,
  currentPage: 1,
  totalPokemons: 0,
  pageSize: 20,
});
