import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MapPageComponent} from "./pages/map/_map-page.component";
import {MapMainPageComponent} from "./pages/map/map-main-page.component";
import {MapTryout1PageComponent} from "./pages/tryout1/_map-tryout-1-page.component";
import {MapSidebarComponent} from "./sidebar/_map-sidebar.component";

const routes: Routes = [
  {
    path: "tryout1",
    component: MapTryout1PageComponent
  },
  {
    path: "",
    component: MapSidebarComponent,
    outlet: "sidebar"
  },
  {
    path: "",
    component: MapPageComponent
  },
  {
    path: ":networkType",
    component: MapMainPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MapRoutingModule {
}