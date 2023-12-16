package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class DestinationSearchModel {

	@ValueMapValue
	private String destinationAPI;

	@ValueMapValue
	private String institutions;

	@ValueMapValue
	private String institutionsRadioLabel;

	@ValueMapValue
	private String locations;

	@ValueMapValue
	private String locationsRadioLabel;

	@ValueMapValue
	private String placeHolderText;

	@ValueMapValue
	private String placeholderAriaLabel;

	@ValueMapValue
	private String ctaLabel;

	@ValueMapValue
	private String ctaButtonAriaLabel;

	@ValueMapValue
	private String dropdownAriaLabel;

	@ValueMapValue
	private String dropdownListAriaLabel;

	@ValueMapValue
	private String errormsg1;

	@ValueMapValue
	private String errormsg2;

	@ValueMapValue
	private String initialContent;

	@ValueMapValue
	private String resultDisclaimer;

	@ValueMapValue
	private String prevLabel;

	@ValueMapValue
	private String nextLabel;

	@ValueMapValue
	private String countText;

	@ValueMapValue
	private String prevAriaLabel;

	@ValueMapValue
	private String nextAriaLabel;

	@ValueMapValue
	private String inputPaginationAriaLabel;

	public String getDestinationAPI() {
		return destinationAPI;
	}

	public String getInstitutions() {
		return institutions;
	}

	public String getInstitutionsRadioLabel() {
		return institutionsRadioLabel;
	}

	public String getLocations() {
		return locations;
	}

	public String getLocationsRadioLabel() {
		return locationsRadioLabel;
	}

	public String getPlaceHolderText() {
		return placeHolderText;
	}

	public String getPlaceholderAriaLabel() {
		return placeholderAriaLabel;
	}

	public String getCtaLabel() {
		return ctaLabel;
	}

	public String getCtaButtonAriaLabel() {
		return ctaButtonAriaLabel;
	}

	public String getDropdownAriaLabel() {
		return dropdownAriaLabel;
	}

	public String getDropdownListAriaLabel() {
		return dropdownListAriaLabel;
	}

	public String getErrormsg1() {
		return errormsg1;
	}

	public String getErrormsg2() {
		return errormsg2;
	}

	public String getInitialContent() {
		return initialContent;
	}

	public String getResultDisclaimer() {
		return resultDisclaimer;
	}

	public String getPrevLabel() {
		return prevLabel;
	}

	public String getNextLabel() {
		return nextLabel;
	}

	public String getCountText() {
		return countText;
	}

	public String getPrevAriaLabel() {
		return prevAriaLabel;
	}

	public String getNextAriaLabel() {
		return nextAriaLabel;
	}

	public String getInputPaginationAriaLabel() {
		return inputPaginationAriaLabel;
	}
}
