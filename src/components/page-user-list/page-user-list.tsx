import { Component, State } from "@stencil/core";
import { Navbar } from "../functional";
import { User } from "../../interfaces/user";
import { userSvc } from "../../services/user.service";
import { Subscription } from "rxjs";

@Component({
  tag: "page-user-list",
  styleUrl: "page-user-list.scss"
})
export class PageUserList {
  @State() users: User[];
  @State() usersSub$: Subscription;

  componentWillLoad() {
    this.usersSub$ = userSvc
      .getUsers()
      .subscribe(users => (this.users = users));
  }

  componentDidUnload() {
    this.usersSub$.unsubscribe();
  }

  render() {
    return [
      <Navbar title="User List" />,
      <ion-content>
        <user-list users={this.users} />
      </ion-content>
    ];
  }
}
