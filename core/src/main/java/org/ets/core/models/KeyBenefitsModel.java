package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class KeyBenefitsModel {

	@ValueMapValue
	private String variant;

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String color;

	@ValueMapValue
	private String ctaButtonLabel;

	@ValueMapValue
	private String ctaButtonLink;

	@ValueMapValue
	private String ctaButtonAriaLabel;

	@ValueMapValue
	private String newTab1;

	@ValueMapValue
	private String ctaText;

	@ValueMapValue
	private String ctaLink;

	@ValueMapValue
	private String ctaLinkAriaLabel;

	@ValueMapValue
	private String newTab2;

	public String getVariant() {
		return variant;
	}

	public String getTitle() {
		return title;
	}

	public String getColor() {
		return color;
	}

	public String getCtaButtonLabel() {
		return ctaButtonLabel;
	}

	public String getCtaButtonLink() {
		return ctaButtonLink;
	}

	public String getCtaButtonAriaLabel() {
		return ctaButtonAriaLabel;
	}

	public String getNewTab1() {
		return newTab1;
	}

	public String getCtaText() {
		return ctaText;
	}

	public String getCtaLink() {
		return ctaLink;
	}

	public String getCtaLinkAriaLabel() {
		return ctaLinkAriaLabel;
	}

	public String getNewTab2() {
		return newTab2;
	}
}
