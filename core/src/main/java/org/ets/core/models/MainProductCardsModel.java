package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MainProductCardsModel {

	@ValueMapValue
	private String elementStyle;

	@ValueMapValue
	private String buttonStyle;

	public String getElementStyle() {
		return elementStyle;
	}

	public String getButtonStyle() {
		return buttonStyle;
	}
}
