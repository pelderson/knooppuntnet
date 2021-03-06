import {Injectable} from "@angular/core";
import BaseLayer from "ol/layer/Base";
import Map from "ol/Map";
import {StyleFunction} from "ol/style/Style";
import {PoiService} from "../../../services/poi.service";
import {ZoomLevel} from "../domain/zoom-level";
import {MapLayer} from "../layers/map-layer";
import {PoiStyleMap} from "../style/poi-style-map";
import {MapLayerService} from "./map-layer.service";

@Injectable()
export class PoiTileLayerService {

  poiStyleMap: PoiStyleMap;

  constructor(private mapLayerService: MapLayerService,
              private poiService: PoiService) {
    poiService.poiConfiguration.subscribe(configuration => {
      if (configuration !== null) {
        this.poiStyleMap = new PoiStyleMap(configuration);
      }
    });
  }

  public buildLayer(): MapLayer {
    const layer = this.mapLayerService.poiTileLayer();
    layer.setStyle(this.poiStyleFunction());
    this.poiService.changed.subscribe(() => layer.changed());
    layer.setVisible(false);
    return new MapLayer(layer, this.applyMap(layer));
  }

  private applyMap(layer: BaseLayer) {
    return (map: Map) => {
      map.getView().on("change:resolution", () => this.zoom(layer, map.getView().getZoom()));
      this.updateLayerVisibility(layer, map.getView().getZoom());
    };
  }

  private zoom(layer: BaseLayer, zoomLevel: number) {
    this.poiService.updateZoomLevel(zoomLevel);
    this.updateLayerVisibility(layer, zoomLevel);
    return true;
  }

  private updateLayerVisibility(layer: BaseLayer, zoomLevel: number) {
    const zoom = Math.round(zoomLevel);
    layer.setVisible(zoom >= ZoomLevel.poiTileMinZoom);
  }


  private poiStyleFunction(): StyleFunction {
    return (feature, resolution) => {
      if (this.poiStyleMap) {
        const layer = feature.get("layer");
        if (layer != null) {
          if (this.poiService.isPoiActive(layer)) {
            const style = this.poiStyleMap.get(layer);
            if (style != null) {
              return [style];
            }
          }
        }
      }
      return null;
    };
  }

}
