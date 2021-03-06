#!/usr/bin/env bash
nohup /kpn/java/bin/java \
  -Dname=poi-tile-analyzer-tool \
  -Dlog4j.configurationFile=/kpn/conf/poi-tile-analyzer-tool-log.xml \
  -Xms128M \
  -Xmx2G \
  -Dcom.sun.management.jmxremote.port=5105 \
  -Dcom.sun.management.jmxremote.authenticate=false \
  -Dcom.sun.management.jmxremote.ssl=false \
  -cp /kpn/bin/server.jar \
  -Dloader.main=kpn.core.tools.poi.PoiTileAnalyzerTool org.springframework.boot.loader.PropertiesLauncher \
  --host knooppuntnet.server \
  --poi-database pois4 \
  > /kpn/logs/poi-tile-analyzer-tool-stdout.log 2>&1 &
