name := "chat"

version := "1.0"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

libraryDependencies += "org.atmosphere" % "atmosphere-play" % "2.5.0"
libraryDependencies += "ch.qos.logback" % "logback-classic" % "1.0.13"
libraryDependencies += "ch.qos.logback" % "logback-core" % "1.0.13"
libraryDependencies += "org.atmosphere" % "atmosphere-runtime" % "2.7.6"
libraryDependencies += "org.apache.geronimo.specs" % "geronimo-servlet_3.0_spec" % "1.0"
libraryDependencies += "com.fasterxml.jackson.core" % "jackson-databind" % "2.8.11"
libraryDependencies += "javax.inject" % "javax.inject" % "1"
libraryDependencies += guice
libraryDependencies += "org.apache.commons" % "commons-lang3" % "3.12.0"


PlayKeys.devSettings := Seq("play.server.http.port" -> "8080")
