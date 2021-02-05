import {BaseModel} from '@playground/models/base-model';

export interface IPlaygroundListItem {
  color: string;
  route: string;
  title: string;
  tech: string[];
}

export class PlaygroundListItem extends BaseModel implements IPlaygroundListItem {
  color: string;
  route: string;
  title: string;
  tech: string[];

  constructor(data?: IPlaygroundListItem) {
    super();

    this.color = data?.color || '';
    this.route = data?.route || '';
    this.title = data?.title || '';
    this.tech = data?.tech || [];
  }
}
