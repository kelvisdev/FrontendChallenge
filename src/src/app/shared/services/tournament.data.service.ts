import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { Tournament } from '../models/tournament.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentDataService {
  keyStorage = "@tournament:team";

  constructor() { }

  setTeams(teams: Array<Team>) {
    localStorage.setItem(this.keyStorage, JSON.stringify({
      teams: teams,
      tournament: this.getTournamentStore()
    }));
  }

  setTournament(tournament: Tournament) {
    localStorage.setItem(this.keyStorage, JSON.stringify({
      teams: this.getTeamsStore(),
      tournament: tournament
    }));
  }

  getTournament(): Observable<Tournament | undefined> {
    const tournament = this.getTournamentStore();

    return of(tournament);
  }

  getTeams(): Observable<Array<Team> | undefined>{
    const teams = this.getTeamsStore();

    return of(teams);
  }

  removeListTeams() {
    localStorage.removeItem(this.keyStorage);
  }

  getTournamentStore() {
    const data = localStorage.getItem(this.keyStorage) ? localStorage.getItem(this.keyStorage) : '';

    if (data) {
      const { tournament } = JSON.parse(data);

      return tournament;
    }

    return {} as Tournament;
  }

  getTeamsStore() {
    const data = localStorage.getItem(this.keyStorage) ? localStorage.getItem(this.keyStorage) : '';
    let teamsList: Array<Team> = [];

    if (data) {
      const { teams } = JSON.parse(data);
      teams.map((t: Team) => teamsList.push({
          id: t.id,
          name: t.name
        })
      );
    }

    return teamsList;
  }
}
