import { Component } from '@stencil/core';


@Component({
    tag: 'tabs-root',
    styleUrl: 'tabs-root.scss'
})
export class TabsRoot {
    appTabs = [
        { title: 'Home', tab: 'tabs-home', icon: 'home' },
        { title: 'Dashboard', tab: 'tabs-dashboard', icon: 'person' }
    ]

    render() {
        return (
            <ion-tabs>
                { /* tab conent */}
                <ion-tab tab='tabs-home'>
                    <ion-nav />
                </ion-tab>
                <ion-tab tab='tabs-dashboard'>
                    <ion-nav />
                </ion-tab>
                <ion-tab-bar slot='bottom'>
                    { this.appTabs.map(t => (
                        <ion-tab-button tab={t.tab}>
                            <ion-label>{t.title}</ion-label>
                            <ion-icon name={t.icon}></ion-icon>
                        </ion-tab-button>
                    ))}  
                </ion-tab-bar>
            </ion-tabs>
        );
    }
}
