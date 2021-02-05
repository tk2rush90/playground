import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {PlaygroundApiService} from '@playground/services/api/playground-api.service';
import {SubscriptionService} from '@playground/services/common/subscription.service';
import {ToastService, ToastType} from '@playground/components/common/toast/service/toast.service';
import {finalize} from 'rxjs/operators';
import {PlaygroundListItem} from '@playground/models/playground-list-item';

const {
  prefix,
  githubUrl,
  instagramUrl,
} = environment;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class LandingPageComponent implements OnInit {
  // prefix
  prefix = prefix;
  // current page
  page = 0;
  // has next state
  hasNext = false;
  // playground loading state
  loading = false;
  // data list
  data: PlaygroundListItem[] = [];
  // sns urls
  githubUrl = githubUrl;
  instagramUrl = instagramUrl;

  constructor(
    private toastService: ToastService,
    private subscriptionService: SubscriptionService,
    private playgroundApiService: PlaygroundApiService,
  ) { }

  ngOnInit(): void {
    this.getPlaygroundList();
  }

  /**
   * get playground list with page
   * @param page page number
   */
  getPlaygroundList(page: number = this.page): void {
    const sub = this.playgroundApiService
      .getPlaygroundList(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.page = page;
          this.hasNext = res.hasNext;
          this.data.push(...res.data);
        },
        error: err => {
          console.error(err);

          this.toastService.open({
            type: ToastType.error,
            message: '목록을 가져오지 못했습니다',
          });
        },
      });

    this.subscriptionService.store('getPlaygroundList', sub);
    this.loading = true;
  }
}
