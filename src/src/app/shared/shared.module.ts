import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonComponent } from './components/base-button/base-button.component';
import { PageTitleComponent } from './components/page-title/page-title.component';

@NgModule({
  declarations: [
    BaseButtonComponent,
    PageTitleComponent,
  ],
  exports: [
    BaseButtonComponent,
    PageTitleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
