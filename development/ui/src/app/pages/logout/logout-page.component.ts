import {Component} from '@angular/core';
import {UserService} from "../../user.service";
import {PageService} from "../../shared/page.service";

@Component({
  selector: 'kpn-logout-page',
  template: `
    <h1>
      Logout
    </h1>

    <div *ngIf="loggedIn()">

      <p>
        You are currently logged in as
        <osm-link-user user="{{loggedInUser()}}"></osm-link-user>
        .
      </p>

      <div class="note">
        <p>
          This allows you to view extra information that is available to OpenStreetMap users only.
        </p>

        <p>
          After logging out you can continue to use this website. However, the additional information
          such as changesets, network changes, route changes and node changes will not be visible anymore.
          Your personal OpenStreetMap
          <osm-link-user-oath-clients user="{{loggedInUser}}" title="list of authorised applications"></osm-link-user-oath-clients>
          will still contain this application. The application can safely be revoked.
          The authorization will not be used anymore. A new authorization will be created when logging in again.
        </p>
      </div>

      <button mat-raised-button color="primary" (click)="logout()">Logout</button>

    </div>

    <div *ngIf="!loggedIn()">

      <p>
        You are not logged in.
      </p>

      <p>
        You can <a routerLink="/login">login</a> to view extra information that is
        available to
        <osm-website></osm-website>
        users only.
      </p>

    </div>
  `,
  styles: [`
    .note {
      padding-top: 20px;
      padding-bottom: 40px;
      font-style: italic;
    }
  `]
})
export class LogoutPageComponent {

  constructor(private userService: UserService,
              private pageService: PageService) {
  }

  logout() {
    this.pageService.defaultMenu();
    this.userService.logout();
  }

  loggedIn() {
    return this.loggedInUser() != "";
  }

  loggedInUser() {
    return this.userService.currentUser();
  }

}