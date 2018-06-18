package org.atmosphere.samples.greeter.cxf.model;

import java.util.ArrayList;
import java.util.List;



import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlEnum;

@XmlAccessorType(XmlAccessType.FIELD)
 @XmlType(name = "GreetingSummary", propOrder =
	{ "greeted", "total"
})

@XmlRootElement(name="GreetingSummary")
public class GreetingSummary  {
  

  @XmlElement(name="greeted")
  private List<String> greeted = new ArrayList<String>();

  @XmlElement(name="total")
  private Integer total = null;

  /**
   * greeted persons
   **/
  
  public List<String> getGreeted() {
    return greeted;
  }
  public void setGreeted(List<String> greeted) {
    this.greeted = greeted;
  }
  /**
   * total greeting count
   **/
  
  public Integer getTotal() {
    return total;
  }
  public void setTotal(Integer total) {
    this.total = total;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GreetingSummary {\n");
    
    sb.append("    greeted: ").append(toIndentedString(greeted)).append("\n");
    sb.append("    total: ").append(toIndentedString(total)).append("\n");
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

