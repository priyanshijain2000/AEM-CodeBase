package org.ets.core.models;

import java.util.stream.IntStream;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GridModel {

	@ValueMapValue @Default(intValues=3)
	private int numberOfItems;
	
	@ValueMapValue
	private String numberOfColumns;
	
	@ValueMapValue
	private String alignment;

	public int[] getNumberOfItems() {
		return IntStream.range(0, numberOfItems).toArray();
	}

	public String getNumberOfColumns() {
		return numberOfColumns;
	}

	public String getAlignment() {
		return alignment;
	}
}
