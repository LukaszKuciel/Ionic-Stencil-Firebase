import { Component, Prop, State } from "@stencil/core";
import { User } from "../../interfaces/user";
import { userSvc } from "../../services/user.service";
@Component({
  tag: "page-user-update",
  styleUrl: "page-user-update.scss"
})
export class PageUserUpdate {
  @Prop() user: User;

  @State() displayName: string;
  @State() bio: string;
  @State() website: string;
  @State() twitter: string;
  @State() github: string;

  componentWillLoad() {
    this.setState();
  }

  setState() {
    if (this.user) {
      const { displayName, bio, website, twitter, github } = this.user;
      this.displayName = displayName;
      this.bio = bio;
      this.website = website;
      this.twitter = twitter;
      this.github = github;
    }
  }

  async update() {
    let payload = {
      displayName: this.displayName || null,
      bio: this.bio || null,
      website: this.website || null,
      twitter: this.twitter || null,
      github: this.github || null
    };
    await userSvc.updateUser(this.user.uid, payload);
    console.log("Profile updated!");
  }

  inputHandler(event: any) {
    this[event.target.name] = event.target.value;
  }

  updatePhotoURL(event: any) {
    userSvc.updateUserPhoto(this.user.uid, event.target.files[0]);
  }

  render() {
    return [
      <ion-header no-border>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button />
          </ion-buttons>
          <ion-title>Update Profile</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.update()}>
              <ion-icon name="save" /> Save
            </ion-button>
            <ion-menu-button />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <div class="cover" />
        <ion-thumbnail>
          <img
            src={this.user ? this.user.photoURL : undefined}
            alt={this.user ? this.user.displayName : undefined}
          />
          <div>
            <label htmlFor="avatarFileInput">
              <ion-icon name="camera" />
            </label>
            <input
              type="file"
              accept="image/*"
              id="avatarFileInput"
              onChange={event => this.updatePhotoURL(event)}
            />
          </div>
        </ion-thumbnail>

        <ion-list>
          <ion-list-header>Basic Details</ion-list-header>
          <ion-item>
            <ion-label position="floating">Display Name</ion-label>
            <ion-input
              name="displayName"
              value={this.displayName}
              onInput={event => this.inputHandler(event)}
            />
          </ion-item>
          <ion-item>
            <ion-label position="floating">Bio</ion-label>
            <ion-textarea
              rows={4}
              name="bio"
              value={this.bio}
              onInput={event => this.inputHandler(event)}
            />
          </ion-item>
          <ion-item>
            <ion-label position="floating">Website</ion-label>
            <ion-input
              name="website"
              value={this.website}
              onInput={event => this.inputHandler(event)}
            />
          </ion-item>
          <ion-item>
            <ion-label position="floating">Twitter</ion-label>
            <ion-input
              name="twitter"
              value={this.twitter}
              onInput={event => this.inputHandler(event)}
            />
          </ion-item>
          <ion-item>
            <ion-label position="floating">GitHub</ion-label>
            <ion-input
              name="github"
              value={this.github}
              onInput={event => this.inputHandler(event)}
            />
          </ion-item>
        </ion-list>
      </ion-content>
    ];
  }
}
