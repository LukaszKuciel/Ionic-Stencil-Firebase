import { Component } from '@stencil/core';
import { Navbar } from '../functional';

@Component({
    tag: 'page-about',
    styleUrl: 'page-about.scss'
})
export class PageAbout {
    render() {
        return <Navbar title='About' />;
    }
}
