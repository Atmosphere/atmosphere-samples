package org.atmosphere.samples.greeter.cxf.model;




import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlEnum;

@XmlAccessorType(XmlAccessType.FIELD)
 @XmlType(name = "Pong", propOrder =
	{ "pong"
})

@XmlRootElement(name="Pong")
public class Pong  {
  

  @XmlElement(name="pong")
  private Integer pong = null;

  /**
   * pong counter
   **/
  
  public Integer getPong() {
    return pong;
  }
  public void setPong(Integer pong) {
    this.pong = pong;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Pong {\n");
    
    sb.append("    pong: ").append(toIndentedString(pong)).append("\n");
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

