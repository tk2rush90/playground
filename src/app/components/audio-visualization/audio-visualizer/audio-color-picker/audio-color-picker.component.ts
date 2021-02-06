import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SubscriptionService} from '@playground/services/common/subscription.service';
import {AbstractAnimationScene, AnimationService} from '@playground/services/animation/animation.service';
import {easeOutSine} from '@playground/utils/animation.util';
import {combineLatest} from 'rxjs';

export interface AudioColorOptions {
  color: keyof typeof AudioColorValues;
  index: number;
}

export enum AudioColorValues {
  purple = '#7D3C7D',
  blue = '#3574DF',
  red = '#FF3E3E',
  orange = '#FF8811',
  green = '#558740',
}

export enum AudioColorState {
  expanding = 'expanding',
  collapsing = 'collapsing',
  expanded = 'expanded',
  collapsed = 'collapsed',
}

export class AudioColor extends AbstractAnimationScene {
  // emit when animation started
  startAnimation: EventEmitter<void> = new EventEmitter<void>();
  // audio color animating state
  private _state: AudioColorState = AudioColorState.collapsed;
  // color value
  private _color: keyof typeof AudioColorValues;
  // color index
  private _index = 0;
  // animating properties
  private _y = 0;
  private _startY = 0;
  private _targetY = 0;
  private _changingY = 0;
  private _duration = 20;
  // timeout timer
  private _timer: any;
  // timeout delay
  private _delay = 100;
  // element size and gap
  private readonly _size = 35;
  private readonly _gap = 5;

  constructor(options: AudioColorOptions) {
    super();

    this._color = options.color;
    this._index = options.index;
  }

  /**
   * return the color name
   */
  get color(): keyof typeof AudioColorValues {
    return this._color;
  }

  /**
   * return the background color value
   */
  get backgroundColor(): string {
    return AudioColorValues[this._color];
  }

  /**
   * return the transform value
   */
  get transform(): string {
    return `translate(0, ${this._y}px)`;
  }

  /**
   * return the zIndex
   */
  get zIndex(): number {
    return 10 - this._index;
  }

  /**
   * return the hidden state
   * hide the object when collapsed and not the first element
   */
  get hidden(): boolean {
    return this.collapsed && this._index !== 0;
  }

  /**
   * override animate method
   * @param frame frame
   */
  animate(frame: number): void {
    super.animate(frame);
    this._animating();
  }

  /**
   * expand by index
   * @param index index
   */
  expand(index: number): void {
    this._index = index;
    this._setTarget(this._index * (this._size + this._gap));
    this._state = AudioColorState.expanding;
    this._start = 0;
    this.startAnimation.emit();
  }

  /**
   * collapse all colors to 0
   * @param index index
   */
  collapse(index: number): void {
    this._index = index;
    this._setTarget(0);
    this._state = AudioColorState.collapsing;
    this._start = 0;
    this.startAnimation.emit();
  }

  /**
   * set index
   * @param index index
   */
  set index(index: number) {
    this._index = index;
  }

  /**
   * return `true` when state is expanded
   */
  get expanded(): boolean {
    return this._state === AudioColorState.expanded;
  }

  /**
   * return `true` when state is collapsed
   */
  get collapsed(): boolean {
    return this._state === AudioColorState.collapsed;
  }

  /**
   * set target value
   * @param target target
   */
  private _setTarget(target: number): void {
    this._targetY = target;
    this._startY = this._y;
    this._changingY = this._targetY - this._startY;
  }

  /**
   * animating the color
   */
  private _animating(): void {
    if (this.time > this._duration) {
      this._setEndingState();
      this.onDestroy.emit();
    } else {
      this._y = easeOutSine(Math.min(this.time, this._duration), this._startY, this._changingY, this._duration);
    }
  }

  /**
   * set ending state after animating
   */
  private _setEndingState(): void {
    this.clearTimeout();

    this._timer = setTimeout(() => {
      switch (this._state) {
        case AudioColorState.expanding: {
          this._state = AudioColorState.expanded;
          break;
        }

        case AudioColorState.collapsing: {
          this._state = AudioColorState.collapsed;
          break;
        }
      }
    }, this._delay);
  }

  /**
   * clear timeout timer
   */
  clearTimeout(): void {
    clearTimeout(this._timer);
  }
}

@Component({
  selector: 'app-audio-color-picker',
  templateUrl: './audio-color-picker.component.html',
  styleUrls: ['./audio-color-picker.component.scss'],
  providers: [
    AnimationService,
    SubscriptionService,
  ]
})
export class AudioColorPickerComponent implements OnInit, AfterViewInit, OnDestroy {
  // colors
  @Input() set color(color: keyof typeof AudioColorValues) {
    this._color = color;
    this._setColorPositions();

    if (this.canCollapse) {
      this._collapseAllColors();
    } else {
      this._updateIndices();
    }
  }
  // emit when color changed
  @Output() colorChange: EventEmitter<keyof typeof AudioColorValues> = new EventEmitter<keyof typeof AudioColorValues>();
  // opened state
  opened = false;
  // color items
  colors: AudioColor[] = [
    new AudioColor({ color: 'purple', index: 0 }),
    new AudioColor({ color: 'blue', index: 1 }),
    new AudioColor({ color: 'red', index: 2 }),
    new AudioColor({ color: 'orange', index: 3 }),
    new AudioColor({ color: 'green', index: 4 }),
  ];
  // color values
  private _colors: (keyof typeof AudioColorValues)[] = [
    'purple',
    'blue',
    'red',
    'orange',
    'green',
  ];
  // color
  private _color: keyof typeof AudioColorValues = 'purple';

  constructor(
    private animationService: AnimationService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeColorItems();
  }

  ngAfterViewInit(): void {
    this._setColorPositions();
  }

  ngOnDestroy(): void {
    this._clearAllTimeouts();
  }

  /**
   * subscribe color items
   */
  private _subscribeColorItems(): void {
    const subs = this.colors.map(color => {
      return color.startAnimation
        .subscribe(() => {
          this.animationService.addScene(color);
        });
    });

    this.subscriptionService.store('_subscribeColorItems', subs);
  }

  /**
   * set color positions with selected color
   * @param color selected color
   */
  private _setColorPositions(color = this._color): void {
    const index = this._colors.indexOf(color);

    if (index !== -1) {
      this._colors.splice(index, 1);
      this._colors.unshift(color);
    }
  }

  /**
   * handle color clicked
   * @param color color object
   */
  onColorClicked(color: AudioColor): void {
    if (color.collapsed) {
      this._expandAllColors();
    } else if (color.expanded) {
      if (this._color === color.color) {
        this._collapseAllColors();
      } else {
        this.colorChange.emit(color.color);
      }
    }
  }

  /**
   * expand all colors
   */
  private _expandAllColors(): void {
    this.colors.forEach(item => {
      const index = this._colors.indexOf(item.color);

      item.expand(index);
    });

    this._subscribeAnimationFinished();
    this.animationService.startAnimation();
  }

  /**
   * collapse all colors
   */
  private _collapseAllColors(): void {
    this.colors.forEach(item => {
      const index = this._colors.indexOf(item.color);

      item.collapse(index);
    });

    this._subscribeAnimationFinished();
    this.animationService.startAnimation();
  }

  /**
   * update indices of color
   */
  private _updateIndices(): void {
    this.colors.forEach(item => {
      item.index = this._colors.indexOf(item.color);
    });
  }

  /**
   * return true when collapsable
   */
  get canCollapse(): boolean {
    return this.colors.some(item => !item.collapsed);
  }

  /**
   * subscribe animation finished state
   */
  private _subscribeAnimationFinished(): void {
    const sub = combineLatest(this.colors.map(item => item.onDestroy))
      .subscribe(() => {
        this.subscriptionService.unSubscribe('_subscribeAnimationFinished');
        this.animationService.stopAnimation();
      });

    this.subscriptionService.store('_subscribeAnimationFinished', sub);
  }

  /**
   * clear all timeouts
   */
  private _clearAllTimeouts(): void {
    this.colors.forEach(color => {
      color.clearTimeout();
    });
  }
}
