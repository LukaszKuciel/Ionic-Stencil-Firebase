import firebase from "firebase";
import { Plugins } from '@capacitor/core';
import { authState } from 'rxfire/auth';
import { Observable } from 'rxjs';

import { auth } from "../firebase";
const { Modals } = Plugins;

export class AuthService {
    user$: Observable<firebase.User>;

    constructor() {
        this.user$ = authState(auth);
    }

    public sendEmailLink(email: string) {
        const actionCodeSettings = {
            url: 'http://localhost:3333/',
            handleCodeInApp: true
        };
        localStorage.setItem('emailForSignIn', email);
        return auth.sendSignInLinkToEmail(email, actionCodeSettings);
    }

    public async verifyEmailLink(url: string) {
        if(auth.isSignInWithEmailLink(url)) {
            let email = localStorage.getItem('emailForSignIn');
            if(!email) {
                email = await this.openPrompt();
            }
            const result = await auth.signInWithEmailLink(email, url);
            console.log(result);

            if(result.additionalUserInfo.isNewUser) {
                // do something for new users
            }

            if(history && history.replaceState) {
                history.replaceState({}, document.title, url.split('?')[0])    
            }

            localStorage.removeItem('emailForSignIn');
        }
    }

    public google() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.providerHandler(provider);
    }
    public twitter() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return this.providerHandler(provider);
    }

    public logout() {
        return auth.signOut()
    }

    private async openPrompt() {
        const prompt = await Modals.prompt({
            title: 'Email Verification',
            message: 'Please provide your email for confirmation',
            inputPlaceholder: 'Email address'
        });
        return prompt.value;
    }
    private providerHandler(provider: any) {
        return auth.signInWithPopup(provider);
    }
}

export const authSvc = new AuthService();