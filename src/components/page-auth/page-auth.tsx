import { Component, State } from '@stencil/core';
import { authSvc } from '../../services/auth.service';
import { Navbar } from '../functional';

@Component({
    tag: 'page-auth',
    styleUrl: 'page-auth.scss'
})
export class PageAuth {

    @State() email: string;

    async sendLink() {
        try {
            if(this.email){
                await authSvc.sendEmailLink(this.email.trim());
                console.log('email sent');
                
            }
        } catch (error) {
            console.log(error.code, error.message);
        }
    }

    private inputHandler(event) {
        this.email = event.target.value;
    }

    render() {
        return [
            <Navbar title='Authentication' />,
            <ion-content>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position='floating'>Email</ion-label>
                                <ion-input required type='email' onInput={(event) => this.inputHandler(event)}/>
                            </ion-item>
                            <ion-button expand="block" onClick={() => this.sendLink()}>
                                Send Link
                            </ion-button> 
                            <ion-button expand="block" onClick={() => authSvc.google()}>
                                Login with Google
                            </ion-button> 
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>
        ];
    }
}
