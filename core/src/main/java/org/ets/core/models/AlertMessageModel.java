package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AlertMessageModel {

	@ValueMapValue
	private boolean onoff;

	@ValueMapValue
	private String icon;

	@ValueMapValue
	private String altText;

	@ValueMapValue
	private String alertdesc;

	@ValueMapValue
	private String ariaLabel;

	public boolean isOnoff() {
		return onoff;
	}

	public String getIcon() {
		return icon;
	}

	public String getAltText() {
		return altText;
	}

	public String getAlertdesc() {
		return alertdesc;
	}

	public String getAriaLabel() {
		return ariaLabel;
	}
}