import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {AppService} from "../../../app.service";
import {ApiResponse} from "../../../kpn/shared/api-response";
import {NetworkChangesPage} from "../../../kpn/shared/network/network-changes-page";
import {Subset} from "../../../kpn/shared/subset";
import {Country} from "../../../kpn/shared/country";
import {NetworkType} from "../../../kpn/shared/network-type";
import {PageService} from "../../../shared/page.service";

@Component({
  selector: 'kpn-network-changes-page',
  template: `
    <h1>
      Network changes
    </h1>
    <div *ngIf="response">
      <json [object]="response"></json>
    </div>
  `
})
export class NetworkChangesPageComponent implements OnInit, OnDestroy {

  subset: Subset;
  networkId: string;

  response: ApiResponse<NetworkChangesPage>;
  paramsSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private appService: AppService,
              private pageService: PageService) {
  }

  ngOnInit() {
    this.pageService.initNetworkPage();
    this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
      this.networkId = params['networkId'];
      this.pageService.networkId = this.networkId;

      this.appService.networkChanges(this.networkId).subscribe(response => {
        // TODO this.subset = response.result.network.attributes.country + networkType
        this.subset = new Subset(new Country("nl"), new NetworkType("rwn"));
        this.pageService.subset = this.subset;
        this.response = response;
      });
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}