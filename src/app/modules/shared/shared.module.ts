import {NgModule} from '@angular/core';
import {HoverDirective} from '../../directives/hover.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    HoverDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HoverDirective
  ]
})
export class SharedModule {

}
