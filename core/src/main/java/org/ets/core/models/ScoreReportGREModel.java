package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ScoreReportGREModel {

	@ValueMapValue
	private String dateLabel;

	@ValueMapValue
	private String datePlaceholder;

	@ValueMapValue
	private String dateAriaLabel;

	@ValueMapValue
	private String monthLabel;

	@ValueMapValue
	private String monthPlaceholder;

	@ValueMapValue
	private String monthAriaLabel;

	@ValueMapValue
	private String yearLabel;

	@ValueMapValue
	private String yearPlaceholder;

	@ValueMapValue
	private String yearAriaLabel;

	@ValueMapValue
	private String disclaimerAlt;

	@ValueMapValue
	private String desc1;

	@ValueMapValue
	private String desc2;

	public String getDateLabel() {
		return dateLabel;
	}

	public String getDatePlaceholder() {
		return datePlaceholder;
	}

	public String getDateAriaLabel() {
		return dateAriaLabel;
	}

	public String getMonthLabel() {
		return monthLabel;
	}

	public String getMonthPlaceholder() {
		return monthPlaceholder;
	}

	public String getMonthAriaLabel() {
		return monthAriaLabel;
	}

	public String getYearLabel() {
		return yearLabel;
	}

	public String getYearPlaceholder() {
		return yearPlaceholder;
	}

	public String getYearAriaLabel() {
		return yearAriaLabel;
	}

	public String getDisclaimerAlt() {
		return disclaimerAlt;
	}

	public String getDesc1() {
		return desc1;
	}

	public String getDesc2() {
		return desc2;
	}
}
