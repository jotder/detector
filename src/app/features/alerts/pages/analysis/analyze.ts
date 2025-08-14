import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Graph } from '@antv/g6';
import { ChartService } from '../../services/chart.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

// Define supported layout types
type LayoutType =
  | 'force'
  | 'arc'
  | 'chord'
  | 'radial'
  | 'grid'
  | 'concentric'
  | 'fruchterman';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analyze.html',
  styleUrls: ['./analyze.scss'],
})
export class Analyze implements OnInit, AfterViewInit {
  private chartService = inject(ChartService);
  title = 'Use G6 in Angular';

  @ViewChild('container') container!: ElementRef;

  private nodes: any[] = [];
  private edges: any[] = [];
  graph: Graph | null = null;
  selectedChartType: LayoutType = 'force';

  // Layouts with icon buttons
  chartLayouts: { name: string; value: LayoutType; icon: string }[] = [
    {
      name: 'Force Directed',
      value: 'force',
      icon: 'assets/charts_logo/force.png',
    },
    {
      name: 'Arc Diagram',
      value: 'arc',
      icon: 'assets/charts_logo/arc.png',
    },
    {
      name: 'Chord Diagram',
      value: 'chord',
      icon: 'assets/charts_logo/chord.png',
    },
    {
      name: 'Radial Layout',
      value: 'radial',
      icon: 'assets/charts_logo/radial.png',
    },
    {
      name: 'Grid Layout',
      value: 'grid',
      icon: 'assets/charts_logo/grid.png',
    },
    {
      name: 'Concentric Layout',
      value: 'concentric',
      icon: 'assets/charts_logo/concentric.png',
    },
    {
      name: 'Fruchterman Layout',
      value: 'fruchterman',
      icon: 'assets/charts_logo/fruchterman.png',
    },
  ];

  ngOnInit(): void {
    this.chartService
      .getNodes()
      .pipe(
        switchMap((nodesData) => {
          this.nodes = nodesData;
          return this.chartService.getEdges();
        })
      )
      .subscribe((edgesData) => {
        this.edges = edgesData;
        this.renderGraph();
      });
  }

  ngAfterViewInit(): void {
    // Not used in this case, but available if needed
  }

  // Called by layout icon buttons
  switchLayout(layoutType: LayoutType): void {
    this.selectedChartType = layoutType;
    this.renderGraph();
  }

  // Determines the layout config based on selected layout
  private getLayout(width: number, height: number): any {
    switch (this.selectedChartType) {
      case 'arc':
        return {
          type: 'dagre', // placeholder for arc-style layout
          rankdir: 'LR',
          nodesep: 20,
          ranksep: 40,
          align: 'DL',
        };
      case 'chord':
        return {
          type: 'circular',
          center: [width / 2, height / 2],
          radius: Math.min(width, height) / 2.5,
        };
      case 'radial':
        return {
          type: 'radial',
          linkDistance: 150,
          unitRadius: 150,
          preventOverlap: true,
        };
      case 'grid':
        return {
          type: 'grid',
          begin: [20, 20],
          preventOverlap: true,
        };
      case 'concentric':
        return {
          type: 'concentric',
          preventOverlap: true,
        };
      case 'fruchterman':
        return {
          type: 'fruchterman',
          gravity: 10,
          speed: 1,
          clustering: true,
          animate: true,
        };
      default:
        return {
          type: 'force',
          preventOverlap: true,
        };
    }
  }

  // Renders the graph
  private renderGraph(): void {
    if (!this.container?.nativeElement) return;

    // Destroy existing graph to avoid memory leak
    if (this.graph) {
      this.graph.destroy();
    }

    const width = this.container.nativeElement.clientWidth || 800;
    const height = this.container.nativeElement.clientHeight || 600;
    const layout = this.getLayout(width, height);

    this.graph = new Graph({
      container: this.container.nativeElement,
      width,
      height,
      layout,
      data: {
        nodes: this.nodes.map((node: any) => ({
          id: node.id,
          label: node.label,
          x: node.x,
          y: node.y,
        })),
        edges: this.edges.map((edge: any) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        })),
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    });

    this.graph.render();
    this.graph.fitView();
  }
}
