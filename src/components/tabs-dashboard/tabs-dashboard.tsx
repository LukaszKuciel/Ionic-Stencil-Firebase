import { Component } from '@stencil/core';
import { Navbar } from '../functional';

@Component({
    tag: 'tabs-dashboard',
    styleUrl: 'tabs-dashboard.scss'
})
export class TabsDashboard {
    render() {
        return <Navbar title='Dashboard' />;
    }
}
