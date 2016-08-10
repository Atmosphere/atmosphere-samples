### Using the sample

This sample can be installed on any OSGi container. In the following,
Apache Karaf is used as the OSGi container.

If you do not have Karaf installed, download apache-karaf-3.0.4.tar.gz from one of the [mirror sites](http://www.apache.org/dyn/closer.cgi/karaf/3.0.4/apache-karaf-3.0.4.tar.gz) and unpack the archive.

```bash
$ wget -N http://ftp.halifax.rwth-aachen.de/apache/karaf/3.0.4/apache-karaf-3.0.4.tar.gz
$ tar -zxf apache-karaf-3.0.4.tar.gz
$ cd apache-karaf-3.0.4
```

#### Starting Karaf

```bash
$ bin/karaf 
        __ __                  ____      
       / //_/____ __________ _/ __/      
      / ,<  / __ `/ ___/ __ `/ /_        
     / /| |/ /_/ / /  / /_/ / __/        
    /_/ |_|\__,_/_/   \__,_/_/         

  Apache Karaf (3.0.4)

Hit '<tab>' for a list of available commands
and '[cmd] --help' for help on a specific command.
Hit '<ctrl-d>' or type 'system:shutdown' or 'logout' to shutdown Karaf.

karaf@root()> 
```

#### Install the required bundles

Install the required bundles by executing the following commands.

```bash
feature:install war
feature:install cxf-jaxrs
feature:repo-add cxf 3.1.7
install -s mvn:org.atmosphere/atmosphere-runtime/2.4.3
install -s mvn:com.fasterxml.jackson.core/jackson-core/2.6.6
install -s mvn:com.fasterxml.jackson.core/jackson-annotations/2.6.6
install -s mvn:com.fasterxml.jackson.core/jackson-databind/2.6.6
install -s mvn:com.fasterxml.jackson.jaxrs/jackson-jaxrs-base/2.6.6
install -s mvn:com.fasterxml.jackson.jaxrs/jackson-jaxrs-json-provider/2.6.6
```

The above commands will install the required bundles for this sample. Finally,
install this sample (TODO use a released 2.4.x version number once it is released)

```
install -s mvn:org.atmosphere.samples/atmosphere-cxf-chat-osgi/2.5.0-SNAPSHOT
```

Shown below is the output from running the above Karaf console commands.

```
karaf@root()> feature:install war
karaf@root()> feature:repo-add cxf 3.1.7
Adding feature url mvn:org.apache.cxf.karaf/apache-cxf/3.1.7/xml/features
karaf@root()> feature:install cxf-jaxrs
Refreshing bundles org.eclipse.jetty.aggregate.jetty-all-server (70), org.apache.geronimo.specs.geronimo-jaspic_1.0_spec (69)
karaf@root()> install -s mvn:org.atmosphere/atmosphere-runtime/2.4.3
Bundle ID: 121
karaf@root()> install -s mvn:com.fasterxml.jackson.core/jackson-core/2.6.6
Bundle ID: 122
karaf@root()> install -s mvn:com.fasterxml.jackson.core/jackson-annotations/2.6.6
Bundle ID: 123
karaf@root()> install -s mvn:com.fasterxml.jackson.core/jackson-databind/2.6.6
Bundle ID: 124
karaf@root()> install -s mvn:com.fasterxml.jackson.jaxrs/jackson-jaxrs-base/2.6.6
Bundle ID: 125
karaf@root()> install -s mvn:com.fasterxml.jackson.jaxrs/jackson-jaxrs-json-provider/2.6.6
Bundle ID: 126
karaf@root()> install -s mvn:org.atmosphere.samples/atmosphere-cxf-chat-osgi/2.4.6-SNAPSHOT
Bundle ID: 127
karaf@root()>
```

You can verify the bundles are started and the sample application is registered by
running commands list and web:list.

```bash
karaf@root()> list
START LEVEL 100 , List Threshold: 50
 ID | State  | Lvl | Version        | Name                
----------------------------------------------------------
121 | Active |  80 | 2.4.3          | atmosphere-runtime  
122 | Active |  80 | 2.6.6          | Jackson-core        
123 | Active |  80 | 2.6.6          | Jackson-annotations 
124 | Active |  80 | 2.6.6          | jackson-databind    
125 | Active |  80 | 2.6.6          | Jackson-JAXRS-base  
126 | Active |  80 | 2.6.6          | Jackson-JAXRS-JSON  
127 | Active |  80 | 2.4.6.SNAPSHOT | atmosphere-rest-chat
karaf@root()> web:list
ID  | State       | Web-State   | Level | Web-ContextPath      | Name                                 
------------------------------------------------------------------------------------------------------
127 | Active      | Deployed    | 80    | /atmosphere-cxf-chat | atmosphere-rest-chat (2.4.6.SNAPSHOT)
karaf@root()> 
```

Using Browser, open [http://localhost:8181/atmosphere-cxf-chat](http://localhost:8181/atmosphere-cxf-chat) to visit this sample's chat page.

You can also use the node.js client of sample [chat-node-client](../chat-node-client/README.md) with the target URL: http://localhost:8181/atmosphere-cxf-chat/chat
