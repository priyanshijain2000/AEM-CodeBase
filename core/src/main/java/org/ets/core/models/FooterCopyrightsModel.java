package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterCopyrightsModel {
	
	@ValueMapValue
	private String texttitle;

	@ValueMapValue
	private String copyrightdesc;

	@ValueMapValue
	private String cookiePlaceholder;

	public String getTexttitle() {
		return texttitle;
	}

	public String getCopyrightdesc() {
		return copyrightdesc;
	}

	public String getCookiePlaceholder() {
		return cookiePlaceholder;
	}
}
