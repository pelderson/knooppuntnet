package kpn.api.common.node

case class NodeNetworkIntegrityCheck(failed: Boolean, expected: Long, actual: Long)
