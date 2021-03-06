package kpn.server.api.analysis.pages.subset

import kpn.api.common.subset.SubsetInfo
import kpn.api.custom.Fact
import kpn.api.custom.Subset
import kpn.core.app.stats.Figure

object SubsetInfoBuilder {

  def newSubsetInfo(subset: Subset, figures: Map[String, Figure]): SubsetInfo = {

    val networkCount = figures.get("NetworkCount") match {
      case Some(figure: Figure) => figure.counts.getOrElse(subset, 0L)
      case _ => 0L
    }
    val factCount = Fact.reportedFacts.map { f =>
      figures.get(f.name + "Count") match {
        case Some(figure: Figure) => figure.counts.getOrElse(subset, 0L)
        case _ => 0L
      }
    }.sum

    val orphanNodeCount = figures.get(Fact.OrphanNode.name + "Count") match {
      case Some(figure: Figure) => figure.counts.getOrElse(subset, 0L)
      case _ => 0L
    }
    val orphanRouteCount = figures.get(Fact.OrphanRoute.name + "Count") match {
      case Some(figure: Figure) => figure.counts.getOrElse(subset, 0L)
      case _ => 0L
    }

    SubsetInfo(
      subset.country.domain,
      subset.networkType.name,
      networkCount,
      factCount,
      0,
      orphanNodeCount,
      orphanRouteCount
    )
  }
}
