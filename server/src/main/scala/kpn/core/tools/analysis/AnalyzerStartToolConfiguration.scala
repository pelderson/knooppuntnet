package kpn.core.tools.analysis

import akka.actor.ActorSystem
import kpn.core.database.Database
import kpn.core.overpass.CachingOverpassQueryExecutor
import kpn.core.overpass.OverpassQueryExecutorImpl
import kpn.core.tools.config.AnalysisDataLoaderConfiguration
import kpn.core.tools.config.Dirs
import kpn.core.tools.status.StatusRepository
import kpn.core.tools.status.StatusRepositoryImpl
import kpn.server.analyzer.engine.DatabaseIndexer
import kpn.server.analyzer.engine.analysis.ChangeSetInfoUpdater
import kpn.server.analyzer.engine.analysis.country.CountryAnalyzerImpl
import kpn.server.analyzer.engine.analysis.location.LocationConfigurationReader
import kpn.server.analyzer.engine.analysis.location.NodeLocationAnalyzerImpl
import kpn.server.analyzer.engine.analysis.location.RouteLocatorImpl
import kpn.server.analyzer.engine.analysis.network.NetworkAnalyzerImpl
import kpn.server.analyzer.engine.analysis.network.NetworkRelationAnalyzerImpl
import kpn.server.analyzer.engine.analysis.route.MasterRouteAnalyzerImpl
import kpn.server.analyzer.engine.analysis.route.analyzers.AccessibilityAnalyzerImpl
import kpn.server.analyzer.engine.changes.OsmChangeRepository
import kpn.server.analyzer.engine.changes.changes.ChangeSetInfoApiImpl
import kpn.server.analyzer.engine.changes.changes.RelationAnalyzer
import kpn.server.analyzer.engine.changes.changes.RelationAnalyzerImpl
import kpn.server.analyzer.engine.changes.data.AnalysisData
import kpn.server.analyzer.engine.context.AnalysisContext
import kpn.server.analyzer.engine.tile.NodeTileAnalyzerImpl
import kpn.server.analyzer.engine.tile.RouteTileAnalyzerImpl
import kpn.server.analyzer.engine.tile.TileCalculatorImpl
import kpn.server.analyzer.load.AnalysisDataLoader
import kpn.server.analyzer.load.NetworkLoaderImpl
import kpn.server.analyzer.load.NodeLoaderImpl
import kpn.server.analyzer.load.RouteLoader
import kpn.server.analyzer.load.RouteLoaderImpl
import kpn.server.repository.AnalysisRepository
import kpn.server.repository.AnalysisRepositoryImpl
import kpn.server.repository.BlackListRepositoryImpl
import kpn.server.repository.ChangeSetInfoRepositoryImpl
import kpn.server.repository.ChangeSetRepositoryImpl
import kpn.server.repository.FactRepositoryImpl
import kpn.server.repository.NetworkRepositoryImpl
import kpn.server.repository.NodeInfoBuilderImpl
import kpn.server.repository.NodeRepositoryImpl
import kpn.server.repository.OrphanRepositoryImpl
import kpn.server.repository.RouteRepositoryImpl

class AnalyzerStartToolConfiguration(
  system: ActorSystem,
  analysisDatabase: Database,
  changeDatabase: Database,
  poiDatabase: Database
) {

  val dirs: Dirs = Dirs()

  private val locationConfiguration = new LocationConfigurationReader().read()
  private val routeLocator = new RouteLocatorImpl(locationConfiguration)
  private val nodeLocationAnalyzer = new NodeLocationAnalyzerImpl(locationConfiguration, true)

  private val networkRepository = new NetworkRepositoryImpl(analysisDatabase)
  private val routeRepository = new RouteRepositoryImpl(analysisDatabase, routeLocator)
  private val nodeRepository = new NodeRepositoryImpl(analysisDatabase)

  private val tileCalculator = new TileCalculatorImpl()
  private val nodeTileAnalyzer = new NodeTileAnalyzerImpl(tileCalculator)
  private val nodeInfoBuilder = new NodeInfoBuilderImpl(nodeTileAnalyzer, nodeLocationAnalyzer)
  private val routeTileAnalyzer = new RouteTileAnalyzerImpl(tileCalculator)

  val analysisRepository: AnalysisRepository = new AnalysisRepositoryImpl(
    analysisDatabase,
    networkRepository,
    routeRepository,
    nodeRepository,
    nodeInfoBuilder
  )

  val statusRepository: StatusRepository = new StatusRepositoryImpl(dirs)

  val changeSetInfoApi = new ChangeSetInfoApiImpl(dirs.changeSets)

  val nonCachingExecutor = new OverpassQueryExecutorImpl()

  val cachingExecutor = new CachingOverpassQueryExecutor(dirs.cache, nonCachingExecutor)

  val osmChangeRepository = new OsmChangeRepository(dirs.replicate)

  val analysisDatabaseIndexer: DatabaseIndexer = new DatabaseIndexer(analysisDatabase, changeDatabase, poiDatabase)

  val analysisData: AnalysisData = AnalysisData()

  val analysisContext = new AnalysisContext()

  val relationAnalyzer: RelationAnalyzer = new RelationAnalyzerImpl(analysisContext)

  val countryAnalyzer = new CountryAnalyzerImpl(relationAnalyzer)

  val changeSetRepository = new ChangeSetRepositoryImpl(analysisDatabase)

  val changeSetInfoRepository = new ChangeSetInfoRepositoryImpl(analysisDatabase)

  private val blackListRepository = new BlackListRepositoryImpl(analysisDatabase)

  private val changeSetInfoUpdater = new ChangeSetInfoUpdater {
    override def changeSetInfo(changeSetId: Long): Unit = {}
  }

  val orphanRepository = new OrphanRepositoryImpl(analysisDatabase)

  val factRepository = new FactRepositoryImpl(analysisDatabase)

  val nodeLoader = new NodeLoaderImpl(
    nonCachingExecutor,
    cachingExecutor,
    countryAnalyzer
  )

  val routeLoader: RouteLoader = new RouteLoaderImpl(
    cachingExecutor,
    countryAnalyzer
  )

  val routeAnalyzer = new MasterRouteAnalyzerImpl(
    analysisContext,
    new AccessibilityAnalyzerImpl(),
    routeTileAnalyzer
  )

  val analysisDataLoader: AnalysisDataLoader = new AnalysisDataLoaderConfiguration(
    system,
    analysisContext,
    dirs.cache,
    nonCachingExecutor,
    cachingExecutor,
    orphanRepository,
    analysisRepository,
    factRepository,
    blackListRepository,
    changeSetInfoUpdater,
    relationAnalyzer,
    countryAnalyzer,
    nodeLoader,
    nodeLocationAnalyzer,
    analysisDatabaseIndexer
  ).analysisDataLoader

  val networkLoader = new NetworkLoaderImpl(cachingExecutor)
  val networkRelationAnalyzer = new NetworkRelationAnalyzerImpl(relationAnalyzer, countryAnalyzer)
  val networkAnalyzer = new NetworkAnalyzerImpl(analysisContext, relationAnalyzer, countryAnalyzer, routeAnalyzer)

}