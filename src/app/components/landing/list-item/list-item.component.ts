import {Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {PlaygroundListItem} from '@playground/models/playground-list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  // playground item
  @Input() playground: PlaygroundListItem | undefined;

  /**
   * bind background color to component
   */
  @HostBinding('style.background-color') get backgroundColor(): string | undefined {
    return this.playground?.color;
  }
  // show fill box
  showFill = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('pointerenter')
  onHostPointerEnter(): void {
    this.showFill = true;
  }

  @HostListener('pointerleave')
  onHostPointerLeave(): void {
    this.showFill = false;
  }
}
