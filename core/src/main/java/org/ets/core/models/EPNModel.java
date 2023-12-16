package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class EPNModel {
	
	@ValueMapValue
	private String path;
	
	@ValueMapValue
	private String placeholder1;
	
	@ValueMapValue
	private String placeholder2;

	public String getPath() {
		return path;
	}

	public String getPlaceholder1() {
		return placeholder1;
	}

	public String getPlaceholder2() {
		return placeholder2;
	}
}
