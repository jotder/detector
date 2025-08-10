import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import * as G6 from '@antv/g6'; // correct for your code and avoids default export error
import cloneDeep from 'lodash.clonedeep';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartService } from '../../services/chart.service';
import { RouterModule } from '@angular/router';

type CallType = 'incoming' | 'outgoing' | 'international' | 'missed' | 'roaming';
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
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './analyze.html',
  styleUrls: ['./analyze.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Analyze implements OnInit, AfterViewInit {
  private chartService = inject(ChartService);

  @Input() operators: string[] = [];
  @Input() operatorColors: Record<string, string> = {};
  @Input() callTypeColors: Record<CallType, string> = {
    incoming: '#5B8FF9',
    outgoing: '#52c41a',
    international: '#faad14',
    missed: '#f5222d',
    roaming: '#722ed1',
  };
  @Input() hiddenOperators: Set<string> = new Set();
  @Input() hiddenCallTypes: Set<string> = new Set();
  @Input() nodes: any[] = [];
  @Input() edges: any[] = [];

  @Output() toggleOperator = new EventEmitter<string>();
  @Output() addGroup = new EventEmitter<{ group: string; nodes: any[] }>();

  graph: InstanceType<typeof G6.Graph> | null = null;

  //  Signals
  selectedChartType = signal<LayoutType>('force');
  zoomLevel = signal(1);
  searchNumber = signal('');
  showPopup = signal(false);
  popupData = signal<any>(null);
  popupPosition = signal({ x: 0, y: 0 });
  selectedNode = signal<any>(null);
  showNodeMenu = signal(false);
  categoryName = signal('');
  groups = signal<Record<string, any[]>>({});
  clickTimer: any = null;

  callTypes: CallType[] = ['incoming', 'outgoing', 'international', 'missed', 'roaming'];

  chartLayouts: { name: string; value: LayoutType; icon: string }[] = [
    { name: 'Force Directed', value: 'force', icon: '/assets/charts_logo/force.png' },
    { name: 'Arc Diagram', value: 'arc', icon: '/assets/charts_logo/arc.png' },
    { name: 'Chord Diagram', value: 'chord', icon: '/assets/charts_logo/chord.png' },
    { name: 'Radial Layout', value: 'radial', icon: '/assets/charts_logo/radial.png' },
    { name: 'Grid Layout', value: 'grid', icon: '/assets/charts_logo/grid.png' },
    { name: 'Concentric Layout', value: 'concentric', icon: '/assets/charts_logo/concentric.png' },
    { name: 'Fruchterman Layout', value: 'fruchterman', icon: '/assets/charts_logo/fruchterman.png' },
  ];

  objectKeys = Object.keys;

  ngOnInit(): void {
    this.chartService.getNodes().subscribe(nd => {
      this.nodes = nd;
      this.chartService.getEdges().subscribe(ed => {
        this.edges = ed;
        this.renderGraph(this.nodes, this.edges);
      });
    });
  }

  ngAfterViewInit(): void {
    this.chartService.getNodes().subscribe(nd => {
      this.nodes = nd;
      this.chartService.getEdges().subscribe(ed => {
        this.edges = ed;
        this.renderGraph(this.nodes, this.edges);
      });
    });

    window.addEventListener('resize', () => {
      const container = document.getElementById('graph-container');
      if (container && this.graph) {
        this.graph.changeSize(container.clientWidth, container.clientHeight);
        this.graph.fitView(20);
      }
    });
  }

  switchLayout(layout: LayoutType): void {
    this.selectedChartType.set(layout);
    this.onChartTypeChange();
  }

  onChartTypeChange(): void {
    if (this.nodes.length && this.edges.length) {
      this.renderGraph(this.nodes, this.edges);
    }
  }

  onSearch(): void {
    const query = this.searchNumber().trim();
    if (!query) {
      this.renderGraph(this.nodes, this.edges);
      return;
    }

    const matched = this.nodes.filter(
      n => n.label.includes(query) || n.id.endsWith(`-${query}`)
    );
    if (!matched.length) {
      this.graph?.clear();
      return;
    }

    const matchedIds = new Set<string>(matched.map(n => n.id));
    const visibleEdges = this.edges.filter(e => matchedIds.has(e.source) || matchedIds.has(e.target));
    const visibleNodeIds = new Set<string>();
    visibleEdges.forEach(e => {
      visibleNodeIds.add(e.source);
      visibleNodeIds.add(e.target);
    });

    const visibleNodes = this.nodes.filter(n => visibleNodeIds.has(n.id));
    this.renderGraph(visibleNodes, visibleEdges);
  }

  openMapForNumber(): void {
    const number = this.searchNumber().trim();
    if (!number) {
      alert('Please enter a number to view its location.');
      return;
    }
    window.open(`/map-view?number=${number}`, '_blank');
  }

  zoomIn(): void {
    if (this.graph && this.zoomLevel() < 5) {
      this.zoomLevel.set(this.zoomLevel() + 0.1);
      this.graph.zoomTo(this.zoomLevel());
    }
  }

  zoomOut(): void {
    if (this.graph && this.zoomLevel() > 0.2) {
      this.zoomLevel.set(this.zoomLevel() - 0.1);
      this.graph.zoomTo(this.zoomLevel());
    }
  }

  renderGraph(nodes: any[], edges: any[]): void {
    if (this.graph) {
      this.graph.destroy();
      this.graph = null;
    }
    const container = document.getElementById('graph-container');
    if (!container) {
      console.error('Graph container not found');
      return;
    }

    const width = container?.clientWidth ?? 800;
    const height = container?.clientHeight ?? 600;
    let layoutConfig: any = { type: 'force', preventOverlap: true };

    switch (this.selectedChartType()) {
      case 'arc':
        layoutConfig = { type: 'dagre', rankdir: 'LR', nodesep: 20, ranksep: 40, align: 'DL' };
        break;
      case 'chord':
        layoutConfig = { type: 'circular', center: [width / 2, height / 2], radius: Math.min(width, height) / 2.5 };
        break;
      case 'radial':
        layoutConfig = { type: 'radial', linkDistance: 150, unitRadius: 150, preventOverlap: true };
        break;
      case 'grid':
        layoutConfig = { type: 'grid', begin: [20, 20], preventOverlap: true };
        break;
      case 'concentric':
        layoutConfig = { type: 'concentric', preventOverlap: true };
        break;
      case 'fruchterman':
        layoutConfig = { type: 'fruchterman', gravity: 10, speed: 1, clustering: true, animate: true };
        break;
    }

    this.graph = new G6.Graph({
      container: 'graph-container',
      width,
      height,
      fitCenter: true,
      layout: layoutConfig,
      defaultNode: { labelCfg: { position: 'bottom', style: { fontSize: 10 } } },
      defaultEdge: {
        type: 'cubic-vertical',
        labelCfg: { autoRotate: true, style: { fontSize: 10 } },
        style: {
          stroke: '#ccc',
          lineWidth: 1.5,
          endArrow: true,
        },
      },

      plugins: [
        new G6.Tooltip({
          offsetX: 10,
          offsetY: 10,
// Removed misplaced chartLayouts definition

// In renderGraph(): inside new G6.Tooltip getContent
getContent: (e: any) => {
  const model = e?.item?.getModel?.();
  if (!model?.data) return '';

  if (e.item.getType?.() === 'edge') {
    const detailsHtml = model.data.details?.map((d: any) =>
      `<div><strong>${d.CALL_TYPE}</strong> – ${d.ACTUAL_USAGE}s<br/><span>${d.START_DATE}</span></div>`
    ).join('<hr/>') ?? '';
    return `
      <div style="padding:6px;font-size:12px;">
        <strong>Calls between:</strong><br/>${model.source} → ${model.target}<br/>
        <strong>Total Calls:</strong> ${model.data.count}<br/>
        <strong>Total Duration:</strong> ${model.data.duration}s<hr/>
        ${detailsHtml}
      </div>`;
  }

  if (e.item.getType?.() === 'node') {
    return `
      <div style="padding:8px;background:#1e212a;color:#fff;border-radius:6px;font-size:12px;border:1px solid #2c2f36;">
        <strong>User:</strong> ${model.label}<br/>
        <strong>Operator:</strong> ${model.data.operator || 'Unknown'}<br/>
        <strong>Incoming:</strong> ${model.data.incomingCount}<br/>
        <strong>Outgoing:</strong> ${model.data.outgoingCount}<br/>
        <strong>SMS:</strong> ${model.data.smsCount}<br/>
        <strong>Upload:</strong> ${model.data.upload} MB<br/>
        <strong>Download:</strong> ${model.data.download} MB
      </div>`;
  }
  return '';
}

        }),
      ],
      modes: { default: ['drag-node', 'zoom-canvas', 'drag-canvas'] },
    });

    this.graph.data({ nodes: cloneDeep(nodes), edges: cloneDeep(edges) });

    this.graph.once('afterlayout', () => {
      const bbox = this.graph!.getGroup().getCanvasBBox();
      const scale = Math.min(width / bbox.width, height / bbox.height) * 0.9;
      this.graph!.zoomTo(scale, { x: width / 2, y: height / 2 });
      this.graph!.fitCenter();
    });

    this.graph.render();
    this.graph.zoomTo(this.zoomLevel());

    this.graph.on('node:click', (evt: any) => {
      clearTimeout(this.clickTimer);
      this.clickTimer = setTimeout(() => this.onNodeSingleClick(evt), 250);
    });

    this.graph.on('node:dblclick', (evt: any) => {
      clearTimeout(this.clickTimer);
      this.onNodeDoubleClick(evt);
    });

    this.graph.on('edge:click', (evt: any) => {
      const m = evt.item.getModel();
      alert(`Total ${m.data.count} calls between ${m.source} and ${m.target}`);
    });
  }

  onNodeSingleClick(evt: any): void {
    this.selectedNode.set(evt.item.getModel());
    this.showNodeMenu.set(true);
  }

  onNodeDoubleClick(evt: any): void {
    const model = evt.item.getModel();
    const { clientX, clientY } = evt.originalEvent ?? { clientX: 100, clientY: 100 };
    this.popupData.set(model);
    this.popupPosition.set({ x: clientX + 10, y: clientY + 10 });
    this.showPopup.set(true);
  }

  closePopup(): void {
    this.showPopup.set(false);
    this.popupData.set(null);
  }

  closeNodeMenu(): void {
    this.showNodeMenu.set(false);
    this.selectedNode.set(null);
    this.categoryName.set('');
  }

  addToGroup(): void {
    const group = this.categoryName().trim();
    const node = this.selectedNode();
    if (!group || !node) return;

    const updated = { ...this.groups() };
    updated[group] ??= [];
    if (!updated[group].some(n => n.id === node.id)) updated[group].push(node);

    this.groups.set(updated);
    this.addGroup.emit({ group, nodes: updated[group].map(n => n.id) });
    this.categoryName.set('');
    this.showNodeMenu.set(false);
  }

  deleteNode(): void {
    const node = this.selectedNode();
    if (!node) return;

    this.nodes = this.nodes.filter(n => n.id !== node.id);
    this.edges = this.edges.filter(e => e.source !== node.id && e.target !== node.id);

    const updated = { ...this.groups() };
    for (const g in updated) {
      updated[g] = updated[g].filter(n => n.id !== node.id);
      if (!updated[g].length) delete updated[g];
    }
    this.groups.set(updated);

    this.showNodeMenu.set(false);
    this.renderGraph(this.nodes, this.edges);
  }

  onRemoveNodeFromGroup(event: { group: string; nodeId: string }): void {
    const updated = { ...this.groups() };
    if (updated[event.group]) {
      updated[event.group] = updated[event.group].filter(n => n.id !== event.nodeId);
      if (!updated[event.group].length) delete updated[event.group];
    }
    this.groups.set(updated);
  }
}
