package org.atmosphere.samples.shared;

import java.io.Serializable;

public class EventBar extends BaseEvent implements Serializable
{
	/**
	 * 
	 */
	private static final long	serialVersionUID	= 1L;
	
	public EventBar()
	{
		super();
		eventyp = "EventBar";
		
	}
	
	@Override
	public String toString()
	{
		return "EventBar [data1=" + data1 + ", data2=" + data2 + ", toString()=" + super.toString() + "]";
	}

	public String getData1()
	{
		return data1;
	}
	public void setData1(String data1)
	{
		this.data1 = data1;
	}
	public String getData2()
	{
		return data2;
	}
	public void setData2(String data2)
	{
		this.data2 = data2;
	}
	String data1;
	String data2;

}
