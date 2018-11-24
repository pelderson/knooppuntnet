// this class is generated, please do not modify

import {List} from 'immutable';
import {FactDiffs} from '../common/fact-diffs';
import {RouteNameDiff} from './route-name-diff';
import {RouteNodeDiff} from './route-node-diff';
import {RouteRoleDiff} from './route-role-diff';
import {TagDiffs} from '../tag-diffs';

export class RouteDiff {
  readonly nameDiff: RouteNameDiff;
  readonly roleDiff: RouteRoleDiff;
  readonly factDiffs: FactDiffs;
  readonly nodeDiffs: List<RouteNodeDiff>;
  readonly memberOrderChanged: boolean;
  readonly tagDiffs: TagDiffs;

  constructor(nameDiff: RouteNameDiff,
              roleDiff: RouteRoleDiff,
              factDiffs: FactDiffs,
              nodeDiffs: List<RouteNodeDiff>,
              memberOrderChanged: boolean,
              tagDiffs: TagDiffs) {
    this.nameDiff = nameDiff;
    this.roleDiff = roleDiff;
    this.factDiffs = factDiffs;
    this.nodeDiffs = nodeDiffs;
    this.memberOrderChanged = memberOrderChanged;
    this.tagDiffs = tagDiffs;
  }

  public static fromJSON(jsonObject): RouteDiff {
    if (!jsonObject) {
      return undefined;
    }
    return new RouteDiff(
      RouteNameDiff.fromJSON(jsonObject.nameDiff),
      RouteRoleDiff.fromJSON(jsonObject.roleDiff),
      FactDiffs.fromJSON(jsonObject.factDiffs),
      jsonObject.nodeDiffs ? List(jsonObject.nodeDiffs.map(json => RouteNodeDiff.fromJSON(json))) : List(),
      jsonObject.memberOrderChanged,
      TagDiffs.fromJSON(jsonObject.tagDiffs)
    );
  }
}
