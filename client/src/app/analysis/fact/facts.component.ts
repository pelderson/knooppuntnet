import {ChangeDetectionStrategy} from "@angular/core";
import {Component, Input} from "@angular/core";
import {List} from "immutable";
import {FactInfo} from "./fact-info";
import {FactLevel} from "./fact-level";
import {Facts} from "./facts";

@Component({
  selector: "kpn-facts",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <div *ngIf="filteredFactInfos.isEmpty()" i18n="@@facts.none">
      None
    </div>

    <div *ngFor="let factInfo of filteredFactInfos" class="fact">
      <div>
        <kpn-fact-level [factLevel]="factLevel(factInfo)" class="level"></kpn-fact-level>
        <kpn-fact-name [factName]="factInfo.fact.name"></kpn-fact-name>
        <div *ngIf="factInfo.networkRef" class="reference">
          <kpn-brackets>
            <a class="text" [routerLink]="'/analysis/network/' + factInfo.networkRef.id">{{factInfo.networkRef.name}}</a>
          </kpn-brackets>
        </div>
        <div *ngIf="factInfo.routeRef" class="reference">
          <kpn-brackets>
            <a class="text" [routerLink]="'/analysis/route/' + factInfo.routeRef.id">{{factInfo.routeRef.name}}</a>
          </kpn-brackets>
        </div>
        <div *ngIf="factInfo.nodeRef" class="reference">
          <kpn-brackets>
            <kpn-link-node [nodeId]="factInfo.nodeRef.id" [nodeName]="factInfo.nodeRef.name"></kpn-link-node>
          </kpn-brackets>
        </div>
      </div>
      <div class="description">
        <kpn-fact-description [factName]="factInfo.fact.name"></kpn-fact-description>
      </div>
    </div>
  `,
  styles: [`

    .fact {
      margin-top: 15px;
    }

    .level {
      display: inline-block;
      width: 25px; /* level-width */
    }

    .description {
      display: inline-block;
      padding-left: 25px; /* level-width */
      padding-bottom: 10px;
      font-style: italic;
      max-width: 60em;
    }

    .reference {
      display: inline-block;
      padding-left: 20px;
    }

  `]
})
export class FactsComponent {

  @Input() factInfos: List<FactInfo>;

  get filteredFactInfos(): List<FactInfo> {
    return this.factInfos.filterNot(factInfo => factInfo.fact.name === "RouteBroken");
  }

  factLevel(factInfo: FactInfo): FactLevel {
    return Facts.factLevels.get(factInfo.fact.name);
  }

}
