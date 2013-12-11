#!/bin/bash
java -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=9009 -jar target/atmosphere-websocketd-2.1.0-SNAPSHOT-process.jar
