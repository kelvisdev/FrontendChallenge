import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-team-new',
  templateUrl: './team-new.component.html',
  styleUrls: ['./team-new.component.scss']
})
export class TeamNewComponent {

  @Input()
  formAddTeam?: FormGroup;

  @Input()
  sizeListTeams = 0;

  @Output()
  submitTeam = new EventEmitter<void>();

  title = 'Add Time';

  get maxLimit(): boolean {
    return this.sizeListTeams == 8;
  }

  handleSubmit(): void {
    this.submitTeam.emit();
  }
}
