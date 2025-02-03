import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Pokemon, PokemonResponse } from '../models/pokemon.interface';

@Injectable({
    providedIn: 'root'
  })
  export class PokemonService {
    private readonly baseUrl = environment.apiUrl;
    private http = inject(HttpClient);

    getPokemonList(page: number = 1, limit: number = 20): Observable<{
        pokemons: Pokemon[];
        total: number;
      }> {
        const offset = (page - 1) * limit;
        return this.http
          .get<PokemonResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
          .pipe(
            switchMap(response => {
              const pokemonRequests = response.results.map(pokemon =>
                this.http.get<Pokemon>(pokemon.url)
              );
              return forkJoin(pokemonRequests).pipe(
                map(pokemons => ({
                  pokemons,
                  total: response.count
                }))
              );
            })
          );
      }
  }