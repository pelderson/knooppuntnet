import {List} from "immutable";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {I18nService} from "../../../i18n/i18n.service";
import {NetworkInfoNode} from "../../../kpn/api/common/network/network-info-node";
import {Util} from "../../shared/util";
import {Marker} from "../domain/marker";
import {MapLayer} from "./map-layer";

export class NetworkNodesMarkerLayer {

  constructor(private i18nService: I18nService) {
  }

  build(nodes: List<NetworkInfoNode>): MapLayer {

    const markers = nodes.map(node => {
      const color = node.roleConnection ? "green" : "blue";
      const coordinate = Util.toCoordinate(node.latitude, node.longitude);
      const marker = Marker.create(color, coordinate);
      marker.set("id", node.id.toString());
      marker.set("name", node.name);
      marker.set("layer", "node-marker");
      return marker;
    });

    const source = new VectorSource();
    const layer = new VectorLayer({
      source: source
    });
    const name = this.i18nService.translation("@@map.layer.nodes");
    layer.set("name", name);

    markers.forEach(marker => source.addFeature(marker));
    return new MapLayer(layer);
  }

}
