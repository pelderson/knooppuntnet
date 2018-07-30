// this class is generated, please do not modify

import {RouteInfo} from './route-info';
import {RouteReferences} from './route-references';

export class MapDetailRoute {

  constructor(public route?: RouteInfo,
              public references?: RouteReferences) {
  }

  public static fromJSON(jsonObject): MapDetailRoute {
    if (!jsonObject) {
      return undefined;
    }
    const instance = new MapDetailRoute();
    instance.route = jsonObject.route;
    instance.references = jsonObject.references;
    return instance;
  }
}

