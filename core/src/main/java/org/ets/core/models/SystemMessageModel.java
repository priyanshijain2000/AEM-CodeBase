package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SystemMessageModel {

	@ValueMapValue
	private String warnDescription;

	@ValueMapValue
	private String alertDescription;

	@ValueMapValue
	private String informDescription;

	public String getWarnDescription() {
		return warnDescription;
	}

	public String getAlertDescription() {
		return alertDescription;
	}

	public String getInformDescription() {
		return informDescription;
	}
}