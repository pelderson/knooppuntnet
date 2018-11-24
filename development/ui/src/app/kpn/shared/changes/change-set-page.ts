// this class is generated, please do not modify

import {List} from 'immutable';
import {ChangeSetInfo} from './change-set-info';
import {ChangeSetSummary} from '../change-set-summary';
import {KnownElements} from '../common/known-elements';
import {NetworkChangeInfo} from './details/network-change-info';
import {NodeChangeInfo} from '../node/node-change-info';
import {Review} from './review';
import {RouteChangeInfo} from '../route/route-change-info';

export class ChangeSetPage {
  readonly summary: ChangeSetSummary;
  readonly changeSetInfo: ChangeSetInfo;
  readonly networkChanges: List<NetworkChangeInfo>;
  readonly routeChanges: List<RouteChangeInfo>;
  readonly nodeChanges: List<NodeChangeInfo>;
  readonly knownElements: KnownElements;
  readonly reviews: List<Review>;

  constructor(summary: ChangeSetSummary,
              changeSetInfo: ChangeSetInfo,
              networkChanges: List<NetworkChangeInfo>,
              routeChanges: List<RouteChangeInfo>,
              nodeChanges: List<NodeChangeInfo>,
              knownElements: KnownElements,
              reviews: List<Review>) {
    this.summary = summary;
    this.changeSetInfo = changeSetInfo;
    this.networkChanges = networkChanges;
    this.routeChanges = routeChanges;
    this.nodeChanges = nodeChanges;
    this.knownElements = knownElements;
    this.reviews = reviews;
  }

  public static fromJSON(jsonObject): ChangeSetPage {
    if (!jsonObject) {
      return undefined;
    }
    return new ChangeSetPage(
      ChangeSetSummary.fromJSON(jsonObject.summary),
      ChangeSetInfo.fromJSON(jsonObject.changeSetInfo),
      jsonObject.networkChanges ? List(jsonObject.networkChanges.map(json => NetworkChangeInfo.fromJSON(json))) : List(),
      jsonObject.routeChanges ? List(jsonObject.routeChanges.map(json => RouteChangeInfo.fromJSON(json))) : List(),
      jsonObject.nodeChanges ? List(jsonObject.nodeChanges.map(json => NodeChangeInfo.fromJSON(json))) : List(),
      KnownElements.fromJSON(jsonObject.knownElements),
      jsonObject.reviews ? List(jsonObject.reviews.map(json => Review.fromJSON(json))) : List()
    );
  }
}
