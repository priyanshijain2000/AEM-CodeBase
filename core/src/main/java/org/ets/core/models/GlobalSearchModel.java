package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GlobalSearchModel {

	@ValueMapValue
	private String endpoint;

	@ValueMapValue
	private String placeholder;

	@ValueMapValue
	private String searchButtonText;

	@ValueMapValue
	private String noKeywordMsg;

	@ValueMapValue
	private String noResultMsg;

	@ValueMapValue
	private String quickLink;

	@ValueMapValue
	private String inputAriaLabel;

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
	private String filterLabel;

	public String getEndpoint() {
		return endpoint;
	}

	public String getPlaceholder() {
		return placeholder;
	}

	public String getSearchButtonText() {
		return searchButtonText;
	}

	public String getNoKeywordMsg() {
		return noKeywordMsg;
	}

	public String getNoResultMsg() {
		return noResultMsg;
	}

	public String getQuickLink() {
		return quickLink;
	}

	public String getInputAriaLabel() {
		return inputAriaLabel;
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

	public String getFilterLabel() {
		return filterLabel;
	}
}
