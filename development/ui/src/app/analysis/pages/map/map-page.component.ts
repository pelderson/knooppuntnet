import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {SelectedFeature} from "../../../map/domain/selected-feature";
import {NetworkType} from "../../../kpn/shared/network-type";

@Component({
  selector: 'kpn-map-page',
  template: `
    <kpn-page [withoutMargin]="true">
      <kpn-toolbar toolbar></kpn-toolbar>
      <kpn-map-detail sidenav [selectedFeature]="selectedFeature" [networkType]="networkType"></kpn-map-detail>
      <kpn-map
        content
        id="main-map"
        class="map"
        networkType="{{networkType}}"
        (featureSelection)="featureSelectionChanged($event)">
      </kpn-map>
    </kpn-page>
  `,
  styles: [`
    .map {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `]
})
export class MapPageComponent implements OnInit, OnDestroy {

  networkType: NetworkType;
  selectedFeature: SelectedFeature;
  paramsSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramsSubscription = this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
      const networkTypeName = params['networkType'];
      this.networkType = new NetworkType(networkTypeName);
    });
  }

  featureSelectionChanged(selectedFeature: SelectedFeature) {
    this.selectedFeature = selectedFeature;
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}