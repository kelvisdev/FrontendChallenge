import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teams',
    pathMatch: 'full'
  },
  {
    path: 'teams',
    loadChildren: () => import('./features/team/team.module').then(m => m.TeamModule)
  },
  {
    path: 'tournament',
    loadChildren: () => import('./features/tournament/tournament.module').then(m => m.TournamentModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
