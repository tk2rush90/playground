import {Directive, HostBinding, Input} from '@angular/core';

export type StrokeButtonColor = 'grey' | 'white-transparent';

@Directive({
  selector: '[appStrokeButton]'
})
export class StrokeButtonDirective {
  // set the color scheme for stroke button
  @Input() @HostBinding('attr.tk-color') color: StrokeButtonColor = 'grey';
  // bind base class to stroke button
  @HostBinding('class.tk-stroke-button') baseClass = true;

  constructor() { }

}
