package kpn.server.analyzer.engine.analysis.network

import kpn.api.common.NetworkIntegrityCheck
import kpn.api.common.NetworkIntegrityCheckFailed
import kpn.api.common.NodeIntegrityCheck
import kpn.core.analysis.NetworkNodeInfo

class NetworkIntegrityAnalysis(nodes: Seq[NetworkNodeInfo]) {

  private val checkCount = nodes.count(_.integrityCheck.isDefined)

  private val failedCheckCount = nodes.map { node =>
    node.integrityCheck match {
      case Some(NodeIntegrityCheck(nodeName, nodeId, actual, expected, failed)) => if (failed) 1 else 0
      case None => 0
    }
  }.sum

  private val nodesWithFailedCheck = nodes.flatMap(_.integrityCheck).filter(_.failed)

  val check: Option[NetworkIntegrityCheck] = if (checkCount == 0) None else Some(NetworkIntegrityCheck(checkCount, failedCheckCount))

  val checkFailed: Option[NetworkIntegrityCheckFailed] = if (nodesWithFailedCheck.isEmpty) {
    None
  }
  else {
    Some(NetworkIntegrityCheckFailed(nodesWithFailedCheck.size, nodesWithFailedCheck))
  }
}
