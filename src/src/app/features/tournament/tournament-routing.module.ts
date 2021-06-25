import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TournamentComponent,
    children: [
      {
        path: '',
        redirectTo: 'detail',
        pathMatch: 'full'
      },
      {
        path: 'detail',
        component: TournamentDetailComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
