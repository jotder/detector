import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  OnInit,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { findShortestPath } from '@antv/algorithm';
import {
  Graph,
  BaseLayout,
  BaseEdge,
  ExtensionCategory,
  register,
  GraphEvent,
  Tooltip,
  iconfont,
  PathArray,
  BaseEdgeStyleProps,
} from '@antv/g6';
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

class ArcLayout extends BaseLayout {
  public id = 'arc';
  async execute(data: any, options: any) {
    const { nodeSep = 20, nodeSize } = { ...this.options, ...options };
    const { nodes } = data;
    return {
      nodes: nodes.map((node: any, index: number) => ({
        id: node.id,
        style: {
          x: index * (nodeSep + nodeSize),
          y: 0,
        },
      })),
    };
  }
}

class ArcEdge extends BaseEdge {
  getKeyPath(attributes: Required<BaseEdgeStyleProps>): PathArray {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    const [sx, sy] = sourcePoint;
    const [tx] = targetPoint;
    const r = Math.abs(tx - sx) / 2;

    return [
      ['M', sx, sy],
      ['A', r, r, 0, 0, sx < tx ? 1 : 0, tx, sy],
    ];
  }
}

register(ExtensionCategory.LAYOUT, 'arc', ArcLayout);
register(ExtensionCategory.EDGE, 'arc', ArcEdge);

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analyze.html',
  styleUrls: ['./analyze.scss'],
})
export class Analyze implements OnInit, AfterViewInit {
  private chartService = inject(ChartService);
  private zone = inject(NgZone);
  title = 'Use G6 in Angular';

  @ViewChild('container') container!: ElementRef;
  selectedNodes: string[] = [];

  private nodes: any[] = [];
  private edges: any[] = [];
  graph: Graph | null = null;
  selectedChartType: LayoutType = 'force';

  // --- State for shortest path feature ---
  isShortestPathActive = false;
  sourceNode: any = null;
  targetNode: any = null;

  private fisheyePluginConfig = {
    key: 'fisheye-plugin', // Added key
    type: 'fisheye',
    enable: false, // Disabled by default
    r: 80,
    d: 2,
    style: {
      fill: '#2f54eb',
      fillOpacity: 0.2,
      stroke: '#1d39c4',
      strokeOpacity: 0.8,
      lineWidth: 1.5,
      shadowColor: '#1d39c4',
      shadowBlur: 10,
      cursor: 'pointer',
    },
    // ... (rest of fisheye config is the same)
  };

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
          type: 'arc',
          nodeSize: 20,
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
  private getEdgeType(): string {
    switch (this.selectedChartType) {
      case 'arc':
        return 'arc';
      case 'chord':
      case 'radial':
        return 'quadratic';
      case 'concentric':
        return 'polyline';
      case 'fruchterman':
        return 'cubic-vertical';
      case 'grid':
      case 'force':
      default:
        return 'cubic-vertical';
    }
  }

  private renderGraph(): void {
    if (!this.container?.nativeElement) return;

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
          label: node.label,   // ✅ keep label here
          data: {
            operator: node.data?.operator,
            outgoingCount: node.data?.outgoingCount,
            incomingCount: node.data?.incomingCount,
            smsCount: node.data?.smsCount,
            upload: node.data?.upload,
            download: node.data?.download,
          }
        })),



        edges: this.edges
          .filter((edge: any) => edge.source !== edge.target)
          .map((edge: any) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            style: { endArrow: true },
            type: this.getEdgeType(),
          })),
      },
      node: {
        style: {
          size: 20,
          fill: '#1890ff',   // default light blue
          stroke: '#40a9ff', // default border
        },
        state: {
          highlight: {
            fill: '#1890ff',      // strong blue
            stroke: '#000000',    // black border
            lineWidth: 2,
          },
          inactive: {
            fill: '#d6e4ff',      // pale blue
            stroke: '#d6e4ff',
            fillOpacity: 0.4,
            strokeOpacity: 0.4,
          },
        },
      },
      edge: {
        style: {
          stroke: '#82919e', // default light blue
          lineWidth: 1,
        },
        state: {
          highlight: {
            stroke: '#000000', // black
            lineWidth: 2,
          },
          inactive: {
            stroke: '#d6e4ff', // faded blue
            strokeOpacity: 0.3,
          },
        },
      },

      behaviors: [
        // 'drag-canvas', // This will be controlled by a button
        'zoom-canvas',
        {
          key: 'drag-node',
          type: 'drag-node',
        },
        {
          key: 'drag-element',
          type: 'drag-element',
        },
        {
          key: 'drag-canvas-behavior',
          type: 'drag-canvas',
          enable: false, // Disabled by default
        },
        {
          key: 'lasso-select',
          type: 'lasso-select',
          trigger: 'drag',
          selectedState: 'selected',
          mode: 'union',
          enable: false, // Disabled by default
          style: {
            lineWidth: 2,
            stroke: '#ff4d4f',
            fill: '#ffccc7',
            fillOpacity: 0.25,
          },
        },
        {
          key: 'click-select-path',
          type: 'click-select',
          enable: false,
          multiple: true,
          state: 'selected',
          onClick: (evt: any) => {
            if (!this.isShortestPathActive) return;

            const nodeId = evt.target.id;
            if (!nodeId) return;

            const nodeData = this.graph!.getNodeData(nodeId);
            if (!nodeData) return;

            // 👇 Force Angular to detect changes
            this.zone.run(() => {
              if (!this.sourceNode) {
                this.sourceNode = nodeData;
              } else if (!this.targetNode && nodeId !== this.sourceNode.id) {
                this.targetNode = nodeData;
              } else {
                // Clear selections and start over
                this.graph!.setElementState({
                  [this.sourceNode.id]: { selected: false },
                  ...(this.targetNode && { [this.targetNode.id]: { selected: false } }),
                });
                this.sourceNode = nodeData;
                this.targetNode = null;
                this.graph!.setElementState(nodeId, 'selected', true);
              }
            });
          },
        },{
          key: 'hover-activate',
          type: 'hover-activate',
          enable: false,  // default off
          degree: 1,      // highlight neighbors
          state: 'highlight',
          inactiveState: 'dim',
          onHover: (event: any) => {
            event.view.setCursor('pointer');
          },
          onHoverEnd: (event: any) => {
            event.view.setCursor('default');
          },
        },

      ],

      // ✅ Plugins array with toolbar + tooltip
      plugins: [
        {
          type: 'toolbar',
          getItems: () => [
            { id: 'zoom-in', value: 'zoom-in' },
            { id: 'zoom-out', value: 'zoom-out' },
            { id: 'auto-fit', value: 'auto-fit' },
          ],
          onClick: (value: string) => {
            if (value === 'zoom-in') {
              this.graph?.zoomBy(1.1);
            } else if (value === 'zoom-out') {
              this.graph?.zoomBy(0.9);
            } else if (value === 'auto-fit') {
              this.graph?.fitView();
            }
          },
        },
        {
          type: 'tooltip',
          itemTypes: ['node', 'edge'],
          trigger: 'hover',
          offset: [12, 12],
          getContent: (evt: any) => {
            const target: any = evt?.target;
            if (!target) return '<div>No data</div>';

            const id = target?.id;
            const type = evt?.targetType;
            let model: any;

            if (type === 'node') {
              model = this.graph?.getNodeData(id);
            } else if (type === 'edge') {
              model = this.graph?.getEdgeData(id);
            }

            if (!model) return '<div>No data</div>';

            if (type === 'node') {
              const d = model.data || model;
              return `
                <div style="padding:8px;background:#fff;border:1px solid #ccc;font-size:12px;">
                  <strong>${model.label ?? ''}</strong><br/>
                  <b>Operator:</b> ${d.operator ?? '-'}<br/>
                  <b>Outgoing:</b> ${d.outgoingCount ?? 0}<br/>
                  <b>Incoming:</b> ${d.incomingCount ?? 0}<br/>
                  <b>SMS:</b> ${d.smsCount ?? 0}<br/>
                  <b>Upload:</b> ${d.upload ?? 0}<br/>
                  <b>Download:</b> ${d.download ?? 0}
                </div>
              `;
            }

            if (type === 'edge') {
              const d = model.data || {};
              return `
                <div style="padding:8px;background:#fff;border:1px solid #ccc;font-size:12px;">
                  <b>Source:</b> ${model.source}<br/>
                  <b>Target:</b> ${model.target}<br/>
                  <b>Count:</b> ${d.count ?? 0}
                </div>
              `;
            }

            return '<div>No data</div>';
          },
        },
        // The fisheye plugin will be added dynamically
      ],
    });

    this.graph.render();
    this.graph.fitView();
  }

  activeTool: 'lasso' | 'fisheye' | 'drag-canvas' | 'hover-activate' | null = null;

  toggleTool(tool: 'lasso' | 'fisheye' | 'drag-canvas' | 'hover-activate'): void {
    if (!this.graph) return;

    const turningOff = this.activeTool === tool;

    if (this.activeTool) {
      this.setToolState(this.activeTool, false);
    }

    if (!turningOff) {
      this.activeTool = tool;
      this.setToolState(tool, true);
    } else {
      this.activeTool = null;
    }
  }

  private setToolState(
    tool: 'lasso' | 'fisheye' | 'drag-canvas' | 'hover-activate',
    enable: boolean
  ): void {
    if (!this.graph) return;

    switch (tool) {
      case 'lasso':
        this.graph.updateBehavior({ key: 'lasso-select', enable });
        break;
      case 'drag-canvas':
        this.graph.updateBehavior({ key: 'drag-canvas-behavior', enable });
        break;
      case 'fisheye':
        if (enable) {
          this.graph.setPlugins((prevPlugins) => [
            ...prevPlugins,
            { ...this.fisheyePluginConfig, enable: true },
          ]);
        } else {
          this.graph.setPlugins((prevPlugins) =>
            prevPlugins.filter((p: any) => p.key !== 'fisheye-plugin')
          );
        }
        break;
      case 'hover-activate':
        this.graph.updateBehavior({ key: 'hover-activate', enable });
        break;
    }
  }


  toggleShortestPathMode(): void {
    if (!this.graph) return;
    this.isShortestPathActive = !this.isShortestPathActive;

    if (this.isShortestPathActive && this.activeTool) {
      this.setToolState(this.activeTool, false);
      this.activeTool = null;
    }

    this.graph.updateBehavior({
      key: 'click-select-path',
      enable: this.isShortestPathActive,
    });

    // Toggle drag behaviors to prevent conflict
    this.graph.updateBehavior({
      key: 'drag-element',
      enable: !this.isShortestPathActive,
    });
    this.graph.updateBehavior({
      key: 'drag-node',
      enable: !this.isShortestPathActive,
    });

    if (!this.isShortestPathActive) {
      this.resetPath();
    }
  }

  resetPath(): void {
    if (!this.graph) return;
    this.sourceNode = null;
    this.targetNode = null;

    // ✅ Reset node states
    const nodeStates: Record<string, any> = {};
    this.graph.getNodeData().forEach((node: any) => {
      nodeStates[node.id] = {
        highlight: false,
        inactive: false,
        selected: false,
      };
    });
    this.graph.setElementState(nodeStates);

    // ✅ Reset edge states
    const edgeStates: Record<string, any> = {};
    this.graph.getEdgeData().forEach((edge: any) => {
      edgeStates[edge.id] = {
        highlight: false,
        inactive: false,
      };
    });
    this.graph.setElementState(edgeStates);
  }

  findAndShowShortestPath(): void {
    if (!this.graph || !this.sourceNode || !this.targetNode) return;

    console.log('Source:', this.sourceNode.id, 'Target:', this.targetNode.id);

    const graphData = {
      nodes: this.graph.getNodeData().map((n) => ({ id: n.id as string })),
      edges: this.graph.getEdgeData().map((e) => ({
        id: e.id as string,
        source: e.source as string,
        target: e.target as string,
      })),
    };

    const { length, path } = findShortestPath(
      graphData,
      this.sourceNode.id,
      this.targetNode.id
    );

    console.log('Shortest Path Result:', { length, path });

    if (length === Infinity || !path?.length) {
      alert('No path found between the selected nodes.');
      return;
    }

    const states: Record<string, string> = {};

    // ✅ Nodes
    graphData.nodes.forEach(({ id }) => {
      if (path.includes(id)) states[id] = 'highlight';
      else states[id] = 'inactive';
    });

    // ✅ Edges
    graphData.edges.forEach(({ id, source, target }) => {
      const sourceIndex = path.indexOf(source);
      const targetIndex = path.indexOf(target);
      if (sourceIndex === -1 || targetIndex === -1) return;
      if (Math.abs(sourceIndex - targetIndex) === 1) {
        states[id] = 'highlight';
      } else {
        states[id] = 'inactive';
      }
    });

    this.graph.setElementState(states);
    this.graph.frontElement(path);
  }



}
