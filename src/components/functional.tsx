import { FunctionalComponent } from '@stencil/core';

interface NavBarProps {
    title: String
}

export const Navbar : FunctionalComponent<NavBarProps> = ({ title }) => (
    <ion-header>
        <ion-toolbar>
            <ion-title>{ title }</ion-title>
            <ion-buttons slot='end'>
                <ion-menu-button />
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
);