package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SearchFieldModel {

	@ValueMapValue
	private String path;

	@ValueMapValue
	private String placeHolderText;

	@ValueMapValue
	private String ctaLabel;

	@ValueMapValue
	private String ctaButtonAriaLabel;

	@ValueMapValue
	private String inputAriaLabel;

	@ValueMapValue
	private String dropdownAriaLabel;

	public String getPath() {
		return path;
	}

	public String getPlaceHolderText() {
		return placeHolderText;
	}

	public String getCtaLabel() {
		return ctaLabel;
	}

	public String getCtaButtonAriaLabel() {
		return ctaButtonAriaLabel;
	}

	public String getInputAriaLabel() {
		return inputAriaLabel;
	}

	public String getDropdownAriaLabel() {
		return dropdownAriaLabel;
	}
}
