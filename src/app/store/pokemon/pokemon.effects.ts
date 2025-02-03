import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { PokemonActions } from './pokemon.actions';
import { PokemonService } from '../../services/pokemon.service';

@Injectable()
export class PokemonEffects {
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      switchMap(({ page, limit }) =>
        this.pokemonService.getPokemonList(page, limit).pipe(
          map(({ pokemons, total }) =>
            PokemonActions.loadPokemonsSuccess({ pokemons, total })
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}
}