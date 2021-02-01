import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Point} from '@playground/utils/type.util';
import {randomNumber, randomPick} from '@playground/utils/random.util';
import {getPointOnArc} from '@playground/utils/math.util';
import {getDistanceOfFingers, getWheelDirection, WheelDirection} from '@playground/utils/event.util';

export interface PerspectiveObjectOptions {
  // center of screen
  center: Point;
  // initial distance
  distance?: number;
}

export class PerspectiveObject {
  // object distance
  private _distance = 0;
  // screen center position
  private _center: Point;
  // object center position
  private _position!: Point;
  // circle radius
  // object will be positioned on random angle of arc of this circle
  private readonly _radius = 300;
  // angle of arc
  private readonly _angle!: number;
  // color for object
  private readonly _color: string = randomPick([
    '#8D0B0B',
    '#FF8811',
    '#FF3E3E',
    '#1ADBCE',
    '#C73FC7',
    '#3574DF',
    '#EEFF46',
  ]);

  constructor(options: PerspectiveObjectOptions) {
    this._center = options.center;
    this._distance = options.distance || 0;
    this._angle = randomNumber(0, 360);

    this._setBasePosition();
  }

  /**
   * set the base position for object
   */
  private _setBasePosition(): void {
    this._position = getPointOnArc(this._center, this._angle, this._radius);
  }

  /**
   * return the transform style
   */
  get transform(): string {
    return `translate3d(-50%, -50%, ${-700 + (80 * this._distance)}px)`;
  }

  /**
   * return the background color style
   */
  get backgroundColor(): string {
    return this._color;
  }

  /**
   * return the center `x` position
   */
  get x(): number {
    return this._position.x;
  }

  /**
   * return the center `y` position
   */
  get y(): number {
    return this._position.y;
  }

  /**
   * set `_distance` and `_zIndex`
   * @param distance distance
   */
  set distance(distance: number) {
    this._distance = distance;
  }

  /**
   * return the `_distance` of object
   */
  get distance(): number {
    return this._distance;
  }

  /**
   * resize the window
   * @param center center position
   */
  resize(center: Point): void {
    this._center = center;
    this._setBasePosition();
  }
}

@Component({
  selector: 'app-perspective-container',
  templateUrl: './perspective-container.component.html',
  styleUrls: ['./perspective-container.component.scss']
})
export class PerspectiveContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  // number of objects
  numberOfObjects = 100;
  // perspective objects
  objects: PerspectiveObject[] = [];
  // center point
  private _center: Point = {
    x: 0,
    y: 0,
  };
  // timers
  private _timers: any[] = [];
  // start distance
  private _startDistance = 0;
  // moved distance
  private _movedDistance = 0;
  // touch started state
  private _touchStarted = false;
  // set scroll speed
  private readonly _scrollSpeed = 4;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._setCenterPoint();
    this._createObjects();
    this._setInitialDistance();
  }

  ngOnDestroy(): void {
    this._clearAllTimers();
  }

  get host(): HTMLElement | undefined {
    return this.elementRef?.nativeElement;
  }

  /**
   * set center point of view
   */
  private _setCenterPoint(): void {
    if (this.host) {
      this._center.x = this.host.offsetWidth / 2;
      this._center.y = this.host.offsetHeight / 2;
    }
  }

  /**
   * create objects
   */
  private _createObjects(): void {
    for (let i = 0; i < this.numberOfObjects; i++) {
      const object = new PerspectiveObject({
        center: this._center,
        distance: this.numberOfObjects,
      });

      this.objects.push(object);
    }
  }

  /**
   * set initial distance for each object
   */
  private _setInitialDistance(): void {
    this._clearAllTimers();

    this._timers = this.objects.map((object, index) => {
      return setTimeout(() => {
        object.distance = (-index * 4) + this.numberOfObjects;
      });
    });
  }

  /**
   * clear all timers
   */
  private _clearAllTimers(): void {
    this._timers.forEach(timer => clearTimeout(timer));
  }

  @HostListener('wheel', ['$event'])
  onHostWheel(event: WheelEvent): void {
    if (this._canScroll(event.deltaY)) {
      this.objects.forEach(object => {
        // `deltaY` is working by `100px` and it's too big to control scrolling position with `z`
        // so divide the `deltaY` by 100 and multiple the `_scrollSpeed`
        object.distance += Math.ceil(event.deltaY / 100) * this._scrollSpeed;
      });
    }
  }

  /**
   * return `true` when user can scroll
   * @param y `deltaY` of `WheelEvent`
   */
  private _canScroll(y: number): boolean {
    const direction = getWheelDirection(y);
    const distances = this.objects.map(object => object.distance);
    // get maximum distance and minimum distance of objects
    const max = Math.max(...distances);
    const min = Math.min(...distances);

    // the user can scroll upward when maximum distance is bigger than 0
    // the user can scroll downward when minimum distance is smaller than 0
    return (direction === WheelDirection.upward && max >= 0) || (direction === WheelDirection.downward && min <= 0);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this._setCenterPoint();
    this._updateCenterPosition();
  }

  /**
   * update center position of each object
   */
  private _updateCenterPosition(): void {
    this.objects.forEach(object => object.resize(this._center));
  }

  @HostListener('touchstart', ['$event'])
  onHostTouchStart(event: TouchEvent): void {
    if (event.touches.length >= 2) {
      this._setTouchStartDistance(event.touches);
      this._addTouchMoveEvent();
      this._addTouchEndEvent();
      this._touchStarted = true;
    }
  }

  /**
   * set touch start distance
   * @param touches touched fingers
   */
  private _setTouchStartDistance(touches: TouchList): void {
    this._startDistance = getDistanceOfFingers(touches.item(0), touches.item(1));
  }

  /**
   * add touch move event to host element
   */
  private _addTouchMoveEvent(): void {
    if (this.host && !this._touchStarted) {
      this.host.addEventListener('touchmove', this._handleTouchMove);
    }
  }

  /**
   * handle touch move event
   * @param event touch event
   */
  private _handleTouchMove = (event: TouchEvent): void => {
    this._setTouchMoveDistance(event.touches);
    this._zoomInOutWithTouches();
  }

  /**
   * set touch moved distance
   * @param touches touched fingers
   */
  private _setTouchMoveDistance(touches: TouchList): void {
    this._movedDistance = getDistanceOfFingers(touches.item(0), touches.item(1));
  }

  /**
   * zoom in-out with touches
   */
  private _zoomInOutWithTouches(): void {
    const distance = this._movedDistance - this._startDistance;

    console.log(distance);
  }

  /**
   * add touch end event
   * handle 'cancel' event too
   */
  private _addTouchEndEvent(): void {
    if (this.host && !this._touchStarted) {
      this.host.addEventListener('touchend', this._handleTouchEnd);
      this.host.addEventListener('touchcancel', this._handleTouchEnd);
    }
  }

  /**
   * handle touch end event
   */
  private _handleTouchEnd = (): void => {
    this._removeTouchMoveEvent();
    this._removeTouchEndEvent();
  }

  /**
   * remove touch move event from the host
   */
  private _removeTouchMoveEvent(): void {
    if (this.host && this._touchStarted) {
      this.host.removeEventListener('touchmove', this._handleTouchMove);
    }
  }

  /**
   * remove touch end event from the host
   * handle 'cancel' event too
   */
  private _removeTouchEndEvent(): void {
    if (this.host && this._touchStarted) {
      this.host.removeEventListener('touchend', this._handleTouchEnd);
      this.host.removeEventListener('touchcancel', this._handleTouchEnd);
    }
  }
}
