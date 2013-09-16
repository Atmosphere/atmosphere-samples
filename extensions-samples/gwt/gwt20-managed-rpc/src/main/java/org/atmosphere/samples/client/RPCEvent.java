/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.atmosphere.samples.client;

import java.io.Serializable;

public class RPCEvent implements Serializable {

    private String data;
    
    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
    
}
