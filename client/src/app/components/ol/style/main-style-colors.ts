import {Color} from "ol/color";

export class MainStyleColors {
  public static readonly green: Color = [0, 200, 0]; // regular nodes and routes
  public static readonly darkGreen: Color = [0, 96, 0]; // orphan nodes and routes
  public static readonly red: Color = [255, 0, 0]; // orphan
  public static readonly darkRed: Color = [187, 0, 0]; // orphan error
  public static readonly blue: Color = [0, 0, 255]; // orphan error
  public static readonly darkBlue: Color = [0, 0, 187]; // orphan error
  public static readonly gray: Color = [150, 150, 150]; // nodes and routes that do not belong to the current network

  public static readonly yellow: Color = [255, 255, 0]; // selected color
  public static readonly white: Color = [255, 255, 255]; // node inner color

}
