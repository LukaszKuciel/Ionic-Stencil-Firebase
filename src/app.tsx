import {Component} from "@stencil/core";
import { authSvc } from "./services/auth.service";

@Component({
    tag: 'app-root'
})
export class App {
    componentDidLoad() {
        console.log(authSvc.hello());
        console.log('name:', authSvc.name);
    }
    render() {
        return ( 
            <ion-app>
                <ion-router useHash={false}>
                    <ion-route url='/' component='page-home'></ion-route>
                    <ion-route url='/about' component='page-about'></ion-route>

                    <ion-route url='home' component='tabs-root'>
                        <ion-route url='/' component='tabs-home' >
                            <ion-route component='tabs-home' />
                        </ion-route>
                        <ion-route url='/user' component='tabs-dashboard' >
                            <ion-route component='tabs-dashboard' />
                        </ion-route>
                    </ion-route>
                </ion-router>
                <app-menu />
                <ion-nav id='main' />
            </ion-app>
        )
    }
}