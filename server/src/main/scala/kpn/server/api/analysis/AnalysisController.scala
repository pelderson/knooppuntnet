package kpn.server.api.analysis

import kpn.shared.ApiResponse
import kpn.shared.ChangesPage
import kpn.shared.Fact
import kpn.shared.LocationPage
import kpn.shared.NetworkType
import kpn.shared.Subset
import kpn.shared.changes.ChangeSetPage
import kpn.shared.changes.filter.ChangesParameters
import kpn.shared.network.NetworkChangesPage
import kpn.shared.network.NetworkDetailsPage
import kpn.shared.network.NetworkFactsPage
import kpn.shared.network.NetworkMapPage
import kpn.shared.network.NetworkNodesPage
import kpn.shared.network.NetworkRoutesPage
import kpn.shared.node.MapDetailNode
import kpn.shared.node.NodeDetailsPage
import kpn.shared.route.MapDetailRoute
import kpn.shared.route.RouteDetailsPage
import kpn.shared.statistics.Statistics
import kpn.shared.subset.SubsetChangesPage
import kpn.shared.subset.SubsetFactDetailsPage
import kpn.shared.subset.SubsetFactsPage
import kpn.shared.subset.SubsetNetworksPage
import kpn.shared.subset.SubsetOrphanNodesPage
import kpn.shared.subset.SubsetOrphanRoutesPage
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class AnalysisController(analysisFacade: AnalysisFacade) {

  @GetMapping(value = Array("/json-api/overview"))
  def overview(@CookieValue(name = "knooppuntnet-user") user: String): ApiResponse[Statistics] = {
    analysisFacade.overview(Option.apply(user))
  }

  @GetMapping(value = Array("/json-api/{country:be|de|fr|nl}/{networkType:cycling|hiking|horse-riding|motorboat|canoe|inline-skating}/networks"))
  def subsetNetworks(
    @PathVariable country: String,
    @PathVariable networkType: String,
    @CookieValue(name = "knooppuntnet-user") user: String
  ): ApiResponse[SubsetNetworksPage] = {
    val subset = Subset.ofNewName(country, networkType)
    analysisFacade.subsetNetworks(Option.apply(user), subset.get)
  }

  @GetMapping(value = Array("/json-api/{country:be|de|fr|nl}/{networkType:cycling|hiking|horse-riding|motorboat|canoe|inline-skating}/facts"))
  def subsetFacts(
    @PathVariable country: String,
    @PathVariable networkType: String,
    @CookieValue(name = "knooppuntnet-user") user: String
  ): ApiResponse[SubsetFactsPage] = {
    val subset = Subset.ofNewName(country, networkType)
    analysisFacade.subsetFacts(Option.apply(user), subset.get)
  }

  def subsetFactDetails(context: Subset, fact: Fact): ApiResponse[SubsetFactDetailsPage] = {
    null
  }

  @GetMapping(value = Array("/json-api/{country:be|de|fr|nl}/{networkType:cycling|hiking|horse-riding|motorboat|canoe|inline-skating}/orphan-nodes"))
  def subsetOrphanNodes(
    @PathVariable country: String,
    @PathVariable networkType: String,
    @CookieValue(name = "knooppuntnet-user") user: String
  ): ApiResponse[SubsetOrphanNodesPage] = {
    val subset = Subset.ofNewName(country, networkType)
    analysisFacade.subsetOrphanNodes(Option.apply(user), subset.get)
  }

  @GetMapping(value = Array("/json-api/{country:be|de|fr|nl}/{networkType:cycling|hiking|horse-riding|motorboat|canoe|inline-skating}/orphan-routes"))
  def subsetOrphanRoutes(
    @PathVariable country: String,
    @PathVariable networkType: String,
    @CookieValue(name = "knooppuntnet-user") user: String
  ): ApiResponse[SubsetOrphanRoutesPage] = {
    val subset = Subset.ofNewName(country, networkType)
    analysisFacade.subsetOrphanRoutes(Option.apply(user), subset.get)
  }

  def subsetChanges(parameters: ChangesParameters): ApiResponse[SubsetChangesPage] = {
    null
  }

  @GetMapping(value = Array("/json-api/network/{networkId}"))
  def networkDetails(@PathVariable networkId: Long, @CookieValue(name = "knooppuntnet-user") user: String): ApiResponse[NetworkDetailsPage] = {
    analysisFacade.networkDetails(Option.apply(user), networkId)
  }

  @GetMapping(value = Array("/json-api/network/{networkId}/map"))
  def networkMap(@PathVariable networkId: Long, @CookieValue(name = "knooppuntnet-user") user: String): ApiResponse[NetworkMapPage] = {
    analysisFacade.networkMap(Option.apply(user), networkId)
  }

  @GetMapping(value = Array("/json-api/network/{networkId}/facts"))
  def networkFacts(@PathVariable networkId: Long, @CookieValue(name = "knooppuntnet-user") user: String): ApiResponse[NetworkFactsPage] = {
    analysisFacade.networkFacts(Option.apply(user), networkId)
  }

  @GetMapping(value = Array("/json-api/network/{networkId}/nodes"))
  def networkNodes(@PathVariable networkId: Long, @CookieValue(name = "knooppuntnet-user") user: String): ApiResponse[NetworkNodesPage] = {
    analysisFacade.networkNodes(Option.apply(user), networkId)
  }

  @GetMapping(value = Array("/json-api/network/{networkId}/routes"))
  def networkRoutes(@PathVariable networkId: Long, @CookieValue(name = "knooppuntnet-user") user: String): ApiResponse[NetworkRoutesPage] = {
    analysisFacade.networkRoutes(Option.apply(user), networkId)
  }

  def networkChanges(parameters: ChangesParameters): ApiResponse[NetworkChangesPage] = {
    null
  }

  @GetMapping(value = Array("/json-api/node/{nodeId}"))
  def node(@PathVariable nodeId: Long, @CookieValue(name = "knooppuntnet-user") user: String): ApiResponse[NodeDetailsPage] = {
    analysisFacade.nodeDetails(Option.apply(user), nodeId)
  }

  @GetMapping(value = Array("/json-api/route/{routeId}"))
  def route(@PathVariable routeId: Long, @CookieValue(name = "knooppuntnet-user") user: String): ApiResponse[RouteDetailsPage] = {
    analysisFacade.routeDetails(Option.apply(user), routeId)
  }

  def changes(parameters: ChangesParameters): ApiResponse[ChangesPage] = {
    null
  }

  def changeSet(changeSetId: Long, replicationNumber: Int): ApiResponse[ChangeSetPage] = {
    null
  }

  def mapDetailNode(networkType: NetworkType, nodeId: Long): ApiResponse[MapDetailNode] = {
    null
  }

  def mapDetailRoute(routeId: Long): ApiResponse[MapDetailRoute] = {
    null
  }

  def location(networkType: NetworkType): ApiResponse[LocationPage] = {
    null
  }

}