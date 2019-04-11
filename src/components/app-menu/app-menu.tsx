import { Component, Prop } from '@stencil/core';
import { authSvc } from '../../services/auth.service';


@Component({
    tag: 'app-menu',
    styleUrl: 'app-menu.scss'
})
export class AppMenu {
    @Prop() user: firebase.User

    appPages = [
        { title: 'Home', url: '/', icon: 'home' },
        { title: 'About', url: '/about', icon: 'person' },
        { title: 'Tabs', url: '/home', icon: 'person' }
    ]
    render() {
        return (
            <ion-menu side='start' contentId='main' type='overlay'>
                <ion-content>
                    <ion-list>
                        <ion-menu-toggle>
                            
                            {this.appPages.map(p => (
                                <ion-item href={p.url}>
                                    <ion-icon name={p.icon} slot='start'/>
                                    <ion-label>{p.title}</ion-label>
                                </ion-item>
                            ))}
                            
                        </ion-menu-toggle>
                    </ion-list>
                </ion-content>
                <ion-footer>
                    {this.user 
                        ? (<ion-button expand='full' onClick={() => authSvc.logout()}>Logout</ion-button>) 
                        : undefined
                    }
                </ion-footer>
            </ion-menu>
        );
    }
}
