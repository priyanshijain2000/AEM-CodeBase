package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class VideoModel {

	@ValueMapValue
	private String videoid;

	@ValueMapValue
	private String thumbnail;

	@ValueMapValue
	private String caption;

	@ValueMapValue
	private String text;

	@ValueMapValue
	private String link;

	@ValueMapValue
	private String altText;

	@ValueMapValue
	private String description;

	@ValueMapValue
	private String newTab;

	@ValueMapValue
	private String layoutStyle;

	public String getVideoid() {
		return videoid;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public String getCaption() {
		return caption;
	}

	public String getText() {
		return text;
	}

	public String getLink() {
		return link;
	}

	public String getAltText() {
		return altText;
	}

	public String getDescription() {
		return description;
	}

	public String getNewTab() {
		return newTab;
	}

	public String getLayoutStyle() {
		return layoutStyle;
	}
}
