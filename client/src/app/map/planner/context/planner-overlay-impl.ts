import Map from "ol/Map";
import Overlay from "ol/Overlay";
import Coordinate from "ol/coordinate";
import {PlannerOverlay} from "./planner-overlay";

export class PlannerOverlayImpl implements PlannerOverlay {

  private overlay: Overlay;

  addToMap(map: Map) {
    this.overlay = map.getOverlayById("popup");
  }

  setPosition(coordinate: Coordinate): void {
    this.overlay.setPosition(coordinate);
  }

}