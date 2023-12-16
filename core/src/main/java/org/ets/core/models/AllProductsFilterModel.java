package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AllProductsFilterModel {
	
	@ValueMapValue
	private String sourcePath;

	@ValueMapValue
	private String allProductsText;

	@ValueMapValue
	private String searchBoxText;

	@ValueMapValue
	private String searchAriaLabel;
	
	@ValueMapValue
	private String searchText;

	@ValueMapValue
	private String noResultText;

	@ValueMapValue
	private String filterBoxText;

	@ValueMapValue
	private String filterText;
	
	@ValueMapValue
	private String searchAlt;

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

	public String getSourcePath() {
		return sourcePath;
	}

	public String getAllProductsText() {
		return allProductsText;
	}

	public String getSearchBoxText() {
		return searchBoxText;
	}

	public String getSearchAriaLabel() {
		return searchAriaLabel;
	}

	public String getSearchText() {
		return searchText;
	}

	public String getNoResultText() {
		return noResultText;
	}

	public String getFilterBoxText() {
		return filterBoxText;
	}

	public String getFilterText() {
		return filterText;
	}

	public String getSearchAlt() {
		return searchAlt;
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