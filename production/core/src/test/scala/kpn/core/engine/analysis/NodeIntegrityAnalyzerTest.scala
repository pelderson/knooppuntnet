package kpn.core.engine.analysis

import kpn.core.analysis.NetworkMemberRoute
import kpn.core.analysis.NetworkNode
import kpn.core.engine.analysis.route.RouteAnalysis
import kpn.core.engine.analysis.route.RouteNode
import kpn.core.engine.analysis.route.RouteNodeAnalysis
import kpn.core.engine.analysis.route.RouteNodeType
import kpn.shared.Country
import kpn.shared.NetworkType
import kpn.shared.NodeIntegrityCheck
import kpn.shared.SharedTestObjects
import kpn.shared.data.Tags
import org.scalatest.FunSuite
import org.scalatest.Matchers

class NodeIntegrityAnalyzerTest extends FunSuite with Matchers with SharedTestObjects {

  test("integrity check success") {

    val node = newNetworkNode()

    val networkAnalysis = NetworkAnalysis(
      networkNodesInRelation = Set(node),
      routes = Seq(
        networkMemberRoute(node, 11),
        networkMemberRoute(node, 12),
        networkMemberRoute(node, 13)
      )
    )

    analysis(networkAnalysis, node) should equal(Some(NodeIntegrityCheck("01", 1001, 3, 3, failed = false)))
  }

  test("integrity check - do count route with role 'connection' in network relation (see Issue #32)") {

    val node = newNetworkNode()

    val networkAnalysis = NetworkAnalysis(
      networkNodesInRelation = Set(node),
      routes = Seq(
        networkMemberRoute(node, 11, Some("connection")),
        networkMemberRoute(node, 12),
        networkMemberRoute(node, 13)
      )
    )

    analysis(networkAnalysis, node) should equal(Some(NodeIntegrityCheck("01", 1001, 3, 3, failed = false)))
  }

  test("integrity check - do not count route with state 'connection'") {

    val node = newNetworkNode()

    val networkAnalysis = NetworkAnalysis(
      networkNodesInRelation = Set(node),
      routes = Seq(
        networkMemberRoute(node, 11, routeTags = Tags.from("state" -> "connection")),
        networkMemberRoute(node, 12),
        networkMemberRoute(node, 13)
      )
    )

    analysis(networkAnalysis, node) should equal(Some(NodeIntegrityCheck("01", 1001, 2, 3, failed = true)))
  }

  test("integrity check - do not count route with state 'alternate'") {

    val node = newNetworkNode()

    val networkAnalysis = NetworkAnalysis(
      networkNodesInRelation = Set(node),
      routes = Seq(
        networkMemberRoute(node, 11, routeTags = Tags.from("state" -> "alternate")),
        networkMemberRoute(node, 12),
        networkMemberRoute(node, 13)
      )
    )

    analysis(networkAnalysis, node) should equal(Some(NodeIntegrityCheck("01", 1001, 2, 3, failed = true)))
  }

  test("no integrity check when no integrity check tag on node") {

    val node = newNetworkNodeWithTags(Tags.empty)

    val networkAnalysis = NetworkAnalysis(
      networkNodesInRelation = Set(node),
      routes = Seq(
        networkMemberRoute(node, 11),
        networkMemberRoute(node, 12),
        networkMemberRoute(node, 13)
      )
    )

    analysis(networkAnalysis, node) should equal(None)
  }

  test("no integrity check when node is not member in network relation") {

    val node = newNetworkNode()

    val networkAnalysis = NetworkAnalysis(
      networkNodesInRelation = Set.empty, // <== !!
      routes = Seq(
        networkMemberRoute(node, 11),
        networkMemberRoute(node, 12),
        networkMemberRoute(node, 13)
      )
    )

    analysis(networkAnalysis, node) should equal(None)
  }

  test("integrity check - use expected = 0 when tag value is not numeric") {
    val node = newNetworkNodeWithTags(Tags.from(NetworkType.hiking.expectedRouteRelationsTag -> "bla"))

    val networkAnalysis = NetworkAnalysis(
      networkNodesInRelation = Set(node),
      routes = Seq(
        networkMemberRoute(node, 11),
        networkMemberRoute(node, 12),
        networkMemberRoute(node, 13)
      )
    )

    analysis(networkAnalysis, node) should equal(Some(NodeIntegrityCheck("01", 1001, 3, 0, failed = true)))
  }


  private def networkMemberRoute(networkNode: NetworkNode, routeId: Long, role: Option[String] = None, routeTags: Tags = Tags.empty): NetworkMemberRoute = {

    NetworkMemberRoute(
      routeAnalysis = RouteAnalysis(
        relation = null,
        route = newRouteInfo(
          newRouteSummary(
            routeId
          ),
          tags = routeTags
        ),
        routeNodes = RouteNodeAnalysis(
          startNodes = Seq(
            RouteNode(
              nodeType = RouteNodeType.Start,
              node = networkNode.node,
              definedInRelation = true,
              definedInWay = true
            )
          )
        )
      ),
      role = role
    )
  }

  private def newNetworkNode(): NetworkNode = {
    newNetworkNodeWithTags(Tags.from(NetworkType.hiking.expectedRouteRelationsTag -> "3"))
  }

  private def newNetworkNodeWithTags(tags: Tags): NetworkNode = {
    val node = newNode(1001, tags = tags)
    NetworkNode(
      node = node,
      name = "01",
      country = Some(Country.nl)
    )
  }

  private def analysis(networkAnalysis: NetworkAnalysis, node: NetworkNode): Option[NodeIntegrityCheck] = {
    new NodeIntegrityAnalyzer(NetworkType.hiking, networkAnalysis, node).analysis
  }

}
