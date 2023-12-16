package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ButtonModel {

	@ValueMapValue
	private String userType;

	@ValueMapValue
	private String linkTarget;
	
	@ValueMapValue
	private String linkURL;

	public String getLinkURL() {
		return linkURL;
	}

	public String getUserType() {
		return userType;
	}

	public String getLinkTarget() {
		return linkTarget;
	}
}
