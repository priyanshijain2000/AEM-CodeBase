package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PressReleaseModel {

	@ValueMapValue
	private String contentType;

	@ValueMapValue
	private String path;

	@ValueMapValue
	private String isDisplayDate;

	@ValueMapValue
	private String learnButtonTitle;

	@ValueMapValue
	private String allCategoryLabel;

	@ValueMapValue
	private String dropdownAriaLabel;

	@ValueMapValue
	private String prevLabel;

	@ValueMapValue
	private String nextLabel;

	@ValueMapValue
	private String countTextLabel;

	@ValueMapValue
	private String prevAriaLabel;

	@ValueMapValue
	private String nextAriaLabel;

	@ValueMapValue
	private String inputPaginationAriaLabel;

	public String getContentType() {
		return contentType;
	}

	public String getPath() {
		return path;
	}

	public String getIsDisplayDate() {
		return isDisplayDate;
	}

	public String getLearnButtonTitle() {
		return learnButtonTitle;
	}

	public String getAllCategoryLabel() {
		return allCategoryLabel;
	}

	public String getDropdownAriaLabel() {
		return dropdownAriaLabel;
	}

	public String getPrevLabel() {
		return prevLabel;
	}

	public String getNextLabel() {
		return nextLabel;
	}

	public String getCountTextLabel() {
		return countTextLabel;
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
