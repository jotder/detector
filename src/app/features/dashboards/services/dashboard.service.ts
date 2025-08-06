import {Injectable, signal, Signal} from '@angular/core';
import {DashboardSummary} from '../models/dashboard-summary.model';
import {AnalyticsSummary} from '../models/analytics-summary.model';
import {RiskyCashier, RiskyStore} from '../models/risk-entity.model';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    // Mock data is now held in signals, making the service a state holder.
    // Components can directly bind to these signals for reactive updates.

    public readonly executiveSummary: Signal<DashboardSummary> = signal({
        openAlertCount: 125,
        inProgressAlertCount: 42,
        closedAlertCount: 18934,
    });

    public readonly analyticsSummary: Signal<AnalyticsSummary> = signal({
        refunds: 1200,
        discounts: 540,
        priceOverrides: 320,
        cancels: 150,
    });

    public readonly riskyStores: Signal<RiskyStore[]> = signal([
        {id: '1', name: 'Store A', riskScore: 95, trend: 'up'},
        {id: '2', name: 'Store B', riskScore: 92, trend: 'down'},
        {id: '3', name: 'Store C', riskScore: 88, trend: 'up'},
    ]);

    public readonly riskyCashiers: Signal<RiskyCashier[]> = signal([
        {id: '101', name: 'Cashier John D.', riskScore: 98, trend: 'up'},
        {id: '102', name: 'Cashier Jane S.', riskScore: 96, trend: 'up'},
        {id: '103', name: 'Cashier Mike R.', riskScore: 85, trend: 'down'},
    ]);

    constructor() {
        // In a real application, you might fetch data here and use .set() on the signals.
        // For this mock service, we initialize the signals with static data.
    }
}
