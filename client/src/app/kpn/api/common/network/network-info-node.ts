// this class is generated, please do not modify

import {List} from "immutable";
import {Day} from "../../custom/day";
import {Fact} from "../../custom/fact";
import {NodeIntegrityCheck} from "../node-integrity-check";
import {Ref} from "../common/ref";
import {Tags} from "../../custom/tags";
import {Timestamp} from "../../custom/timestamp";

export class NetworkInfoNode {

  constructor(readonly id: number,
              readonly name: string,
              readonly number: string,
              readonly latitude: string,
              readonly longitude: string,
              readonly connection: boolean,
              readonly roleConnection: boolean,
              readonly definedInRelation: boolean,
              readonly definedInRoute: boolean,
              readonly timestamp: Timestamp,
              readonly lastSurvey: Day,
              readonly routeReferences: List<Ref>,
              readonly integrityCheck: NodeIntegrityCheck,
              readonly facts: List<Fact>,
              readonly tags: Tags) {
  }

  public static fromJSON(jsonObject: any): NetworkInfoNode {
    if (!jsonObject) {
      return undefined;
    }
    return new NetworkInfoNode(
      jsonObject.id,
      jsonObject.name,
      jsonObject.number,
      jsonObject.latitude,
      jsonObject.longitude,
      jsonObject.connection,
      jsonObject.roleConnection,
      jsonObject.definedInRelation,
      jsonObject.definedInRoute,
      Timestamp.fromJSON(jsonObject.timestamp),
      Day.fromJSON(jsonObject.lastSurvey),
      jsonObject.routeReferences ? List(jsonObject.routeReferences.map((json: any) => Ref.fromJSON(json))) : List(),
      NodeIntegrityCheck.fromJSON(jsonObject.integrityCheck),
      jsonObject.facts ? List(jsonObject.facts.map((json: any) => Fact.fromJSON(json))) : List(),
      Tags.fromJSON(jsonObject.tags)
    );
  }
}
