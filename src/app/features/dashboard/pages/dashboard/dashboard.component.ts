import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutiveDashboardComponent } from '../../components/executive-dashboard/executive-dashboard.component';
import { AnalyticsDashboardComponent } from '../../components/analytics-dashboard/analytics-dashboard.component';
import { RiskyStoresComponent } from '../../components/risky-stores/risky-stores.component';
import { RiskyCashiersComponent } from '../../components/risky-cashiers/risky-cashiers.component';
import { DrillDownViewComponent } from '../../components/drill-down-view/drill-down-view.component';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardSummary } from '../../models/dashboard-summary.model';
import { AnalyticsSummary } from '../../models/analytics-summary.model';
import { RiskyStore, RiskyCashier } from '../../models/risk-entity.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ExecutiveDashboardComponent,
    AnalyticsDashboardComponent,
    RiskyStoresComponent,
    RiskyCashiersComponent,
    DrillDownViewComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  executiveSummary$!: Observable<DashboardSummary>;
  analyticsSummary$!: Observable<AnalyticsSummary>;
  riskyStores$!: Observable<RiskyStore[]>;
  riskyCashiers$!: Observable<RiskyCashier[]>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.executiveSummary$ = this.dashboardService.getExecutiveSummary();
    this.analyticsSummary$ = this.dashboardService.getAnalyticsSummary();
    this.riskyStores$ = this.dashboardService.getRiskyStores();
    this.riskyCashiers$ = this.dashboardService.getRiskyCashiers();
  }
}
