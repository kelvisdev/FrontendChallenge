import { TournamentPhaseEnum } from '../enums/tournament-phase.enum';
import { Match } from './match.model';

export interface Phase {
  phaseType: TournamentPhaseEnum;
  matches: Array<Match>;
}
