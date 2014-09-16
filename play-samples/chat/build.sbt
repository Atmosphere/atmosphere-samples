name := "chat"

version := "1.0"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

resolvers += "Sonatype Releases" at "http://oss.sonatype.org/content/repositories/releases"

libraryDependencies += "org.atmosphere" % "atmosphere-play" % "2.0.0"

