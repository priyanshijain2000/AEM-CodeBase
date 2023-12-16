package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeroBannerModel {

	@ValueMapValue
	private String animationimage;

	@ValueMapValue
	private String altText;

	@ValueMapValue
	private String description;

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String moreinfo;

	public String getAnimationimage() {
		return animationimage;
	}

	public String getAltText() {
		return altText;
	}

	public String getDescription() {
		return description;
	}

	public String getTitle() {
		return title;
	}

	public String getMoreinfo() {
		return moreinfo;
	}
}
