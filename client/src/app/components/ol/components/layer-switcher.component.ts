import {ChangeDetectionStrategy} from "@angular/core";
import {Component, Input, OnInit} from "@angular/core";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {List} from "immutable";
import BaseLayer from "ol/layer/Base";
import {MapLayers} from "../layers/map-layers";

@Component({
  selector: "kpn-layer-switcher",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="switcher">
      <div *ngIf="open" (mouseleave)="closePanel()">
        <div *ngFor="let layer of namedLayers">
          <mat-checkbox
            (click)="$event.stopPropagation();"
            [checked]="isVisible(layer)"
            (change)="layerChanged(layer, $event)">
            {{layerName(layer)}}
          </mat-checkbox>
        </div>
      </div>
      <div *ngIf="!open" (mouseenter)="openPanel()" (mouseleave)="closePanel()">
        <img [src]="'/assets/images/layers.png'" alt="layers">
      </div>
    </div>
  `,
  styles: [`
    .switcher {
      position: absolute;
      top: 50px;
      right: 10px;
      z-index: 100;
      background-color: white;
      padding: 5px;
      border-color: lightgray;
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
    }
  `]
})
export class LayerSwitcherComponent implements OnInit {

  @Input() layers: List<BaseLayer>;
  @Input() mapLayers: MapLayers;

  namedLayers: List<BaseLayer>;

  open = false;

  ngOnInit() {
    if (this.mapLayers) {
      this.namedLayers = this.mapLayers.layers.map(ml => ml.layer).filter(layer => layer.get("name"));
    }
    if (this.layers) {
      this.namedLayers = this.layers.filter(layer => layer.get("name"));
    }
  }

  openPanel(): void {
    this.open = true;
  }

  closePanel(): void {
    this.open = false;
  }

  toggleOpen(): void {
    this.open = !this.open;
  }

  isVisible(layer: BaseLayer): boolean {
    return layer.getVisible();
  }

  layerChanged(layer: BaseLayer, event: MatCheckboxChange): void {
    layer.setVisible(event.checked);
  }

  layerName(layer: BaseLayer): string {
    return layer.get("name");
  }

}
