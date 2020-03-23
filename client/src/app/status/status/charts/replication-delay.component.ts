import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AppService} from "../../../app.service";
import {BarChart} from "../../../kpn/api/common/status/bar-chart";

/* tslint:disable:template-i18n work-in-progress */
@Component({
  selector: "kpn-replication-delay",
  template: `
    <h2>
      Replication average delay
    </h2>
    <div class="chart">
      <kpn-action-bar-chart
        *ngIf="barChart$ | async as barChart"
        [barChart]="barChart"
        xAxisLabel="Today"
        yAxisLabel="Average delay">
      </kpn-action-bar-chart>
    </div>
  `
})
export class ReplicationDelayComponent implements OnInit {

  barChart$: Observable<BarChart>;

  constructor(private readonly appService: AppService) {
  }

  ngOnInit(): void {
    this.barChart$ = this.appService.dayReplicationDelay().pipe(map(r => r.result));
  }

}
