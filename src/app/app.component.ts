import {ApplicationRef, Component, Inject} from '@angular/core';
import {SubscriptionService} from '@playground/services/common/subscription.service';
import {concat, interval} from 'rxjs';
import {first} from 'rxjs/operators';
import {SwUpdate} from '@angular/service-worker';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // show update
  showUpdate = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private swUpdate: SwUpdate,
    private applicationRef: ApplicationRef,
    private subscriptionService: SubscriptionService,
  ) {
    this._checkUpdate();
    this._checkUpdateInterval();
  }

  /**
   * check update in interval
   */
  private _checkUpdateInterval(): void {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = this.applicationRef.isStable.pipe(first(isStable => isStable));
    const everyTenMinutes$ = interval(10 * 60 * 1000);
    const everyTenMinutesOnceAppIsStable$ = concat(appIsStable$, everyTenMinutes$);

    const sub = everyTenMinutesOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate());

    this.subscriptionService.store('_checkUpdateInterval', sub);
  }

  /**
   * check application update
   */
  private _checkUpdate(): void {
    this.swUpdate.available.subscribe(() => {
      this.showUpdate = true;
    });
  }

  /**
   * force update the application
   */
  updateApplication(): void {
    this.showUpdate = false;
    this.swUpdate.activateUpdate().then(() => this.document.location.reload());
  }
}
