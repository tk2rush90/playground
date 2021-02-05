import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {environment} from '../../../../../environments/environment';

const {
  prefix,
} = environment;

@Directive({
  selector: 'audio[appHiddenAudio]'
})
export class HiddenAudioDirective implements AfterViewInit {
  /**
   * set music to play
   * @param music music name
   */
  @Input() set music(music: string) {
    this._music = music;
    this._setMusicSource();
  }
  // emit when audio played
  @Output() audioPlayed: EventEmitter<HTMLAudioElement> = new EventEmitter<HTMLAudioElement>();
  // emit when audio ended
  @Output() audioEnded: EventEmitter<void> = new EventEmitter<void>();
  // music name
  private _music: string | undefined;
  // play timer for delay
  private _timer: any;
  // delay before playing music
  private _delay = 500;
  // prefix
  private _prefix = prefix;

  constructor(
    private elementRef: ElementRef<HTMLAudioElement>,
  ) { }

  ngAfterViewInit(): void {
    this._setMusicSource();
  }

  /**
   * return the audio element
   */
  get audio(): HTMLAudioElement | undefined {
    return this.elementRef?.nativeElement;
  }

  /**
   * set music to play
   */
  private _setMusicSource(): void {
    if (this.audio) {
      this.audio.pause();

      if (this._music) {
        this.audio.src = `${prefix}/assets/music/bensound/${this._music}.mp3`;
        this.audio.load();
      }
    }
  }

  @HostListener('loadeddata')
  onHostLoadedData(): void {
    clearTimeout(this._timer);

    this._timer = setTimeout(() => {
      this._play();
    }, this._delay);
  }

  /**
   * play the music
   */
  private _play(): void {
    if (this.audio) {
      this.audio.play()
        .then(() => {
          this.audioPlayed.emit(this.audio);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }

  @HostListener('ended')
  onHostEnded(): void {
    this.audioEnded.emit();
  }
}
