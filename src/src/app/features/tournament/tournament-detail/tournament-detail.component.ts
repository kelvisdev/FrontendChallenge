import { Component, OnInit } from '@angular/core';
import { spliceArray } from '../../../shared/utils/array-utils';
import { TournamentPhaseEnum } from '../../../shared/enums/tournament-phase.enum';
import { Match } from '../../../shared/models/match.model';
import { Team } from '../../../shared/models/team.model';
import { Router } from '@angular/router';
import { TournamentDataService } from '../../../shared/services/tournament.data.service';
import { Tournament } from '../../../shared/models/tournament.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {
  teams!: Array<Team>;
  tournament!: Tournament;
  tournamentPhase = TournamentPhaseEnum;

  quarterFinalGames: Array<any> = [];
  semiFinalGames: Array<Match> = [];
  finalGame?: Match;

  winnerTeam?: Team;

  constructor(
    private router: Router,
    private tournamentService: TournamentDataService
  ) {
  }

  ngOnInit(): void {
    this.loadTournament();
  }

  private loadTournament(): void {
    let teams = this.tournamentService.getTeams();
    let tournament = this.tournamentService.getTournament();

    forkJoin([teams,tournament]).subscribe(results => {
      const [teams, tournament] = results;
      this.setTeamsData(teams || []);
      this.setTournamentData(tournament || {} as Tournament);
    });
  }

  private setTeamsData(listTeams: Array<Team>): void {
    this.teams = listTeams;
  }

  private setTournamentData(tournament: Tournament): void {
    this.tournament = tournament;

    if (this.tournament && this.tournament.listPhases) {
      this.quarterFinalGames = this.loadQuarterFinalGames(TournamentPhaseEnum.QUARTER_FINALS);
      this.semiFinalGames = this.loadSemiFinalGames(TournamentPhaseEnum.SEMIFINALS);
      this.finalGame = this.loadFinalGames(TournamentPhaseEnum.FINAL);
    }
  }

  private loadQuarterFinalGames(tournamentPhase: TournamentPhaseEnum): Array<any> {
    const phase = this.tournament.listPhases.find(f => f?.phaseType === tournamentPhase);
    let group;

    if (phase) {
      const qtdeGrupo = phase?.matches.length / 2;
      group = spliceArray(phase.matches, qtdeGrupo);
    }

    return group as any || [];
  }

  private loadSemiFinalGames(tournamentPhase: TournamentPhaseEnum): Array<Match> {
    const phase = this.tournament.listPhases.find(f => f.phaseType === tournamentPhase);
    return phase ? phase.matches : [];
  }

  private loadFinalGames(tournamentPhase: TournamentPhaseEnum): Match | undefined {
    const phase = this.tournament.listPhases.find(f => f.phaseType === tournamentPhase);
    return phase ? phase.matches[0] : {} as Match;
  }

  gamesByPhase(tournamentPhaseEnum: TournamentPhaseEnum): any {
    switch (tournamentPhaseEnum) {
      case TournamentPhaseEnum.QUARTER_FINALS:
        return this.quarterFinalGames;
      case TournamentPhaseEnum.SEMIFINALS:
        return this.semiFinalGames;
      case TournamentPhaseEnum.FINAL:
        return this.finalGame;
      default:
        return [];
    }
  }

  handleSelectChampion(id?: number): void {
    if (!id || this.finalGame?.matchWinnerId || this.finalGame?.teams.some(t => !t.id)) {
      return;
    }

    if (this.finalGame) {
      this.finalGame.matchWinnerId = id;
      this.winnerTeam = this.finalGame.teams.find(t => t.id === id);
      window.scroll(0, 0);
    }
  }

  handleSelectWinnerSemiFinal(id?: number, indexMatch?: any): void {
    let hasWinner = this.semiFinalGames[indexMatch].matchWinnerId || this.semiFinalGames[indexMatch].teams.some(t => !t.id);

    if (hasWinner) {
      return;
    }

    const pairIndex = this.semiFinalGames.findIndex((a, i) => i === indexMatch);
    this.semiFinalGames[pairIndex].matchWinnerId = id;

    const team = this.teams.find((t: Team) => t.id === id);

    if (this.finalGame) {
      const jogoIndex = this.finalGame.teams.findIndex((t, i) => indexMatch === i);
      this.finalGame.teams[jogoIndex].id = team?.id;
      this.finalGame.teams[jogoIndex].name = team?.name;
    }

    this.finalGame = this.loadFinalGames(TournamentPhaseEnum.FINAL);
  }

  handleSelectWinnerOfQuarterFinal(id: number, indexPartida?: any, indexGrupo?: any): void {
    let vencedores = this.quarterFinalGames.map((a, i) => {
      if (i === indexGrupo) {
        return (a[indexPartida] as any).matchWinnerId;
      }
    });

    const hasVencedor = vencedores.some(v => v > 0);

    if (hasVencedor) {
      return;
    }

    this.quarterFinalGames.forEach((a, i) => {
      if (i === indexGrupo) {
        (a[indexPartida] as any).matchWinnerId = id
      }
    });

    const teamOrigem = this.teams.find((t: Team) => t.id === id);
    this.semiFinalGames.forEach((a, i) => {
      if (i === indexGrupo) {
        const c = a.teams.findIndex((t, i) => indexPartida === i);
        a.teams[c].id = teamOrigem?.id;
        a.teams[c].name = teamOrigem?.name;
      }
    })

    this.semiFinalGames = this.loadSemiFinalGames(TournamentPhaseEnum.SEMIFINALS);
  }

  handleClickButton(): void {
    this.router.navigate(['/']);
  }

  get tournamentTitle(): string {
    return this.winnerTeam ? `Campeão desse torneio foi: ${this.winnerTeam.name}` : 'Torneio'
  }
}
