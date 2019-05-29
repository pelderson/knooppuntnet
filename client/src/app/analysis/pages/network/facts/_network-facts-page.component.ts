import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../../app.service";
import {PageService} from "../../../../components/shared/page.service";
import {ApiResponse} from "../../../../kpn/shared/api-response";
import {Country} from "../../../../kpn/shared/country";
import {NetworkType} from "../../../../kpn/shared/network-type";
import {NetworkFactsPage} from "../../../../kpn/shared/network/network-facts-page";
import {Subset} from "../../../../kpn/shared/subset";
import {NetworkCacheService} from "../../../../services/network-cache.service";
import {Subscriptions} from "../../../../util/Subscriptions";

@Component({
  selector: "kpn-network-facts-page",
  template: `
    <kpn-network-page-header [networkId]="networkId" selectedPage="facts"></kpn-network-page-header>

    <div *ngIf="response">
      <json [object]="response"></json>
    </div>
  `
})
export class NetworkFactsPageComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscriptions();

  subset: Subset;
  networkId: string;

  response: ApiResponse<NetworkFactsPage>;

  constructor(private activatedRoute: ActivatedRoute,
              private appService: AppService,
              private pageService: PageService,
              private networkCacheService: NetworkCacheService) {
  }

  ngOnInit() {
    this.networkCacheService.updatePageTitle("facts", this.networkId);
    this.pageService.initNetworkPage();
    this.subscriptions.add(this.activatedRoute.params.subscribe(params => {
      this.networkId = params["networkId"];
      this.pageService.networkId = this.networkId;
      // TODO this.subset = response.result.network.attributes.country + networkType
      this.subset = new Subset(new Country("nl"), new NetworkType("rwn", "hiking"));
      this.pageService.subset = this.subset;
      this.subscriptions.add(this.appService.networkFacts(this.networkId).subscribe(response => {
        this.networkCacheService.setNetworkName(this.networkId, response.result.networkSummary.name);
        this.networkCacheService.setNetworkSummary(this.networkId, response.result.networkSummary);
        this.networkCacheService.updatePageTitle("facts", this.networkId);
        this.response = response;
      }));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}