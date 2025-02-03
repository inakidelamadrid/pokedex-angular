import { createActionGroup, props } from "@ngrx/store";
import { Pokemon } from "../../models/pokemon.interface";

export const PokemonActions = createActionGroup({
    source: 'Pokemon',
    events: {
        'Load Pokemons': props<{ page: number; limit: number }>(),
        'Load Pokemons Success': props<{ pokemons: Pokemon[]; total: number }>(),
        'Load Pokemons Failure': props<{ error: string }>(),
    }
})