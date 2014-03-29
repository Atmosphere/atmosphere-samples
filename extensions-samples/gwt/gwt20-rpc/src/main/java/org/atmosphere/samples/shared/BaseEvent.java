package org.atmosphere.samples.shared;

import java.io.Serializable;

public class BaseEvent implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    String eventyp;
    
    @Override
    public String toString() {
        return "BaseEvent [eventyp=" + eventyp + "]";
    }
    
}
