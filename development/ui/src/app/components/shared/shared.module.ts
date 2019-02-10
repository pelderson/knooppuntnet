import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from "./page/page.component";
import {KpnMaterialModule} from "../../material/kpn-material.module";
import {DataComponent} from "./data/data.component";
import {OsmLinkComponent} from "./link/osm-link.component";
import {OsmLinkNodeComponent} from "./link/osm-link-node.component";
import {JosmLinkComponent} from "./link/josm-link.component";
import {JosmRelationComponent} from "./link/josm-relation.component";
import {JosmNodeComponent} from "./link/josm-node.component";
import {JosmWayComponent} from "./link/josm-way.component";
import {CountryNameComponent} from "./country-name.component";
import {IconNetworkLinkComponent} from "./link/icon-network-link.component";
import {RouterModule} from "@angular/router";
import {IconRouteLinkComponent} from "./link/icon-route-link.component";
import {TimestampComponent} from "./timestamp/timestamp.component";
import {IconLinkComponent} from "./link/icon-link.component";
import {TagsComponent} from "./tags/tags.component";
import {JsonComponent} from "./json/json.component";
import {DayComponent} from "./day/day.component";
import {OsmLinkRelationComponent} from "./link/osm-link-relation.component";
import {LinkChangesComponent} from "./link/link-changes.component";
import {LinkMapComponent} from "./link/link-map.component";
import {LinkNetworkChangesComponent} from "./link/link-network-changes.component";
import {LinkNetworkDetailsComponent} from "./link/link-network-details.component";
import {LinkNetworkFactsComponent} from "./link/link-network-facts.component";
import {LinkNetworkMapComponent} from "./link/link-network-map.component";
import {LinkNetworkNodesComponent} from "./link/link-network-nodes.component";
import {LinkNetworkRoutesComponent} from "./link/link-network-routes.component";
import {LinkOverviewComponent} from "./link/link-overview.component";
import {LinkRouteComponent} from "./link/link-route.component";
import {LinkSubsetNetworksComponent} from "./link/link-subset-networks.component";
import {LinkSubsetOrphanNodesComponent} from "./link/link-subset-orphan-nodes.component";
import {LinkSubsetOrphanRoutesComponent} from "./link/link-subset-orphan-routes.component";
import {LinkAboutComponent} from "./link/link-about.component";
import {LinkAuthenticateComponent} from "./link/link-authenticate.component";
import {LinkGlossaryComponent} from "./link/link-glossary.component";
import {LinkHomeComponent} from "./link/link-home.component";
import {LinkLinksComponent} from "./link/link-links.component";
import {LinkLoginComponent} from "./link/link-login.component";
import {LinkLogoutComponent} from "./link/link-logout.component";
import {LinkNodeComponent} from "./link/link-node.component";
import {LinkFactComponent} from "./link/link-fact.component";
import {LinkSubsetFactsComponent} from "./link/link-subset-facts.component";
import {LinkChangesetComponent} from "./link/link-changeset.component";
import {LinkSubsetChangesComponent} from "./link/link-subset-changes.component";
import {OsmWebsiteComponent} from "./link/osm-website.component";
import {OsmLinkUserComponent} from "./link/osm-link-user.component";
import {OsmLinkUserAothClientsComponent} from "./link/osm-link-user-aoth-clients.component";
import {ToolbarComponent} from './toolbar/toolbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SidebarFooterComponent} from './sidebar/sidebar-footer.component';
import {NetworkTypeIconComponent} from "./network-type-icon.component";
import {NetworkTypeNameComponent} from "./network-type-name.component";
import {SidebarSubsetsComponent} from './sidebar/sidebar-subsets.component';
import {SidebarNetworkComponent} from './sidebar/sidebar-network.component';
import {SidebarSubsetComponent} from './sidebar/sidebar-subset.component';
import {SidebarMenuComponent} from './sidebar/sidebar-menu.component';
import {SidebarSubItemComponent} from './sidebar/sidebar-sub-item.component';
import {SubsetNameComponent} from './subset-name.component';
import {ItemsComponent} from './items/items.component';
import {ItemComponent} from './items/item.component';
import {NetworkTypeComponent} from './network-type.component';
import {IndicatorIconComponent} from './indicator/indicator-icon.component';
import {IndicatorComponent} from './indicator/indicator.component';
import {IndicatorDialogComponent} from './indicator/indicator-dialog.component';
import {OsmLinkChangeSetComponent} from "./link/osm-link-change-set.component";
import {MetaDataComponent} from "./meta-data.component";
import {IconButtonComponent} from "./icon/icon-button.component";
import {PageMenuComponent} from "./menu/page-menu.component";
import {PageMenuOptionComponent} from "./menu/page-menu-option.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KpnMaterialModule
  ],
  declarations: [
    LinkChangesetComponent,
    LinkChangesComponent,
    LinkMapComponent,
    LinkNetworkChangesComponent,
    LinkNetworkDetailsComponent,
    LinkNetworkFactsComponent,
    LinkNetworkMapComponent,
    LinkNetworkNodesComponent,
    LinkNetworkRoutesComponent,
    LinkNodeComponent,
    LinkOverviewComponent,
    LinkRouteComponent,
    LinkChangesComponent,
    LinkFactComponent,
    LinkSubsetFactsComponent,
    LinkSubsetNetworksComponent,
    LinkSubsetOrphanNodesComponent,
    LinkSubsetOrphanRoutesComponent,
    LinkSubsetChangesComponent,
    LinkAboutComponent,
    LinkAuthenticateComponent,
    LinkGlossaryComponent,
    LinkHomeComponent,
    LinkLinksComponent,
    LinkLoginComponent,
    LinkLogoutComponent,
    JosmLinkComponent,
    JosmNodeComponent,
    JosmWayComponent,
    JosmRelationComponent,
    OsmLinkComponent,
    OsmLinkNodeComponent,
    OsmLinkChangeSetComponent,
    OsmLinkRelationComponent,
    OsmLinkUserComponent,
    OsmLinkUserAothClientsComponent,
    OsmWebsiteComponent,
    IconLinkComponent,
    IconNetworkLinkComponent,
    IconRouteLinkComponent,
    NetworkTypeComponent,
    NetworkTypeIconComponent,
    NetworkTypeNameComponent,
    CountryNameComponent,
    MetaDataComponent,
    DayComponent,
    TimestampComponent,
    JsonComponent,
    TagsComponent,
    DataComponent,
    PageComponent,
    ToolbarComponent,
    SidebarComponent,
    SidebarFooterComponent,
    SidebarSubsetsComponent,
    SidebarNetworkComponent,
    SidebarSubsetComponent,
    SidebarMenuComponent,
    SidebarSubItemComponent,
    SubsetNameComponent,
    ItemsComponent,
    ItemComponent,
    IndicatorIconComponent,
    IndicatorComponent,
    IndicatorDialogComponent,
    IconButtonComponent,
    PageMenuComponent,
    PageMenuOptionComponent,
  ],
  exports: [
    LinkChangesetComponent,
    LinkChangesComponent,
    LinkMapComponent,
    LinkNetworkChangesComponent,
    LinkNetworkDetailsComponent,
    LinkNetworkFactsComponent,
    LinkNetworkMapComponent,
    LinkNetworkNodesComponent,
    LinkNetworkRoutesComponent,
    LinkNodeComponent,
    LinkOverviewComponent,
    LinkRouteComponent,
    LinkChangesComponent,
    LinkFactComponent,
    LinkSubsetFactsComponent,
    LinkSubsetNetworksComponent,
    LinkSubsetOrphanNodesComponent,
    LinkSubsetOrphanRoutesComponent,
    LinkSubsetChangesComponent,
    LinkAboutComponent,
    LinkAuthenticateComponent,
    LinkGlossaryComponent,
    LinkHomeComponent,
    LinkLinksComponent,
    LinkLoginComponent,
    LinkLogoutComponent,
    JosmNodeComponent,
    JosmWayComponent,
    JosmRelationComponent,
    OsmLinkNodeComponent,
    OsmLinkChangeSetComponent,
    OsmLinkRelationComponent,
    OsmLinkUserComponent,
    OsmLinkUserAothClientsComponent,
    OsmWebsiteComponent,
    IconLinkComponent,
    IconNetworkLinkComponent,
    IconRouteLinkComponent,
    NetworkTypeComponent,
    NetworkTypeIconComponent,
    NetworkTypeNameComponent,
    CountryNameComponent,
    MetaDataComponent,
    DayComponent,
    TimestampComponent,
    JsonComponent,
    TagsComponent,
    DataComponent,
    PageComponent,
    ToolbarComponent,
    SidebarComponent,
    SidebarFooterComponent,
    SidebarSubsetsComponent,
    SidebarNetworkComponent,
    SidebarSubsetComponent,
    SidebarSubItemComponent,
    SubsetNameComponent,
    ItemsComponent,
    ItemComponent,
    IndicatorComponent,
    IndicatorIconComponent,
    IndicatorDialogComponent,
    IconButtonComponent,
    PageMenuComponent,
    PageMenuOptionComponent,
  ]
})
export class SharedModule {
}