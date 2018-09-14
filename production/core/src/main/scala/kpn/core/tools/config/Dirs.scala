package kpn.core.tools.config

import java.io.File

object Dirs {
  def apply(): Dirs = new Dirs(new File("/kpn"))
}

class Dirs(val root: File) {

  val cache: File = new File(root, "cache")

  val changeSets: File = new File(root, "changesets")

  val replicate: File = new File(root, "replicate")

  private val status: File = new File(root, "status")

  val replicationStatus: File = new File(status, "replication")
  val updateStatus: File = new File(status, "update")
  val analysisStatus: File = new File(status, System.getProperty("analysisStatus", "analysis"))
  val changesStatus: File = new File(status, "changes")

}