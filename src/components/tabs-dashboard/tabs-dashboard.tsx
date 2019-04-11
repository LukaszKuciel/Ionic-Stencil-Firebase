import { Component, Prop } from '@stencil/core';
import { Navbar } from '../functional';

@Component({
    tag: 'tabs-dashboard',
    styleUrl: 'tabs-dashboard.scss'
})
export class TabsDashboard {
    @Prop() user: firebase.User


    render() {
        return [
            <Navbar title='Dashboard' />,
            <ion-content>
                {
                    this.user 
                        ? (<ion-item lines='none' detail={true}>
                                <ion-avatar>
                                    <img src={this.user.photoURL} alt={this.user.displayName}/>
                                </ion-avatar>
                                <ion-label>
                                    <h2>{this.user.displayName}</h2>
                                    <p>{this.user.email}</p>
                                </ion-label>
                            </ion-item>)
                        : (<ion-skeleton-text />)
                }
            </ion-content>
        ];
    }
}
