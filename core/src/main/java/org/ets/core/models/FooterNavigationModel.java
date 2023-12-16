package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterNavigationModel {

	@ValueMapValue
	private String logo;

	@ValueMapValue
	private String altText;

	@ValueMapValue
	private String logoAriaLabel;

	@ValueMapValue
	private String navtitle1;

	@ValueMapValue
	private String navtitle2;

	@ValueMapValue
	private String navtitle3;

	public String getLogo() {
		return logo;
	}

	public String getAltText() {
		return altText;
	}

	public String getLogoAriaLabel() {
		return logoAriaLabel;
	}

	public String getNavtitle1() {
		return navtitle1;
	}

	public String getNavtitle2() {
		return navtitle2;
	}

	public String getNavtitle3() {
		return navtitle3;
	}
}
