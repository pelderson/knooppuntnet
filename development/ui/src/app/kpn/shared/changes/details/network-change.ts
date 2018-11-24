// this class is generated, please do not modify

import {ChangeKey} from './change-key';
import {ChangeType} from './change-type';
import {Country} from '../../country';
import {IdDiffs} from '../../diff/id-diffs';
import {NetworkDataUpdate} from '../../diff/network-data-update';
import {NetworkType} from '../../network-type';
import {RefChanges} from './ref-changes';
import {RefDiffs} from '../../diff/ref-diffs';

export class NetworkChange {
  readonly key: ChangeKey;
  readonly changeType: ChangeType;
  readonly country: Country;
  readonly networkType: NetworkType;
  readonly networkId: number;
  readonly networkName: string;
  readonly orphanRoutes: RefChanges;
  readonly ignoredRoutes: RefChanges;
  readonly orphanNodes: RefChanges;
  readonly ignoredNodes: RefChanges;
  readonly networkDataUpdate: NetworkDataUpdate;
  readonly networkNodes: RefDiffs;
  readonly routes: RefDiffs;
  readonly nodes: IdDiffs;
  readonly ways: IdDiffs;
  readonly relations: IdDiffs;
  readonly happy: boolean;
  readonly investigate: boolean;

  constructor(key: ChangeKey,
              changeType: ChangeType,
              country: Country,
              networkType: NetworkType,
              networkId: number,
              networkName: string,
              orphanRoutes: RefChanges,
              ignoredRoutes: RefChanges,
              orphanNodes: RefChanges,
              ignoredNodes: RefChanges,
              networkDataUpdate: NetworkDataUpdate,
              networkNodes: RefDiffs,
              routes: RefDiffs,
              nodes: IdDiffs,
              ways: IdDiffs,
              relations: IdDiffs,
              happy: boolean,
              investigate: boolean) {
    this.key = key;
    this.changeType = changeType;
    this.country = country;
    this.networkType = networkType;
    this.networkId = networkId;
    this.networkName = networkName;
    this.orphanRoutes = orphanRoutes;
    this.ignoredRoutes = ignoredRoutes;
    this.orphanNodes = orphanNodes;
    this.ignoredNodes = ignoredNodes;
    this.networkDataUpdate = networkDataUpdate;
    this.networkNodes = networkNodes;
    this.routes = routes;
    this.nodes = nodes;
    this.ways = ways;
    this.relations = relations;
    this.happy = happy;
    this.investigate = investigate;
  }

  public static fromJSON(jsonObject): NetworkChange {
    if (!jsonObject) {
      return undefined;
    }
    return new NetworkChange(
      ChangeKey.fromJSON(jsonObject.key),
      ChangeType.fromJSON(jsonObject.changeType),
      Country.fromJSON(jsonObject.country),
      NetworkType.fromJSON(jsonObject.networkType),
      jsonObject.networkId,
      jsonObject.networkName,
      RefChanges.fromJSON(jsonObject.orphanRoutes),
      RefChanges.fromJSON(jsonObject.ignoredRoutes),
      RefChanges.fromJSON(jsonObject.orphanNodes),
      RefChanges.fromJSON(jsonObject.ignoredNodes),
      NetworkDataUpdate.fromJSON(jsonObject.networkDataUpdate),
      RefDiffs.fromJSON(jsonObject.networkNodes),
      RefDiffs.fromJSON(jsonObject.routes),
      IdDiffs.fromJSON(jsonObject.nodes),
      IdDiffs.fromJSON(jsonObject.ways),
      IdDiffs.fromJSON(jsonObject.relations),
      jsonObject.happy,
      jsonObject.investigate
    );
  }
}
