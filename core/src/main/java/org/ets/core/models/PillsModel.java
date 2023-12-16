package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PillsModel {

	@ValueMapValue
	private String pageType;

	@ValueMapValue
	private String genericPill;

	@ValueMapValue
	private String praxisPill;

	@ValueMapValue
	private String toeflPill;

	@ValueMapValue
	private String grePill;

	@ValueMapValue
	private String toeicPill;

	@ValueMapValue
	private String rndPill;

	@ValueMapValue
	private String psqPill;
	
	@ValueMapValue
	private String easPill;

	public String getPageType() {
		return pageType;
	}

	public String getGenericPill() {
		return genericPill;
	}

	public String getPraxisPill() {
		return praxisPill;
	}

	public String getToeflPill() {
		return toeflPill;
	}

	public String getGrePill() {
		return grePill;
	}

	public String getToeicPill() {
		return toeicPill;
	}

	public String getRndPill() {
		return rndPill;
	}

	public String getPsqPill() {
		return psqPill;
	}

	public String getEasPill() {
		return easPill;
	}
}
