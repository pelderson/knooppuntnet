package kpn.core.tools

object AnalyzerStartToolOptions {

  def parse(args: Array[String]): Option[AnalyzerStartToolOptions] = {
    optionParser.parse(args, AnalyzerStartToolOptions())
  }

  private def optionParser: scopt.OptionParser[AnalyzerStartToolOptions] = {
    new scopt.OptionParser[AnalyzerStartToolOptions]("AnalyzerStartTool") {
      head("AnalyzerStartTool")

      opt[String]('c', "changes") required() valueName "<changes-database>" action { (x, c) =>
        c.copy(changeDatabaseName = x)
      } text "changes database name"

      opt[String]('a', "analysis") required() valueName "<analysis-database>" action { (x, c) =>
        c.copy(analysisDatabaseName = x)
      } text "analysis database name"

      opt[String]('p', "poi") required() valueName "<poi-database>" action { (x, c) =>
        c.copy(poiDatabaseName = x)
      } text "poi database name"
    }
  }
}

case class AnalyzerStartToolOptions(
  analysisDatabaseName: String = "",
  changeDatabaseName: String = "",
  poiDatabaseName: String = ""
)
