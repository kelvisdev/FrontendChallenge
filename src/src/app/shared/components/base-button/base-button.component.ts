import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.scss']
})
export class BaseButtonComponent implements OnInit {

  @Input()
  label?: string;

  @Input()
  typeButton: 'submit' | 'button' = 'button';

  @Input()
  disabled: boolean = false;

  @Output()
  clickButton = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  handleClickButton() {
    if (this.typeButton === 'button') {
      this.clickButton.emit();
    }
  }
}
