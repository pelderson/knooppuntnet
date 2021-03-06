import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import VectorTileLayer from "ol/layer/VectorTile";
import Map from "ol/Map";
import {I18nService} from "../../../i18n/i18n.service";
import {ZoomLevel} from "../domain/zoom-level";
import {MapService} from "../services/map.service";
import {MainMapStyle} from "../style/main-map-style";
import {NodeMapStyle} from "../style/node-map-style";
import {MapLayer} from "./map-layer";
import {NetworkBitmapTileLayer} from "./network-bitmap-tile-layer";
import {NetworkVectorTileLayer} from "./network-vector-tile-layer";

export class MainMapLayer {

  bitmapTileLayer: TileLayer;
  vectorTileLayer: VectorTileLayer;

  constructor(private mapService: MapService,
              private i18nService: I18nService) {
  }

  build(): MapLayer {
    const networkType = this.mapService.networkType.value;
    this.bitmapTileLayer = NetworkBitmapTileLayer.build(networkType);
    this.vectorTileLayer = NetworkVectorTileLayer.oldBuild(networkType);

    const layer = new LayerGroup({
      layers: [this.bitmapTileLayer, this.vectorTileLayer]
    });
    const layerName = this.i18nService.translation("@@map.layer.network");
    layer.set("name", layerName);
    return new MapLayer(layer, this.applyMap());
  }

  private applyMap() {
    return (map: Map) => {
      const mainMapStyle = new MainMapStyle(map, this.mapService).styleFunction();
      const nodeMapStyle = new NodeMapStyle(map).styleFunction();
      this.vectorTileLayer.setStyle(mainMapStyle);
      this.updateLayerVisibility(map.getView().getZoom());
      map.getView().on("change:resolution", () => this.zoom(map.getView().getZoom()));
    };
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

}
