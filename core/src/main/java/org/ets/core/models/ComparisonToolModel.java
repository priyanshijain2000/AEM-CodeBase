package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ComparisonToolModel {

	@ValueMapValue
	private String header1;

	@ValueMapValue
	private String header2;

	@ValueMapValue
	private String infobox;

	public String getHeader1() {
		return header1;
	}

	public String getHeader2() {
		return header2;
	}

	public String getInfobox() {
		return infobox;
	}
}
