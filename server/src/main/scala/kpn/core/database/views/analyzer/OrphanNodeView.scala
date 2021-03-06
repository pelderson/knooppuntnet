package kpn.core.database.views.analyzer

import kpn.api.common.NodeInfo
import kpn.api.custom.Subset
import kpn.core.database.Database
import kpn.core.database.query.Query
import kpn.core.database.views.common.View

object OrphanNodeView extends View {

  private case class ViewResultRow(
    value: NodeInfo
  )

  private case class ViewResult(
    rows: Seq[ViewResultRow]
  )

  def query(database: Database, subset: Subset, stale: Boolean = true): Seq[NodeInfo] = {
    val country = subset.country.domain
    val networkType = subset.networkType.name
    val query = Query(AnalyzerDesign, OrphanNodeView, classOf[ViewResult])
      .keyStartsWith(country, networkType)
      .reduce(false)
      .stale(stale)
    val result = database.execute(query)
    result.rows.map(_.value)
  }

  override val reduce: Option[String] = Some("_count")
}
