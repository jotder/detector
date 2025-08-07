import {Component, Input, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RiskyStore} from '../../models/risk-entity.model';

@Component({
    selector: 'app-risky-stores',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './risky-stores.html',
    styleUrl: './risky-stores.scss'
})
export class RiskyStoresComponent {
    @Input({required: true}) stores!: Signal<RiskyStore[] | null>;
}
