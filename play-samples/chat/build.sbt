name := "chat"

version := "1.0"

scalaVersion := "2.11.2"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

resolvers += "Sonatype Releases" at "https://oss.sonatype.org/content/repositories/snapshots"

resolvers += (
    Resolver.mavenLocal
)

libraryDependencies += "org.atmosphere" % "atmosphere-play" % "2.1.0-SNAPSHOT"
