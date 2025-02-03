import { createReducer, on } from '@ngrx/store';
import { PokemonActions } from './pokemon.actions';
import { pokemonAdapter, initialState } from './pokemon.state';

export const pokemonReducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemons, (state, { page }) => ({
    ...state,
    loading: true,
    currentPage: page,
  })),

  on(PokemonActions.loadPokemonsSuccess, (state, { pokemons, total }) =>
    pokemonAdapter.setAll(pokemons, {
      ...state,
      loading: false,
      error: null,
      totalPokemons: total,
    })
  ),
  
  on(PokemonActions.loadPokemonsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
