import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamNewComponent } from './components/team-new/team-new.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamComponent } from './team.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    TeamNewComponent,
    TeamListComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class TeamModule { }
