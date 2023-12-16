package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FilterDropdownModel {

	@ValueMapValue
	private String json;

	@ValueMapValue
	private String dataTemplate;

	@ValueMapValue
	private String sectionTitle;

	@ValueMapValue
	private String placeholderText;

	@ValueMapValue
	private String primaryLabel;

	@ValueMapValue
	private String secondaryPlaceholderText;

	@ValueMapValue
	private String secondaryLabel;

	@ValueMapValue
	private String inputAriaLabel;

	public String getJson() {
		return json;
	}

	public String getDataTemplate() {
		return dataTemplate;
	}

	public String getSectionTitle() {
		return sectionTitle;
	}

	public String getPlaceholderText() {
		return placeholderText;
	}

	public String getPrimaryLabel() {
		return primaryLabel;
	}

	public String getSecondaryPlaceholderText() {
		return secondaryPlaceholderText;
	}

	public String getSecondaryLabel() {
		return secondaryLabel;
	}

	public String getInputAriaLabel() {
		return inputAriaLabel;
	}
}
