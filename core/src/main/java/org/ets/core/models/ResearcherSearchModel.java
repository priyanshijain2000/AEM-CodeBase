package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ResearcherSearchModel {

	@ValueMapValue
	private String link;

	@ValueMapValue
	private String sectionTitle;

	@ValueMapValue
	private String placeHolderText;

	@ValueMapValue
	private String ctaLabel;

	@ValueMapValue
	private String ctaButtonAriaLabel;

	@ValueMapValue
	private String searchAriaLabel;

	@ValueMapValue
	private String searchAlt;

	public String getLink() {
		return link;
	}

	public String getSectionTitle() {
		return sectionTitle;
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

	public String getSearchAriaLabel() {
		return searchAriaLabel;
	}

	public String getSearchAlt() {
		return searchAlt;
	}
}
