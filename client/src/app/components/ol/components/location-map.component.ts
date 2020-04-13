import {ChangeDetectionStrategy} from "@angular/core";
import {Input} from "@angular/core";
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {List} from "immutable";
import {Collection} from "ol";
import {boundingExtent} from "ol/extent";
import BaseLayer from "ol/layer/Base";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import VectorTileLayer from "ol/layer/VectorTile";
import Map from "ol/Map";
import {fromLonLat} from "ol/proj";
import {StyleFunction} from "ol/style/Style";
import View from "ol/View";
import {I18nService} from "../../../i18n/i18n.service";
import {Bounds} from "../../../kpn/api/common/bounds";
import {NetworkType} from "../../../kpn/api/custom/network-type";
import {Subscriptions} from "../../../util/Subscriptions";
import {PageService} from "../../shared/page.service";
import {ZoomLevel} from "../domain/zoom-level";
import {MapControls} from "../layers/map-controls";
import {NetworkBitmapTileLayer} from "../layers/network-bitmap-tile-layer";
import {NetworkVectorTileLayer} from "../layers/network-vector-tile-layer";
import {MapClickService} from "../services/map-click.service";
import {MapLayerService} from "../services/map-layer.service";
import {MapService} from "../services/map.service";
import {MainMapStyle} from "../style/main-map-style";

@Component({
  selector: "kpn-location-map",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div id="location-map" class="kpn-map">
      <kpn-layer-switcher [layers]="layers"></kpn-layer-switcher>
    </div>
  `
})
export class LocationMapComponent {

  @Input() networkType: NetworkType;
  @Input() bounds: Bounds;
  @Input() geoJson: string;

  map: Map;
  mainMapStyle: StyleFunction;

  layers: List<BaseLayer> = List();
  bitmapTileLayer: TileLayer;
  vectorTileLayer: VectorTileLayer;

  private readonly subscriptions = new Subscriptions();

  constructor(private activatedRoute: ActivatedRoute,
              private pageService: PageService,
              private mapService: MapService,
              private mapClickService: MapClickService,
              private mapLayerService: MapLayerService,
              private i18nService: I18nService) {
    this.pageService.showFooter = false;
  }

  ngOnInit(): void {

    console.log("LocationMapComponent.ngOnInit()");

    this.layers = this.buildLayers();
    this.subscriptions.add(this.pageService.sidebarOpen.subscribe(state => {
      if (this.map) {
        setTimeout(() => {
          this.map.updateSize();
        }, 250);
      }
    }));
  }

  ngAfterViewInit(): void {

    console.log("LocationMapComponent.ngAfterViewInit()");

    this.map = new Map({
      target: "location-map",
      layers: this.layers.toArray(),
      controls: MapControls.build(),
      view: new View({
        minZoom: ZoomLevel.minZoom,
        maxZoom: ZoomLevel.vectorTileMaxOverZoom
      })
    });
    // const group = new LayerGroup({
    //   layers: this.layers.toArray()
    // });
    // this.map.setLayerGroup(group);


    this.mainMapStyle = new MainMapStyle(this.map, this.mapService).styleFunction();

    const view = this.map.getView();

    view.on("change:resolution", () => this.zoom(view.getZoom()));

    this.vectorTileLayer.setStyle(this.mainMapStyle);
    this.updateLayerVisibility(view.getZoom());

    const southWest = fromLonLat([this.bounds.minLon, this.bounds.minLat]);
    const northEast = fromLonLat([this.bounds.maxLon, this.bounds.maxLat]);
    this.map.getView().fit(boundingExtent([southWest, northEast]));

    this.mapClickService.installOn(this.map);
  }

  ngOnDestroy(): void {
    this.pageService.showFooter = true;
    this.subscriptions.unsubscribe();
  }

  private zoom(zoomLevel: number) {
    this.updateLayerVisibility(zoomLevel);
    return true;
  }

  private updateLayerVisibility(zoomLevel: number) {
    const zoom = Math.round(zoomLevel);
    if (zoom <= ZoomLevel.bitmapTileMaxZoom) {
      this.bitmapTileLayer.setVisible(true);
      this.vectorTileLayer.setVisible(false);
    } else if (zoom >= ZoomLevel.vectorTileMinZoom) {
      this.bitmapTileLayer.setVisible(false);
      this.vectorTileLayer.setVisible(true);
    }
  }

  private buildLayers(): List<BaseLayer> {

    this.bitmapTileLayer = NetworkBitmapTileLayer.build(this.networkType);
    this.vectorTileLayer = NetworkVectorTileLayer.oldBuild(this.networkType);

    const layerGroup = new LayerGroup();
    layerGroup.setLayers(new Collection([this.bitmapTileLayer, this.vectorTileLayer]));
    const layerGroupName = this.i18nService.translation("@@map.layer.nodes-and-routes");
    layerGroup.set("name", layerGroupName);

    const layerArray: Array<BaseLayer> = [];
    layerArray.push(this.mapLayerService.osmLayer().layer);
    layerArray.push(layerGroup);
    layerArray.push(this.mapLayerService.locationBoundaryLayer(this.geoJson).layer);
    return List(layerArray);
  }
}