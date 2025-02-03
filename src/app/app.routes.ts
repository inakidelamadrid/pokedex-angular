import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
  {
    path: 'pokemon',
    loadComponent: () =>
      import('./components/pokemon-list/pokemon-list.component').then(
        (m) => m.PokemonListComponent
      ),
  },
];
