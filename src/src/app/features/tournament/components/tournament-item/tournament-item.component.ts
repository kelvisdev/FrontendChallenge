import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../../../shared/models/team.model';

@Component({
  selector: 'app-tournament-item',
  templateUrl: './tournament-item.component.html',
  styleUrls: ['./tournament-item.component.scss']
})
export class TournamentItemComponent {

  @Input()
  team?: Team;

  @Input()
  matchWinnerId?: number

  @Output()
  selectFinalWinner = new EventEmitter<number>();

  get isWinner(): boolean {
    return !!this.matchWinnerId && this.team?.id === this.matchWinnerId;
  }

  handleSelectFinalWinner(id?: number): void {
    this.selectFinalWinner.emit(id);
  }
}
