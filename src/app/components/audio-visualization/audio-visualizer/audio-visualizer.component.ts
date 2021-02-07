import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {PixiBaseComponent} from '@playground/components/common/pixi-base/pixi-base.component';
import {AbstractAnimationScene, AnimationService} from '@playground/services/animation/animation.service';
import {getPointOnArc, toRadian} from '@playground/utils/math.util';
import {Point} from '@playground/utils/type.util';
import * as PIXI from 'pixi.js';
import {
  AudioColorValues
} from '@playground/components/audio-visualization/audio-visualizer/audio-color-picker/audio-color-picker.component';
import {easeOutQuad} from '@playground/utils/animation.util';
import {getRGB} from '@playground/utils/color.util';
import {environment} from '../../../../environments/environment';
import {randomNumber} from '@playground/utils/random.util';
import {ToastService, ToastType} from '@playground/components/common/toast/service/toast.service';

const {
  githubUrl,
  instagramUrl,
  paypalUrl,
} = environment;

const FFT_SIZE = Math.pow(2, 6);

export interface PlayableMusic {
  name: string;
  credit: string;
  link: string;
  src: string;
}

const COLOR_STORE_KEY = 'TK_AUDIO_VISUALIZER_COLOR';
const PLAYABLE_LIST: PlayableMusic[] = [
  {name: 'A New Beginning', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/A New Beginning.mp3`},
  {name: 'Acoustic Breeze', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/Acoustic Breeze.mp3`},
  {name: 'All That', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/All That.mp3`},
  {name: 'Creative Minds', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/Creative Minds.mp3`},
  {name: 'Dreams', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/Dreams.mp3`},
  {name: 'E.R.F.', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/E.R.F..mp3`},
  {name: 'Elevate', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/Elevate.mp3`},
  {name: 'Enigmatic', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/Enigmatic.mp3`},
  {name: 'Happy Rock', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/Happy Rock.mp3`},
  {name: 'Memories', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/Memories.mp3`},
  {name: 'New Dawn', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/New Dawn.mp3`},
  {name: 'Once Again', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/Once Again.mp3`},
  {name: 'Perception', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/Perception.mp3`},
  {name: 'Retro Soul', credit: 'Bensound', link: 'https://www.bensound.com', src: `/bensound/Retro Soul.mp3`},
  {name: 'Caballero', credit: 'Ofshane', link: 'https://www.youtube.com/channel/UC34Wh4ysdP50H-ThbZFFfsA', src: `/youtube/Caballero - Ofshane.mp3`},
  {name: 'Koto San', credit: 'Ofshane', link: 'https://www.youtube.com/channel/UC34Wh4ysdP50H-ThbZFFfsA', src: `/youtube/Koto San - Ofshane.mp3`},
];

export const BackgroundColorValues = {
  purple: [
    '#4E364E',
    '#AA43AA',
  ],
  blue: [
    '#465877',
    '#3574DF',
  ],
  red: [
    '#802E2E',
    '#FF3E3E',
  ],
  orange: [
    '#9E7247',
    '#FF8811',
  ],
  green: [
    '#3A4E31',
    '#558740',
  ],
};

export enum BackgroundAnimatorState {
  fading = 'fading',
  faded = 'faded',
}

export interface BackgroundAnimatorOptions {
  color: keyof typeof BackgroundColorValues;
}

/**
 * this class will animate background gradient
 */
export class BackgroundAnimator extends AbstractAnimationScene {
  // background animator state
  private _state: BackgroundAnimatorState = BackgroundAnimatorState.faded;
  // animation duration
  private _duration = 120;
  // color string
  private _color: keyof typeof BackgroundColorValues = 'purple';
  // animating fields
  private _startingR = 0x33;
  private _startingG = 0x33;
  private _startingB = 0x33;
  private _endingR = 0x70;
  private _endingG = 0x70;
  private _endingB = 0x70;

  private _initialStartingR = 0;
  private _initialStartingG = 0;
  private _initialStartingB = 0;
  private _initialEndingR = 0;
  private _initialEndingG = 0;
  private _initialEndingB = 0;

  private _targetStartingR = 0;
  private _targetStartingG = 0;
  private _targetStartingB = 0;
  private _targetEndingR = 0;
  private _targetEndingG = 0;
  private _targetEndingB = 0;

  private _changingStartingR = 0;
  private _changingStartingG = 0;
  private _changingStartingB = 0;
  private _changingEndingR = 0;
  private _changingEndingG = 0;
  private _changingEndingB = 0;

  constructor(options: BackgroundAnimatorOptions) {
    super();

    this.changeColor(options.color);
  }

  /**
   * return the hsl string of gradient start color
   */
  get backgroundImage(): string {
    const startingRGB = `rgb(${this._startingR}, ${this._startingG}, ${this._startingB})`;
    const endingRGB = `rgb(${this._endingR}, ${this._endingG}, ${this._endingB})`;

    return `linear-gradient(180deg, ${startingRGB}, ${endingRGB})`;
  }

  /**
   * change color
   * @param color color
   */
  changeColor(color: keyof typeof BackgroundColorValues): void {
    this._color = color;
    this._setTarget();
    this._startAnimation();
  }

  /**
   * set target color
   */
  private _setTarget(): void {
    const targetColors = BackgroundColorValues[this._color];
    const startingRGB = getRGB(targetColors[0]);
    const endingRGB = getRGB(targetColors[1]);

    if (startingRGB && endingRGB) {
      this._initialStartingR = this._startingR;
      this._initialStartingG = this._startingG;
      this._initialStartingB = this._startingB;
      this._initialEndingR = this._endingR;
      this._initialEndingG = this._endingG;
      this._initialEndingB = this._endingB;

      this._targetStartingR = startingRGB[0];
      this._targetStartingG = startingRGB[1];
      this._targetStartingB = startingRGB[2];
      this._targetEndingR = endingRGB[0];
      this._targetEndingG = endingRGB[1];
      this._targetEndingB = endingRGB[2];

      this._changingStartingR = this._targetStartingR - this._initialStartingR;
      this._changingStartingG = this._targetStartingG - this._initialStartingG;
      this._changingStartingB = this._targetStartingB - this._initialStartingB;
      this._changingEndingR = this._targetEndingR - this._initialEndingR;
      this._changingEndingG = this._targetEndingG - this._initialEndingG;
      this._changingEndingB = this._targetEndingB - this._initialEndingB;
    }
  }

  /**
   * start animation
   */
  private _startAnimation(): void {
    this._start = 0;
    this._state = BackgroundAnimatorState.fading;
  }

  /**
   * override `animate()` method
   * @param frame animation frame
   */
  animate(frame: number): void {
    super.animate(frame);
    this._switchByState();
  }

  /**
   * switch by state
   */
  private _switchByState(): void {
    switch (this._state) {
      case BackgroundAnimatorState.fading: {
        this._fadeIn();
        break;
      }
    }
  }

  /**
   * fade in
   */
  private _fadeIn(): void {
    const time = Math.min(this.time, this._duration);

    this._startingR = easeOutQuad(time, this._initialStartingR, this._changingStartingR, this._duration);
    this._startingG = easeOutQuad(time, this._initialStartingG, this._changingStartingG, this._duration);
    this._startingB = easeOutQuad(time, this._initialStartingB, this._changingStartingB, this._duration);
    this._endingR = easeOutQuad(time, this._initialEndingR, this._changingEndingR, this._duration);
    this._endingG = easeOutQuad(time, this._initialEndingG, this._changingEndingG, this._duration);
    this._endingB = easeOutQuad(time, this._initialEndingB, this._changingEndingB, this._duration);

    if (this.time > this._duration) {
      this._state = BackgroundAnimatorState.faded;
    }
  }
}

export interface AudioSoundBallOptions {
  // sound power
  power?: number;
  // ball position angle in **radian**
  angle?: number;
  // center position of circle
  center: Point;
  // base radius of circle
  radius: number;
  // ball size
  size: number;
}

export class AudioSoundBall extends AbstractAnimationScene {
  // graphics
  graphics: PIXI.Graphics = new PIXI.Graphics();
  // sound power
  private _power = 0;
  // ball position angle
  private _angle = 0;
  // base radius
  private _radius = 0;
  // ball size
  private _size = 0;
  // center of circle
  private _center: PIXI.Point = new PIXI.Point();
  // ball position
  private _position: PIXI.Point = new PIXI.Point();

  constructor(options: AudioSoundBallOptions) {
    super();

    this._power = options.power || 0;
    this._angle = options.angle || 0;
    this._radius = options.radius;
    this._size = options.size;
    this._center.set(options.center.x, options.center.y);
    this._setPosition();
    this._drawBall();
  }

  /**
   * set position for ball
   */
  private _setPosition(): void {
    const corrector = (this._radius * .5) / 255;
    const {x, y} = getPointOnArc(this._center, toRadian(this._angle), this._radius + (this._power * corrector));

    this._position.set(x, y);
  }

  /**
   * draw sound ball
   */
  private _drawBall(): void {
    this.graphics.clear();
    this.graphics.position.set(this._position.x, this._position.y);
    this.graphics.beginFill(0xffffff);
    this.graphics.drawCircle(0, 0, this._size);
    this.graphics.endFill();
  }

  /**
   * update angle and power
   * @param angle angle
   * @param power power
   */
  update(angle: number, power: number): void {
    this._angle = angle;
    this._power = power;
    this._setPosition();
    this._drawBall();
  }

  /**
   * resize the center point
   * @param x center x
   * @param y center y
   * @param radius base radius
   * @param size ball size
   */
  resize({x, y}: Point, radius: number, size: number): void {
    this._center.set(x, y);
    this._radius = radius;
    this._size = size;
    this._setPosition();
    this._drawBall();
  }
}

export interface AudioVisualizingCircleOptions {
  // screen size
  width: number;
  height: number;
  // analyser
  analyser: AnalyserNode;
}

export class AudioVisualizingCircle extends AbstractAnimationScene {
  // container
  container: PIXI.Container = new PIXI.Container();
  // graphics
  private _graphics: PIXI.Graphics = new PIXI.Graphics();
  // screen size
  private _width = 0;
  private _height = 0;
  // center position
  private _center: PIXI.Point = new PIXI.Point();
  // audio data
  private _data: Uint8Array | undefined;
  // sound balls
  private _soundBalls: AudioSoundBall[] = [];
  // analyser
  private readonly _analyser: AnalyserNode;

  private readonly _laptopBreakPoint = 1024;
  private readonly _tabletBreakPoint = 768;

  constructor(options: AudioVisualizingCircleOptions) {
    super();

    this._analyser = options.analyser;
    this.resize(options.width, options.height);
    this._setCenter();

    this.container.addChild(this._graphics);
  }

  /**
   * set audio data
   * @param data data
   */
  set data(data: Uint8Array | undefined) {
    this._data = data;
  }

  /**
   * return audio data
   */
  get data(): Uint8Array | undefined {
    return this._data;
  }

  /**
   * return the radius
   */
  get radius(): number {
    if (this._width <= this._tabletBreakPoint) {
      return 170;
    } else if (this._width <= this._laptopBreakPoint) {
      return 195;
    } else {
      return 220;
    }
  }

  /**
   * return the ball size
   */
  get size(): number {
    if (this._width <= this._tabletBreakPoint) {
      return 1.1;
    } else if (this._width <= this._laptopBreakPoint) {
      return 1.3;
    } else {
      return 1.5;
    }
  }

  /**
   * set center position
   */
  private _setCenter(): void {
    this._center.set(this._width * .5, this._height * .5);
    this._graphics.position.set(this._center.x, this._center.y);
  }

  /**
   * override `animate()` method
   * @param frame frame
   */
  animate(frame: number): void {
    super.animate(frame);

    if (this._analyser && this._data) {
      this._analyser.getByteFrequencyData(this._data);
      this._removeBalls();
      this._createBalls();
    }
  }

  /**
   * remove all balls
   */
  private _removeBalls(): void {
    if (this._data) {
      const removable = this._soundBalls.splice(this._data.length);

      removable.forEach(ball => {
        ball.graphics.destroy();
      });
    }
  }

  /**
   * create balls for sound visualizing
   */
  private _createBalls(): void {
    if (this._data) {
      const step = 30;
      const jStep = 12;
      const length = this._data.length;

      for (let i = 0; i < length * 2; i++) {
        for (let j = 0; j < jStep; j++) {
          // default
          let position = i;
          let dataIndex = i;
          let ballIndex = (jStep * i) + j;
          let angle = step * j + position;

          // reversed
          if (i > length) {
            position = i - length;
            dataIndex = length - (i - length);
            ballIndex = (jStep * i) + j;
            angle = position - (step * j);
          }

          this._updateOrCreateBall(ballIndex, dataIndex, angle);
        }
      }
    }
  }

  /**
   * update or create ball index
   * @param index rendered ball index
   * @param dataIndex data index
   * @param angle angle
   */
  private _updateOrCreateBall(index: number, dataIndex: number, angle: number): void {
    if (this._data) {
      if (this._soundBalls[index]) {
        const ball = this._soundBalls[index];

        ball.update(angle, this._data[dataIndex]);
      } else {
        const ball = new AudioSoundBall({
          angle,
          power: this._data[dataIndex],
          center: this._center,
          radius: this.radius,
          size: this.size,
        });

        this.container.addChild(ball.graphics);
        this._soundBalls.push(ball);
      }
    }
  }

  /**
   * handle screen resizing
   * @param width width
   * @param height height
   */
  resize(width: number, height: number): void {
    this._width = width;
    this._height = height;
    this._setCenter();
    this._soundBalls.forEach(ball => {
      ball.resize(this._center, this.radius, this.size);
    });
  }
}

@Component({
  selector: 'app-audio-visualizer',
  templateUrl: './audio-visualizer.component.html',
  styleUrls: [
    '../../common/pixi-base/pixi-base.component.scss',
    './audio-visualizer.component.scss',
  ],
  providers: [
    AnimationService,
  ]
})
export class AudioVisualizerComponent extends PixiBaseComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * bind animated background image
   */
  @HostBinding('style.background-image') get backgroundImage(): string | void {
    if (this._backgroundAnimator) {
      return this._backgroundAnimator.backgroundImage;
    }
  }
  // sns urls
  githubUrl = githubUrl;
  instagramUrl = instagramUrl;
  paypalUrl = paypalUrl;
  // audio color value
  color: keyof typeof AudioColorValues = 'purple';
  // show audio state
  showAudio = false;
  // loading audio
  loadingAudio = false;
  // loading microphone
  loadingMicrophone = false;
  // using microphone state
  usingMicrophone = false;
  // audio context
  private _context!: AudioContext;
  // audio analyser node
  private _analyser!: AnalyserNode;
  // audio source node
  private _source: MediaStreamAudioSourceNode | MediaElementAudioSourceNode | undefined;
  // live media stream
  private _stream: MediaStream | undefined;
  // buffer length
  private _bufferLength = 0;
  // uint8 array data
  private _data: Uint8Array = new Uint8Array(FFT_SIZE * .5);
  // audio visualizing circle
  private _audioVisualizingCircle: AudioVisualizingCircle | undefined;
  // background animator
  private _backgroundAnimator: BackgroundAnimator | undefined;
  // playlist
  private _playlist: PlayableMusic[] = [];
  // play index
  private _playIndex = 0;

  constructor(
    protected renderer: Renderer2,
    protected elementRef: ElementRef<HTMLElement>,
    protected animationService: AnimationService,
    private toastService: ToastService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super(renderer, elementRef, animationService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this._restoreColor();
    this._createBackgroundAnimator();
    this._createPlaylist();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._initializeAudioContext();
    this._addAudioVisualizingCircle();
    this._setDataToAudioVisualizingCircle();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.stopPlaying();
    this._stopStream();
  }

  /**
   * return the name of current playing music
   */
  get playingMusic(): PlayableMusic {
    return this._playlist[this._playIndex];
  }

  /**
   * create random playlist when init
   */
  private _createPlaylist(): void {
    const list = [...PLAYABLE_LIST];

    while (list.length > 0) {
      const index = randomNumber(0, list.length - 1);

      if (index !== -1) {
        const item = list.splice(index, 1);

        this._playlist.push(item[0]);
      }
    }
  }

  /**
   * restore color
   */
  private _restoreColor(): void {
    this.color = localStorage.getItem(COLOR_STORE_KEY) as any || 'purple';
  }

  /**
   * remember the color
   */
  private _rememberColor(): void {
    localStorage.setItem(COLOR_STORE_KEY, this.color);
  }

  /**
   * create background animator
   */
  private _createBackgroundAnimator(): void {
    this._backgroundAnimator = new BackgroundAnimator({
      color: this.color,
    });

    this.animationService.addScene(this._backgroundAnimator);
  }

  /**
   * initialize audio context
   */
  private _initializeAudioContext(): void {
    this._context = new AudioContext();
    this._analyser = this._context.createAnalyser();
  }

  /**
   * add audio visualizing circle to application and scene
   */
  private _addAudioVisualizingCircle(): void {
    this._audioVisualizingCircle = new AudioVisualizingCircle({
      width: this._width,
      height: this._height,
      analyser: this._analyser,
    });

    this._app.stage.addChild(this._audioVisualizingCircle.container);
    this.animationService.addScene(this._audioVisualizingCircle);
  }

  /**
   * handle microphone button clicked
   */
  onMicrophoneButtonClicked(): void {
    this._context.resume()
      .then(() => {
        if (!this.loadingMicrophone) {
          if (this.usingMicrophone) {
            this._stopStream();
          } else {
            this._requestUserAudio();
          }
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  /**
   * request user audio
   */
  private _requestUserAudio(): void {
    this._stopStream();
    this.stopPlaying();

    this.usingMicrophone = false;
    this.loadingMicrophone = true;

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(stream => {
        if (!this.showAudio) {
          this._stream = stream;
          this._source = this._context.createMediaStreamSource(this._stream);
          this._createVisualizingData();
          this.usingMicrophone = true;
        }
      })
      .catch(e => {
        console.error(e);

        this.toastService.open({
          message: `Can't get microphone from your device`,
          type: ToastType.default,
        });
      })
      .finally(() => {
        this.loadingMicrophone = false;
      });
  }

  /**
   * stop all tracks in stream
   */
  private _stopStream(): void {
    if (this._stream) {
      this._stream
        .getTracks()
        .forEach(track => {
          track.stop();
        });

      this._stream = undefined;
      this.usingMicrophone = false;
    }
  }

  /**
   * play preset music
   */
  playPresetMusic(): void {
    this._context.resume()
      .then(() => {
        this._stopStream();

        if (this.showAudio) {
          this.playNextMusic();
        } else {
          this.showAudio = true;
          this._playIndex = 0;
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  /**
   * handle audio rendered
   * @param audio audio element
   */
  onAudioRendered(audio: HTMLAudioElement): void {
    this._createAudioElementSource(audio);
  }

  /**
   * create source node for audio element
   * @param audio audio element
   */
  private _createAudioElementSource(audio: HTMLAudioElement): void {
    this._source = this._context.createMediaElementSource(audio);
  }

  /**
   * show loading state
   */
  onAudioLoad(): void {
    this.loadingAudio = true;
    this.changeDetectorRef.detectChanges();
  }

  /**
   * handle audio played
   * @param audio audio element
   */
  onAudioPlayed(audio: HTMLAudioElement): void {
    this.loadingAudio = false;
    this.changeDetectorRef.detectChanges();
    this._createVisualizingData(true);
  }

  /**
   * play next music
   */
  playNextMusic(): void {
    this._playIndex++;

    if (this._playIndex >= this._playlist.length) {
      this._playIndex = 0;
    }
  }

  /**
   * stop playing music
   */
  stopPlaying(): void {
    this.showAudio = false;
  }

  /**
   * create visualizing data and set to visualizing circle
   * @param connectDestination connect sound destination with source
   */
  private _createVisualizingData(connectDestination = false): void {
    if (this._source) {
      this._analyser.disconnect();
      this._source.connect(this._analyser);

      if (connectDestination) {
        this._analyser.connect(this._context.destination);
      }

      this._analyser.fftSize = FFT_SIZE;

      this._bufferLength = this._analyser.frequencyBinCount;
      this._data = new Uint8Array(this._bufferLength);
      this._setDataToAudioVisualizingCircle();
    }
  }

  /**
   * set sound data to visualizing circle
   */
  private _setDataToAudioVisualizingCircle(): void {
    if (this._audioVisualizingCircle) {
      this._audioVisualizingCircle.data = this._data;
    }
  }

  /**
   * handle background color change
   * @param color changed color
   */
  onColorChange(color: keyof typeof AudioColorValues): void {
    this.color = color;
    this._rememberColor();
    this._updateBackgroundColor();
  }

  /**
   * update background color
   */
  private _updateBackgroundColor(): void {
    if (this._backgroundAnimator) {
      this._backgroundAnimator.changeColor(this.color);
    }
  }

  /**
   * override `_setSize()` method
   */
  protected _setSize(): void {
    super._setSize();
    this._resizeAudioVisualizingCircle();
  }

  /**
   * resize the audio visualizing circle
   */
  private _resizeAudioVisualizingCircle(): void {
    if (this._audioVisualizingCircle) {
      this._audioVisualizingCircle.resize(this._width, this._height);
    }
  }
}
