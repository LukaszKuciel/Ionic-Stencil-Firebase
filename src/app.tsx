import {Component} from "@stencil/core";

@Component({
    tag: 'app-root'
})
export class App {
    render() {
        return ( 
            <ion-app>
                <ion-router useHash={false}>
                    <ion-route url='/' component='page-home'></ion-route>
                    <ion-route url='/about' component='page-about'></ion-route>
                </ion-router>

                <ion-nav />
            </ion-app>
        )
    }
}