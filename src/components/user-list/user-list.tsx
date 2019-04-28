import { Component, Prop } from "@stencil/core";
import { User } from "../../interfaces/user";

@Component({
  tag: "user-list",
  styleUrl: "user-list.scss"
})
export class UserList {
  @Prop() users: User[];

  viewUser(uid: string) {
    const router = document.querySelector("ion-router");
    return router.push(`/users/${uid}`);
  }
  render() {
    return this.users
      ? this.users.map(user => (
          <ion-item onClick={() => this.viewUser(user.uid)}>
            <ion-avatar>
              <img src={user.photoURL} alt={user.displayName} />
            </ion-avatar>
            <ion-label>
              <h2>{user.displayName}</h2>
              <p>{user.uid}</p>
            </ion-label>
          </ion-item>
        ))
      : undefined;
  }
}
