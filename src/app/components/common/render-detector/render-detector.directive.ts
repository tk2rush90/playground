import {AfterViewInit, Directive, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[appRenderDetector]'
})
export class RenderDetectorDirective implements AfterViewInit {
  // emit after view init
  @Output() rendered: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngAfterViewInit(): void {
    this.rendered.emit();
  }
}
