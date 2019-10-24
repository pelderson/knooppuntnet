package kpn.core.test

import java.util.Properties
import java.util.concurrent.atomic.AtomicInteger

import com.fasterxml.jackson.databind.ObjectMapper
import kpn.core.app.ActorSystemConfig
import kpn.core.db.couch.Couch
import kpn.core.db.couch.CouchConfig
import kpn.core.db.couch.Database
import kpn.core.db.couch.DatabaseImpl
import kpn.core.db.couch.implementation.DatabaseContext
import kpn.core.db.views.AnalyzerDesign
import kpn.core.db.views.ChangesDesign
import kpn.core.db.views.LocationDesign
import kpn.core.db.views.PlannerDesign
import kpn.server.repository.DesignRepositoryImpl
import org.scalatest.Assertions

import scala.io.Source

object TestSupport extends Assertions {

  private val count = new AtomicInteger(0)

  def sync[T](awaitable: Awaitable[T]): T = {
    Await.result(awaitable, Duration(3, SECONDS))
  }

  private var couch: Option[Couch] = None

  /**
   * Perform given function with a freshly created database. The database is deleted
   * afterwards.
   */
  def withOldDatabase(f: OldDatabase => Unit): Unit = {
    withOldDatabase(keepDatabaseAfterTest = false)(f: OldDatabase => Unit)
  }

  /**
   * Perform given function with a freshly created database.
   */
  def withOldDatabase(keepDatabaseAfterTest: Boolean = false)(f: OldDatabase => Unit): Unit = {

    withOldCouch { c =>
      val dbname = "unit-testdb-" + count.incrementAndGet()

      val oldDatabase = new OldDatabaseImpl(c, dbname)
      if (oldDatabase.exists) {
        oldDatabase.delete()
      }
      oldDatabase.create()

      val database = new DatabaseImpl(DatabaseContext(c.config, Couch.objectMapper, dbname))

      new DesignRepositoryImpl(database).save(AnalyzerDesign)
      new DesignRepositoryImpl(database).save(ChangesDesign)
      new DesignRepositoryImpl(database).save(PlannerDesign)
      new DesignRepositoryImpl(database).save(LocationDesign)

      try {
        f(oldDatabase)
      } finally {
        if (!keepDatabaseAfterTest) {
          oldDatabase.delete()
        }
      }
    }
  }

  def withOldCouch(action: Couch => Unit): Unit = {

    if (couch.isEmpty) {
      val system = ActorSystemConfig.actorSystem()

      val properties = new File(System.getProperty("user.home") + "/.osm/osm.properties")
      val config = ConfigFactory.parseFile(properties)
      val user = config.getString("couchdb.user")
      val password = config.getString("couchdb.password")
      val host = config.getString("couchdb.host")
      val port = config.getInt("couchdb.port")

      val couchConfig = CouchConfig(host, port, user, password)
      couch = Some(new Couch(system, couchConfig))
    }

    action(couch.get)
  }

  // =====================

  def withEnvironment(action: (CouchConfig, ObjectMapper) => Unit): Unit = {
    val couchConfig = readCouchConfig()
    action(couchConfig, Couch.objectMapper)
  }

  /**
   * Perform given function with a freshly created database. The database is deleted
   * afterwards.
   */
  def withDatabase(f: Database => Unit): Unit = {
    withDatabase(keepDatabaseAfterTest = false)(f: Database => Unit)
  }

  /**
   * Perform given function with a freshly created database.
   */
  def withDatabase(keepDatabaseAfterTest: Boolean = false)(f: Database => Unit): Unit = {

    withEnvironment { (couchConfig, objectMapper) =>

      val databaseName = "unit-testdb-" + count.incrementAndGet()

      val database = new DatabaseImpl(DatabaseContext(couchConfig, objectMapper, databaseName))

      if (database.exists) {
        database.delete()
      }

      database.create()

      try {
        f(database)
      } finally {
        if (!keepDatabaseAfterTest) {
          database.delete()
        }
      }
    }
  }

  private def readCouchConfig(): CouchConfig = {

    val properties: Properties = new Properties()
    val source = Source.fromFile("/kpn/conf/test.properties")
    properties.load(source.bufferedReader())

    val user = properties.getProperty("couch.user")
    val password = properties.getProperty("couch.password")
    val host = properties.getProperty("couch.host")
    val port = properties.getProperty("couch.port").toInt

    CouchConfig(host, port, user, password)
  }

}
