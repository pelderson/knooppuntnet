import {Input} from "@angular/core";
import {Component} from "@angular/core";
import {BarChart} from "../../../kpn/api/common/status/bar-chart";

/* tslint:disable:template-i18n English only */
@Component({
  selector: "kpn-replication-delay-chart",
  template: `
    <h2>
      Replication average delay
    </h2>
    <div class="chart">
      <kpn-action-bar-chart
        [barChart]="barChart"
        [xAxisLabel]="xAxisLabel"
        yAxisLabel="Average delay">
      </kpn-action-bar-chart>
    </div>
  `
})
export class ReplicationDelayChartComponent {
  @Input() barChart: BarChart;
  @Input() xAxisLabel: string;
}