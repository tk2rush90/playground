import {BaseModel} from '@playground/models/base-model';
import {randomPick} from '@playground/utils/random.util';
import {environment} from '../../environments/environment';

const {
  prefix,
} = environment;

export interface IPlaygroundListItem {
  thumbnail: string;
  routes: string[];
}

export enum PlaygroundListItemSize {
  normal = 0,
  wide = 1,
}

export class PlaygroundListItem extends BaseModel implements IPlaygroundListItem {
  thumbnail: string;
  routes: string[];
  // item size
  private _size: PlaygroundListItemSize = randomPick([
    PlaygroundListItemSize.normal,
    PlaygroundListItemSize.wide,
  ]);

  constructor(data?: IPlaygroundListItem) {
    super();

    this.thumbnail = data?.thumbnail || '';
    this.routes = data?.routes || [];
  }

  /**
   * return the background image
   */
  get backgroundImage(): string | void {
    if (this.thumbnail) {
      return `url(${prefix + this.thumbnail})`;
    }
  }

  /**
   * return `true` when size is wide
   */
  get wide(): boolean {
    return this._size === PlaygroundListItemSize.wide;
  }
}
