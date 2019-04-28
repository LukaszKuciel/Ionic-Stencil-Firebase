import { Component, State } from '@stencil/core';
import { authSvc } from '../../services/auth.service';

@Component({
    tag: 'page-auth',
    styleUrl: 'page-auth.scss'
})
export class PageAuth {

    @State() email: string;

    async sendLink() {
        try {
            if(this.email){
                await authSvc.sendEmailLink(this.email.trim())
                console.log('email sent')
                return this.dismissModal()
                
            }
        } catch (error) {
            console.log(error.code, error.message);
        }
    }

    async googleLogin() {
        await authSvc.google()
        return this.dismissModal()
    }

    async dismissModal() {
        // initialize controller
        const modalController = document.querySelector('ion-modal-controller');
        await modalController.componentOnReady();
        return modalController.dismiss();
    }

    private inputHandler(event) {
        this.email = event.target.value;
    }

    render() {
        return (
            <ion-content>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <h1>Login or Register</h1>
                            <ion-item>
                                <ion-label position='floating'>Email</ion-label>
                                <ion-input required type='email' onInput={(event) => this.inputHandler(event)}/>
                            </ion-item>
                            <ion-button expand="block" onClick={() => this.sendLink()}>
                                Send Link
                            </ion-button> 
                            <ion-button expand="block" onClick={() => this.googleLogin()}>
                                Login with Google
                            </ion-button> 
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>
        );
    }
}
