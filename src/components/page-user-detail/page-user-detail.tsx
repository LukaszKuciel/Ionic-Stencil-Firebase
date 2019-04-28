import { Component, State } from "@stencil/core";
import { User } from "../../interfaces/user";
import { userSvc } from "../../services/user.service";
import { Subscription } from "rxjs";
import { authSvc } from "../../services/auth.service";
import { first } from "rxjs/operators";

@Component({
  tag: "page-user-detail",
  styleUrl: "page-user-detail.scss"
})
export class PageUserDetail {
  @State() user: User;
  @State() userSub$: Subscription;
  @State() isOwner: boolean = false;

  componentWillLoad() {
    const uid = location.href.split("/")[4];
    this.userSub$ = userSvc.getUser(uid).subscribe(user => (this.user = user));
    this.checkOwnership(uid);
  }

  componentDidUnload() {
    this.userSub$.unsubscribe();
  }

  async checkOwnership(uid: string) {
    const user = await authSvc.user$.pipe(first()).toPromise();
    uid === user.uid ? (this.isOwner = true) : (this.isOwner = false);
  }

  render() {
    return [
      <ion-header no-border>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button />
          </ion-buttons>
          <ion-title>
            {this.user ? this.user.displayName : "User Detail"}
          </ion-title>
          <ion-buttons slot="end">
            {this.isOwner ? (
              <ion-button href="/home/user/update">
                <ion-icon name="create" />
              </ion-button>
            ) : (
              undefined
            )}
            <ion-menu-button />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-grid>
          <ion-row>
            {this.user ? (
              <ion-col>
                <ion-thumbnail>
                  <img src={this.user.photoURL} alt={this.user.displayName} />
                </ion-thumbnail>
                <p>{this.user.email}</p>
                <p>Member since: {this.user.memberSince}</p>
                <p>Role: {this.user.role}</p>
                <p>Bio: {this.user.bio}</p>
              </ion-col>
            ) : (
              undefined
            )}
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }
}
