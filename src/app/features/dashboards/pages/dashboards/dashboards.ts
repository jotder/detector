import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExecutiveDashboard} from '../../components/executive-dashboard/executive-dashboard';
import {AnalyticsDashboard} from '../../components/analytics-dashboard/analytics-dashboard';
import {RiskyStoresComponent} from '../../components/risky-stores/risky-stores';
import {RiskyCashiers} from '../../components/risky-cashiers/risky-cashiers';
import {DrillDownView} from '../../components/drill-down-view/drill-down-view';
import {DashboardService} from '../../services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    providers: [DashboardService],
    imports: [
        CommonModule,
        ExecutiveDashboard,
        AnalyticsDashboard,
        RiskyStoresComponent,
        RiskyCashiers,
        DrillDownView
    ],
    templateUrl: './dashboards.html',
    styleUrl: './dashboards.scss',
})
export class Dashboards {
    executiveSummary = this.dashboardService.executiveSummary;
    analyticsSummary = this.dashboardService.analyticsSummary;
    riskyStores = this.dashboardService.riskyStores;
    riskyCashiers = this.dashboardService.riskyCashiers;

    constructor(private dashboardService: DashboardService) {
    }
}
