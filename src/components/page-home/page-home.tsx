import { Component, Prop } from '@stencil/core';
import { Navbar } from '../functional';

@Component({
    tag: 'page-home',
    styleUrl: 'page-home.scss'
})
export class PageHome {
    @Prop() user: firebase.User

    render() {
        return [
            <Navbar title='Home' />,
            <ion-content>
                <h1>{ this.user ? this.user.displayName : <ion-skeleton-text /> }</h1>
                <p>{ this.user ? this.user.email : <ion-skeleton-text /> }</p>
            </ion-content>
        ];
    }
}
