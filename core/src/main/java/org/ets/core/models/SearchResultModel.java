package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SearchResultModel {

	@ValueMapValue
	private String path;

	@ValueMapValue
	private String placeHolderText;

	@ValueMapValue
	private String ctaLabel;

	@ValueMapValue
	private String ctaButtonAriaLabel;

	@ValueMapValue
	private String searchAriaLabel;

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

	@ValueMapValue
	private String noKeywordMsg;

	@ValueMapValue
	private String noResultMsg;

	@ValueMapValue
	private String filterLabel;

	@ValueMapValue
	private String publicationYear;

	@ValueMapValue
	private String subjectLabel;

	@ValueMapValue
	private String subjectPlaceholder;

	@ValueMapValue
	private String subjectAriaLabel;

	@ValueMapValue
	private String authorLabel;

	@ValueMapValue
	private String authorPlaceholder;

	@ValueMapValue
	private String authorAriaLabel;

	@ValueMapValue
	private String formatsLabel;

	@ValueMapValue
	private String formatsPlaceholder;

	@ValueMapValue
	private String formatsAriaLabel;

	@ValueMapValue
	private String applyFiltersButton;

	@ValueMapValue
	private String clearFiltersButton;

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

	public String getSearchAriaLabel() {
		return searchAriaLabel;
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

	public String getNoKeywordMsg() {
		return noKeywordMsg;
	}

	public String getNoResultMsg() {
		return noResultMsg;
	}

	public String getFilterLabel() {
		return filterLabel;
	}

	public String getPublicationYear() {
		return publicationYear;
	}

	public String getSubjectLabel() {
		return subjectLabel;
	}

	public String getSubjectPlaceholder() {
		return subjectPlaceholder;
	}

	public String getSubjectAriaLabel() {
		return subjectAriaLabel;
	}

	public String getAuthorLabel() {
		return authorLabel;
	}

	public String getAuthorPlaceholder() {
		return authorPlaceholder;
	}

	public String getAuthorAriaLabel() {
		return authorAriaLabel;
	}

	public String getFormatsLabel() {
		return formatsLabel;
	}

	public String getFormatsPlaceholder() {
		return formatsPlaceholder;
	}

	public String getFormatsAriaLabel() {
		return formatsAriaLabel;
	}

	public String getApplyFiltersButton() {
		return applyFiltersButton;
	}

	public String getClearFiltersButton() {
		return clearFiltersButton;
	}
}
