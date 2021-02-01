import {IPlaygroundListItem, PlaygroundListItem} from '@playground/models/playground-list-item';
import {BaseModel} from '@playground/models/base-model';

export interface IPlaygroundListResponse {
  data: IPlaygroundListItem[];
  hasNext: boolean;
}

export class PlaygroundListResponse extends BaseModel implements IPlaygroundListResponse {
  data: PlaygroundListItem[];
  hasNext: boolean;

  constructor(data?: IPlaygroundListResponse) {
    super();

    this.data = this._createArrayModels(data?.data, PlaygroundListItem);
    this.hasNext = data?.hasNext || false;
  }
}
