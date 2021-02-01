import { Injectable } from '@angular/core';
import {ApiBaseService} from '@playground/services/common/api-base.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {IPlaygroundListResponse, PlaygroundListResponse} from '@playground/models/playground-list-response';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const {
  prefix,
} = environment;

@Injectable({
  providedIn: 'root'
})
export class PlaygroundApiService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super(prefix + '/assets/data');
  }

  /**
   * get playground list from local assets
   * @param page page number
   */
  getPlaygroundList(page: number): Observable<PlaygroundListResponse> {
    return this.http.get<IPlaygroundListResponse>(this.endpoint(`/playground-${page}.json`))
      .pipe(map(res => {
        return new PlaygroundListResponse(res);
      }));
  }
}
