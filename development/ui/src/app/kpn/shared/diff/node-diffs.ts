// this class is generated, please do not modify

import {List} from 'immutable';
import {NodeData} from './node-data';
import {NodeDataUpdate} from './node-data-update';

export class NodeDiffs {
  readonly removed: List<NodeData>;
  readonly added: List<NodeData>;
  readonly updated: List<NodeDataUpdate>;

  constructor(removed: List<NodeData>,
              added: List<NodeData>,
              updated: List<NodeDataUpdate>) {
    this.removed = removed;
    this.added = added;
    this.updated = updated;
  }

  public static fromJSON(jsonObject): NodeDiffs {
    if (!jsonObject) {
      return undefined;
    }
    return new NodeDiffs(
      jsonObject.removed ? List(jsonObject.removed.map(json => NodeData.fromJSON(json))) : List(),
      jsonObject.added ? List(jsonObject.added.map(json => NodeData.fromJSON(json))) : List(),
      jsonObject.updated ? List(jsonObject.updated.map(json => NodeDataUpdate.fromJSON(json))) : List()
    );
  }
}
