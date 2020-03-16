import {Input} from "@angular/core";
import {Component} from "@angular/core";
import {List} from "immutable";
import {Location} from "../../../kpn/api/common/location/location";

@Component({
  selector: "kpn-node-location",
  template: `
    <p *ngIf="location.names.isEmpty()" i18n="@@node.location.none">None</p>
    <div class="kpn-comma-list">
      <span *ngFor="let name of locationNames()">{{name}}</span>
    </div>
  `
})
export class NodeLocationComponent {

  @Input() location: Location;

  locationNames(): List<string> {
    if (this.location) {
      const country = this.location.names.get(0).toUpperCase();
      const names = this.location.names.set(0, country);
      return names.reverse();
    }
    return List();
  }
}