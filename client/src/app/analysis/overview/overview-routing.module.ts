import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AnalysisSidebarComponent} from "../../components/shared/sidebar/analysis-sidebar.component";
import {Util} from "../../components/shared/util";
import {OverviewPageComponent} from "./overview/_overview-page.component";

const routes: Routes = [
  Util.routePath("", OverviewPageComponent, AnalysisSidebarComponent)
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OverviewRoutingModule {
}
