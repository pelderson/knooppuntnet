import {ChangeDetectionStrategy} from "@angular/core";
import {Component, Input} from "@angular/core";
import {RouteInfoAnalysis} from "../../../kpn/api/common/route/route-info-analysis";

/* tslint:disable:template-i18n */
@Component({
  selector: "kpn-route-end-nodes",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p *ngIf="analysis.map.endNodes.isEmpty()">?</p>
    <p *ngFor="let node of analysis.map.endNodes">
      <kpn-route-node [node]="node" title="marker-icon-red-small.png"></kpn-route-node>
    </p>
    <p *ngFor="let node of analysis.map.endTentacleNodes">
      <kpn-route-node [node]="node" title="marker-icon-purple-small.png"></kpn-route-node>
    </p>
  `
})
export class RouteEndNodesComponent {
  @Input() analysis: RouteInfoAnalysis;
}
