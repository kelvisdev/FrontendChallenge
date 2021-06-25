import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../../shared/models/team.model';
import { spliceArray } from '../../../shared/utils/array-utils';
import { TournamentPhaseEnum } from '../../../shared/enums/tournament-phase.enum';
import { Match } from '../../../shared/models/match.model';
import { Phase } from '../../../shared/models/phase.model';
import { Tournament } from '../../../shared/models/tournament.model';
import { TournamentDataService } from '../../../shared/services/tournament.data.service';
import { Router } from '@angular/router';
import { TournamentMock } from '../../../shared/mocks/tournament.mock';
import phasesDefault = TournamentMock.phasesDefault;

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teamsListItems: Array<Team> = [];
  formAddTeam: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.setupForm();
    this.loadTeams();
  }

  private setupForm(): void {
    this.formAddTeam = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  private loadTeams(): void {
    this.tournamentService.getTeams().subscribe(teams => this.teamsListItems = teams || []);
  }

  private getLastIdList(teamsListItems: Array<Team>): number {
    const ids = teamsListItems?.map(t => t?.id);
    let id;

    if (ids?.length) {
      // @ts-ignore
      id = Math.max(...ids) + 1
    } else {
      id = 1;
    }

    return id;
  }

  handleSubmit(): void {
    if (!this.formAddTeam?.get('name')?.value) {
      return;
    }

    const id = this.getLastIdList(this.teamsListItems);

    this.teamsListItems.push({
      name: this.formAddTeam?.get('name')?.value,
      id
    });

    this.formAddTeam?.controls.name.setValue('');
    this.tournamentService.setTeams(this.teamsListItems);
  }

  handleClickStartTournament(): void {
    const teams = this.teamsListItems || [];

    const grupoDePartidas = spliceArray(teams, 2);

    const listMatches: Array<Match> = [];

    grupoDePartidas.forEach(p => {
      listMatches.push({
        teams: [...p],
        matchWinnerId: 0,
      })
    });

    const listPhases: Array<Phase> = [
      {
        phaseType: TournamentPhaseEnum.QUARTER_FINALS,
        matches: [...listMatches]
      }, ...phasesDefault
    ]

    const tournament: Tournament = {
      listPhases
    }

    this.tournamentService.setTournament(tournament);
    this.router.navigate(['/tournament']);
  }

  handleClickResetListTeams(): void {
    this.teamsListItems = [];
    this.tournamentService.removeListTeams();
    window.scroll(0, 0);
  }

  get validLimit(): boolean {
    return this.teamsListItems.length == 8;
  }
}
