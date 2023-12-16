package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AcceptanceListModel {
	
	@ValueMapValue
	private String json;

	@ValueMapValue
	private String norecmsg;

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
	private String footnote;

	@ValueMapValue
	private String searchBoxPlaceholder;
	
	@ValueMapValue
	private String searchLabel;

	@ValueMapValue
	private String entriesLabel;

	@ValueMapValue
	private String countryLabel;

	@ValueMapValue
	private String stateLabel;

	@ValueMapValue
	private String institutionLabel;
	
	@ValueMapValue
	private String programLabel;

	@ValueMapValue
	private String searchAlt;
	
	@ValueMapValue
	private String rightArrowAlt;

	@ValueMapValue
	private String arrowAlt;

	@ValueMapValue
	private String searchAriaLabel;

	@ValueMapValue
	private String entriesAriaLabel;

	public String getJson() {
		return json;
	}

	public String getNorecmsg() {
		return norecmsg;
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

	public String getFootnote() {
		return footnote;
	}

	public String getSearchBoxPlaceholder() {
		return searchBoxPlaceholder;
	}

	public String getSearchLabel() {
		return searchLabel;
	}

	public String getEntriesLabel() {
		return entriesLabel;
	}

	public String getCountryLabel() {
		return countryLabel;
	}

	public String getStateLabel() {
		return stateLabel;
	}

	public String getInstitutionLabel() {
		return institutionLabel;
	}

	public String getProgramLabel() {
		return programLabel;
	}

	public String getSearchAlt() {
		return searchAlt;
	}

	public String getRightArrowAlt() {
		return rightArrowAlt;
	}

	public String getArrowAlt() {
		return arrowAlt;
	}

	public String getSearchAriaLabel() {
		return searchAriaLabel;
	}

	public String getEntriesAriaLabel() {
		return entriesAriaLabel;
	}
}
