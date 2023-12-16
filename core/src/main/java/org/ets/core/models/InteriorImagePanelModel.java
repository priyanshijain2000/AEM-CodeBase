package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class InteriorImagePanelModel {

	@ValueMapValue
	private String bgImage;

	@ValueMapValue
	private String altText;

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String description;

	public String getBgImage() {
		return bgImage;
	}

	public String getAltText() {
		return altText;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}
}
