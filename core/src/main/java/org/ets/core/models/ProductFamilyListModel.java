package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductFamilyListModel {

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String assetType;

	@ValueMapValue
	private String imagePath;

	@ValueMapValue
	private String altText;

	@ValueMapValue
	private String videoPath;

	@ValueMapValue
	private String thumbnail;

	@ValueMapValue
	private String text;

	@ValueMapValue
	private String link;

	@ValueMapValue
	private String newTab;

	@ValueMapValue
	private String tabonetitle;

	@ValueMapValue
	private String allResourcesTitle1;

	@ValueMapValue
	private String allResourcesLink1;

	@ValueMapValue
	private String ctaLinkAriaLabel1;

	@ValueMapValue
	private String newTab1;

	@ValueMapValue
	private String tabtwotitle;

	@ValueMapValue
	private String allResourcesTitle2;

	@ValueMapValue
	private String allResourcesLink2;

	@ValueMapValue
	private String ctaLinkAriaLabel2;

	@ValueMapValue
	private String newTab2;

	public String getTitle() {
		return title;
	}

	public String getAssetType() {
		return assetType;
	}

	public String getImagePath() {
		return imagePath;
	}

	public String getAltText() {
		return altText;
	}

	public String getVideoPath() {
		return videoPath;
	}

	public String getThumbnail() {
		return thumbnail;
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

	public String getTabonetitle() {
		return tabonetitle;
	}

	public String getAllResourcesTitle1() {
		return allResourcesTitle1;
	}

	public String getAllResourcesLink1() {
		return allResourcesLink1;
	}

	public String getCtaLinkAriaLabel1() {
		return ctaLinkAriaLabel1;
	}

	public String getNewTab1() {
		return newTab1;
	}

	public String getTabtwotitle() {
		return tabtwotitle;
	}

	public String getAllResourcesTitle2() {
		return allResourcesTitle2;
	}

	public String getAllResourcesLink2() {
		return allResourcesLink2;
	}

	public String getCtaLinkAriaLabel2() {
		return ctaLinkAriaLabel2;
	}

	public String getNewTab2() {
		return newTab2;
	}
}
