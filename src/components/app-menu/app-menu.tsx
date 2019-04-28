import { Component, Prop } from "@stencil/core";
import { authSvc } from "../../services/auth.service";
import { User } from "../../interfaces/user";

@Component({
  tag: "app-menu",
  styleUrl: "app-menu.scss"
})
export class AppMenu {
  @Prop() user: User;

  async openAuthModal() {
    // initialize controller
    const modalController = document.querySelector("ion-modal-controller");
    await modalController.componentOnReady();

    // present the modal
    const modalElement = await modalController.create({
      component: "page-auth"
    });
    await modalElement.present();
  }

  appPages = [
    { title: "Home", url: "/", icon: "home" },
    { title: "About", url: "/about", icon: "person" },
    { title: "Tabs", url: "/home", icon: "person" },
    { title: "Admin", url: "/admin", icon: "construct" },
    { title: "Users", url: "/users", icon: "person" }
  ];

  render() {
    return (
      <ion-menu side="start" contentId="main" type="overlay">
        <ion-content>
          <ion-list>
            <ion-menu-toggle>
              {this.appPages.map(p => (
                <ion-item href={p.url}>
                  <ion-icon name={p.icon} slot="start" />
                  <ion-label>{p.title}</ion-label>
                </ion-item>
              ))}
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
        <ion-footer>
          {this.user ? (
            <ion-menu-toggle>
              <ion-button expand="full" onClick={() => authSvc.logout()}>
                Log out
              </ion-button>
            </ion-menu-toggle>
          ) : (
            <ion-menu-toggle>
              <ion-button expand="full" onClick={() => this.openAuthModal()}>
                Log in
              </ion-button>
            </ion-menu-toggle>
          )}
        </ion-footer>
        <ion-modal-controller />
      </ion-menu>
    );
  }
}
