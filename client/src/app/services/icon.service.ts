declare let require: any;

import {Injectable} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable()
export class IconService {

  constructor(private iconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.registerIcons();
  }

  registerIcons() {
    this.registerApplicationIcons();
    this.registerActionIcons();
    this.registerNetworkTypeIcons();
    this.registerCountryIcons();
    this.registerAnalysisResultsIcons();
    this.registerMenuIcons();
    this.registerDirectionsIcons();
  }

  private registerApplicationIcons() {

    this.iconRegistry.addSvgIconLiteral("analysis", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/heartbeat.svg")));

    this.iconRegistry.addSvgIconLiteral("map", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/planner.svg")));

    this.iconRegistry.addSvgIconLiteral("changes", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/history.svg")));

    this.iconRegistry.addSvgIconLiteral("overview", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/spreadsheet.svg")));

    this.iconRegistry.addSvgIconLiteral("link", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/link.svg")));

    this.iconRegistry.addSvgIconLiteral("dot", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/dot.svg")));

    this.iconRegistry.addSvgIconLiteral("logo", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/logo.svg")));
  }

  private registerActionIcons() {

    this.iconRegistry.addSvgIconLiteral("add", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/add.svg")));

    this.iconRegistry.addSvgIconLiteral("update", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/update.svg")));

    this.iconRegistry.addSvgIconLiteral("remove", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/remove.svg")));
  }

  private registerNetworkTypeIcons() {

    this.iconRegistry.addSvgIconLiteral("cycling", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/man-cycling.svg")));

    this.iconRegistry.addSvgIconLiteral("hiking", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/man-walking-to-right.svg")));

    this.iconRegistry.addSvgIconLiteral("horse-riding", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/horseshoe-black.svg")));

    this.iconRegistry.addSvgIconLiteral("motorboat", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/boat.svg")));

    this.iconRegistry.addSvgIconLiteral("canoe", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/canoe-racing.svg")));

    this.iconRegistry.addSvgIconLiteral("inline-skating", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/roller-skate.svg")));
  }

  private registerCountryIcons() {

    this.iconRegistry.addSvgIconLiteral("belgium", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/belgium.svg")));

    this.iconRegistry.addSvgIconLiteral("netherlands", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/netherlands.svg")));

    this.iconRegistry.addSvgIconLiteral("germany", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/germany.svg")));

    this.iconRegistry.addSvgIconLiteral("france", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/france.svg")));

    this.iconRegistry.addSvgIconLiteral("austria", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/austria.svg")));
  }

  private registerAnalysisResultsIcons() {

    this.iconRegistry.addSvgIconLiteral("happy", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/happy.svg")));

    this.iconRegistry.addSvgIconLiteral("investigate", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/investigate.svg")));

    this.iconRegistry.addSvgIconLiteral("warning", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/warning.svg")));
  }

  private registerMenuIcons() {

    this.iconRegistry.addSvgIconLiteral("menu", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/menu-button.svg")));

    this.iconRegistry.addSvgIconLiteral("help", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/info.svg")));

    this.iconRegistry.addSvgIconLiteral("expand", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/expand-arrow.svg")));

    this.iconRegistry.addSvgIconLiteral("collapse", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/right.svg")));

    this.iconRegistry.addSvgIconLiteral("back", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/left-arrow.svg")));
  }

  private registerDirectionsIcons() {
    this.iconRegistry.addSvgIconLiteral("keep-left", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/keep-left.svg")));

    this.iconRegistry.addSvgIconLiteral("turn-sharp-left", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/turn-sharp-left.svg")));

    this.iconRegistry.addSvgIconLiteral("turn-left", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/turn-left.svg")));

    this.iconRegistry.addSvgIconLiteral("turn-slight-left", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/turn-slight-left.svg")));

    this.iconRegistry.addSvgIconLiteral("continue", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/continue.svg")));

    this.iconRegistry.addSvgIconLiteral("turn-slight-right", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/turn-slight-right.svg")));

    this.iconRegistry.addSvgIconLiteral("turn-right", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/turn-right.svg")));

    this.iconRegistry.addSvgIconLiteral("turn-sharp-right", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/turn-sharp-right.svg")));

    this.iconRegistry.addSvgIconLiteral("finish", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/finish.svg")));

    this.iconRegistry.addSvgIconLiteral("via", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/via.svg")));

    this.iconRegistry.addSvgIconLiteral("roundabout", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/roundabout.svg")));

    this.iconRegistry.addSvgIconLiteral("keep-right", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/directions/keep-right.svg")));

    this.iconRegistry.addSvgIconLiteral("scissors", this.domSanitizer.bypassSecurityTrustHtml(
      require("!svg-inline-loader!src/assets/images/icons/scissors.svg")));

  }

}
