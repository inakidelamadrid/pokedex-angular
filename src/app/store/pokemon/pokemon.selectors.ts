import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState, pokemonAdapter } from './pokemon.state';

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

const { selectAll, selectTotal } = pokemonAdapter.getSelectors();

export const selectAllPokemons = createSelector(selectPokemonState, selectAll);
export const selectPokemonLoading = createSelector(
  selectPokemonState,
  (state) => state.loading
);
export const selectPokemonError = createSelector(
  selectPokemonState,
  (state) => state.error
);
export const selectCurrentPage = createSelector(
  selectPokemonState,
  (state) => state.currentPage
);
export const selectTotalPokemons = createSelector(
  selectPokemonState,
  (state) => state.totalPokemons
);
export const selectPageSize = createSelector(
  selectPokemonState,
  (state) => state.pageSize
);