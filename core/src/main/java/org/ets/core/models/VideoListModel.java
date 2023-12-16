package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class VideoListModel {

	@ValueMapValue
	private String videoType;

	@ValueMapValue
	private String videoPath;

	@ValueMapValue
	private String url;

	@ValueMapValue
	private String videoid;

	@ValueMapValue
	private String thumbnail;

	@ValueMapValue
	private String altText;

	@ValueMapValue
	private String videoAriaLabel;

	@ValueMapValue
	private String text;

	@ValueMapValue
	private String link;

	@ValueMapValue
	private String newTab;

	@ValueMapValue
	private String modalAriaLabel;

	@ValueMapValue
	private String closeButtonAriaLabel;

	public String getVideoType() {
		return videoType;
	}

	public String getVideoPath() {
		return videoPath;
	}

	public String getUrl() {
		return url;
	}

	public String getVideoid() {
		return videoid;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public String getAltText() {
		return altText;
	}

	public String getVideoAriaLabel() {
		return videoAriaLabel;
	}

	public String getText() {
		return text;
	}

	public String getLink() {
		return link;
	}

	public String getNewTab() {
		return newTab;
	}

	public String getModalAriaLabel() {
		return modalAriaLabel;
	}

	public String getCloseButtonAriaLabel() {
		return closeButtonAriaLabel;
	}
}
