import { computed, Injectable, signal } from '@angular/core';
import { Alert, AlertSeverity, AlertStatus } from '../models/alert.model';

const MOCK_ALERTS: Alert[] = [
    {
        id: 'a1',
        ruleId: 'rule-001',
        transactionId: 'txn-abc-123',
        timestamp: new Date('2024-07-20T10:00:00Z').toISOString(),
        severity: AlertSeverity.High,
        status: AlertStatus.Open,
        assigneeId: 'user-1',
    },
    {
        id: 'a2',
        ruleId: 'rule-002',
        transactionId: 'txn-def-456',
        timestamp: new Date('2024-07-20T11:30:00Z').toISOString(),
        severity: AlertSeverity.Medium,
        status: AlertStatus.InProgress,
        assigneeId: 'user-2',
    },
    {
        id: 'a3',
        ruleId: 'rule-001',
        transactionId: 'txn-ghi-789',
        timestamp: new Date('2024-07-19T15:00:00Z').toISOString(),
        severity: AlertSeverity.Low,
        status: AlertStatus.Closed,
    },
    {
        id: 'a4',
        ruleId: 'rule-003',
        transactionId: 'txn-jkl-012',
        timestamp: new Date('2024-07-21T09:00:00Z').toISOString(),
        severity: AlertSeverity.High,
        status: AlertStatus.Open,
    },
];

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private readonly _alerts = signal<Alert[]>(MOCK_ALERTS);
    private readonly _searchTerm = signal<string>('');

    public readonly alerts = computed(() => {
        const term = this._searchTerm().toLowerCase();
        if (!term) {
            return this._alerts();
        }
        return this._alerts().filter(
            (alert) =>
                alert.transactionId.toLowerCase().includes(term) ||
                alert.ruleId.toLowerCase().includes(term) ||
                alert.id.toLowerCase().includes(term)
        );
    });

    public readonly getAlertById = (id: string) =>
        computed(() => this._alerts().find((alert) => alert.id === id));

    public setSearchTerm(term: string): void {
        this._searchTerm.set(term);
    }

    public addAlert(alertData: Omit<Alert, 'id' | 'timestamp'>): void {
        const newAlert: Alert = {
            ...alertData,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
        };
        this._alerts.update((alerts) => [...alerts, newAlert]);
    }

    public updateAlert(updatedAlert: Alert): void {
        this._alerts.update((alerts) =>
            alerts.map((alert) => (alert.id === updatedAlert.id ? updatedAlert : alert))
        );
    }

    public deleteAlert(id: string): void {
        this._alerts.update((alerts) => alerts.filter((alert) => alert.id !== id));
    }
}