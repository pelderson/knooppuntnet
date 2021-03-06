import {ChangeDetectionStrategy} from "@angular/core";
import {Component, Input} from "@angular/core";
import {Timestamp} from "../../../kpn/api/custom/timestamp";

@Component({
  selector: "kpn-timestamp",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    {{formattedTimestamp()}}
  `
})
export class TimestampComponent {

  @Input() timestamp: Timestamp;

  formattedTimestamp() {
    if (!this.timestamp) {
      return "";
    }
    return this.timestamp.year.toString() + "-" +
      this.digits(this.timestamp.month) + "-" +
      this.digits(this.timestamp.day) + " " +
      this.digits(this.timestamp.hour) + ":" +
      this.digits(this.timestamp.minute);
  }

  private digits(n: number): string {
    return (100 + n).toString().substr(1);
  }
}
