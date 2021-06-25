import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { TournamentItemComponent } from './components/tournament-item/tournament-item.component';
import { SharedModule } from '../../shared/shared.module';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';


@NgModule({
  declarations: [
    TournamentComponent,
    TournamentItemComponent,
    TournamentDetailComponent,
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    SharedModule
  ]
})
export class TournamentModule { }
