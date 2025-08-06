import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header, Sidebar} from '../../../shared';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [RouterOutlet, Header, Sidebar],
    templateUrl: './main-layout.html',
    styleUrl: './main-layout.scss'
})
export class MainLayout {
}