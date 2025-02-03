import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  pokemons: Pokemon[] = [];
  currentPage = 1;
  totalPokemons = 0;
  pageSize = 20;

  get totalPages(): number {
    return Math.ceil(this.totalPokemons / this.pageSize);
  }
  
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService
      .getPokemonList(this.currentPage, this.pageSize)
      .subscribe(({ pokemons, total }) => {
        this.pokemons = pokemons;
        this.totalPokemons = total;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPokemons();
  }
}
