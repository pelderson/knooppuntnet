package kpn.core.database.views.poi

import kpn.api.common.SharedTestObjects
import kpn.core.test.TestSupport.withDatabase
import kpn.server.repository.PoiRepositoryImpl
import org.scalatest.FunSuite
import org.scalatest.Matchers

class PoiRelationIdViewTest extends FunSuite with Matchers with SharedTestObjects {

  test("all id's of pois of type 'relation'") {

    withDatabase { database =>

      val repo = new PoiRepositoryImpl(database)

      repo.save(newPoi("relation", 1))
      repo.save(newPoi("relation", 2))
      repo.save(newPoi("way", 101))
      repo.save(newPoi("node", 1001))

      PoiRelationIdView.query(database, stale = false) should equal(Seq(1, 2))
    }
  }
}