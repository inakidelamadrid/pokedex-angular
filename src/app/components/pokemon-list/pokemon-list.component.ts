import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';

import {
  selectAllPokemons,
  selectPokemonLoading,
  selectCurrentPage,
  selectTotalPokemons,
  selectPageSize
} from '../../store/pokemon/pokemon.selectors';
import { PokemonActions } from '../../store/pokemon/pokemon.actions';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit, OnDestroy{

  pokemons$: Observable<Pokemon[]>;
  loading$: Observable<boolean>;
  currentPage$: Observable<number>;
  totalPokemons$: Observable<number>;
  pageSize$: Observable<number>;

  currentPage = 1;
  totalPages = 1;
  
  private destroy$ = new Subject<void>();
  
  constructor(private store: Store) {
    this.pokemons$ = this.store.select(selectAllPokemons);
    this.loading$ = this.store.select(selectPokemonLoading);
    this.totalPokemons$ = this.store.select(selectTotalPokemons);
    this.pageSize$ = this.store.select(selectPageSize);
    
    this.currentPage$ = this.store.select(selectCurrentPage).pipe(
      takeUntil(this.destroy$)
    );

    // Subscribe to get current values for pagination
    this.currentPage$.subscribe(page => this.currentPage = page);
    combineLatest([this.totalPokemons$, this.pageSize$]).subscribe(
      ([total, pageSize]) => this.totalPages = Math.ceil(total / pageSize)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadPokemons(1);
  }

  loadPokemons(page: number): void {
    this.store.dispatch(PokemonActions.loadPokemons({ page, limit: 20 }));
  }

  onPageChange(page: number): void {
    this.loadPokemons(page);
  }
}
