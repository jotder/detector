import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { DashboardSummary } from '../models/dashboard-summary.model';
import { AnalyticsSummary } from '../models/analytics-summary.model';
import { RiskyStore, RiskyCashier } from '../models/risk-entity.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getExecutiveSummary(): Observable<DashboardSummary> {
    // Mock data
    return of({
      openAlertCount: 125,
      inProgressAlertCount: 42,
      closedAlertCount: 18934,
    });
  }

  getAnalyticsSummary(): Observable<AnalyticsSummary> {
    // Mock data
    return of({
      refunds: 1200,
      discounts: 540,
      priceOverrides: 320,
      cancels: 150,
    });
  }

  getRiskyStores(): Observable<RiskyStore[]> {
    // Mock data
    return of([
      { id: '1', name: 'Store A', riskScore: 95, trend: 'up' },
      { id: '2', name: 'Store B', riskScore: 92, trend: 'down' },
      { id: '3', name: 'Store C', riskScore: 88, trend: 'up' },
    ]);
  }

  getRiskyCashiers(): Observable<RiskyCashier[]> {
    // Mock data
    return of([
      { id: '101', name: 'Cashier John D.', riskScore: 98, trend: 'up' },
      { id: '102', name: 'Cashier Jane S.', riskScore: 96, trend: 'up' },
      { id: '103', name: 'Cashier Mike R.', riskScore: 85, trend: 'down' },
    ]);
  }
}
