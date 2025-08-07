import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExecutiveDashboard} from '../../components/executive-dashboard/executive-dashboard';
import {AnalyticsDashboard} from '../../components/analytics-dashboard/analytics-dashboard';
import {RiskyStoresComponent} from '../../components/risky-stores/risky-stores';
import {RiskyCashiers} from '../../components/risky-cashiers/risky-cashiers';
import {DrillDownView} from '../../components/drill-down-view/drill-down-view';
import {DashboardService} from '../../services/dashboard.service';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    providers: [DashboardService],
    imports: [
        CommonModule,
        RouterOutlet,
    ],
    templateUrl: './dashboards.html',
    styles: `
    `,
})
export class Dashboards {
    private dashboardService = inject(DashboardService);
    executiveSummary = this.dashboardService.executiveSummary;
    analyticsSummary = this.dashboardService.analyticsSummary;
    riskyStores = this.dashboardService.riskyStores;
    riskyCashiers = this.dashboardService.riskyCashiers;
}
