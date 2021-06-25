import { Team } from './team.model';

export interface Match {
  matchWinnerId?: number;
  teams: Array<Team>;
}
