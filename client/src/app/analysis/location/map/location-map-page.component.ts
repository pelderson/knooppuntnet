import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {flatMap} from "rxjs/operators";
import {tap} from "rxjs/operators";
import {map} from "rxjs/operators";
import {AppService} from "../../../app.service";
import {LocationMapPage} from "../../../kpn/api/common/location/location-map-page";
import {ApiResponse} from "../../../kpn/api/custom/api-response";
import {LocationKey} from "../../../kpn/api/custom/location-key";
import {NetworkType} from "../../../kpn/api/custom/network-type";
import {Countries} from "../../../kpn/common/countries";
import {Subscriptions} from "../../../util/Subscriptions";
import {LocationParams} from "../components/location-params";
import {LocationService} from "../location.service";

/* tslint:disable:template-i18n work-in-progress */
@Component({
  selector: "kpn-location-map-page",
  template: `
    <kpn-location-page-header
      [locationKey]="locationKey"
      pageTitle="Map"
      i18n-pageTitle="@@location-map.title">
    </kpn-location-page-header>

    MAP

  `
})
export class LocationMapPageComponent {

  locationKey: LocationKey;
  response: ApiResponse<LocationMapPage>;
  private readonly subscriptions = new Subscriptions();

  constructor(private activatedRoute: ActivatedRoute,
              private locationService: LocationService,
              private appService: AppService) {
    this.subscriptions.add(
      this.activatedRoute.params.pipe(
        map(params => LocationParams.toKey(params)),
        tap(locationKey => this.locationKey = locationKey),
        flatMap(locationKey => this.appService.locationMap(locationKey))
      ).subscribe(response => {
        this.response = response;
        this.locationService.setSummary(this.locationKey.name, this.response.result.summary);
      })
    );
  }

}
