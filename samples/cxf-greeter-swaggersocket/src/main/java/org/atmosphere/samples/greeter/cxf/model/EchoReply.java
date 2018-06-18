package org.atmosphere.samples.greeter.cxf.model;




import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlEnum;

@XmlAccessorType(XmlAccessType.FIELD)
 @XmlType(name = "EchoReply", propOrder =
	{ "echo"
})

@XmlRootElement(name="EchoReply")
public class EchoReply  {
  

  @XmlElement(name="echo")
  private String echo = null;

  /**
   * echo
   **/
  
  public String getEcho() {
    return echo;
  }
  public void setEcho(String echo) {
    this.echo = echo;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class EchoReply {\n");
    
    sb.append("    echo: ").append(toIndentedString(echo)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private static String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

