package kpn.core.engine.analysis.route.analyzers

import kpn.core.engine.analysis.route.domain.RouteAnalysisContext
import kpn.shared.Fact.RouteNetworkTypeNotTagged

object TaggedRouteAnalyzer extends RouteAnalyzer {
  def analyze(context: RouteAnalysisContext): RouteAnalysisContext = {
    new TaggedRouteAnalyzer(context).analyze
  }
}

class TaggedRouteAnalyzer(context: RouteAnalysisContext) {

  def analyze: RouteAnalysisContext = {
    if (!tagged) {
      context.withFact(RouteNetworkTypeNotTagged)
    }
    else {
      context
    }
  }

  private def tagged: Boolean = {
    context.loadedRoute.relation.tags.has("network:type", "node_network")
  }

}
