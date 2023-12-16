package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CoreValuesModel {

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String image;

	@ValueMapValue
	private String altText;

	@ValueMapValue
	private String deviceType;

	@ValueMapValue
	private String adjustLeftRight;

	@ValueMapValue
	private String adjustTopBottom;

	@ValueMapValue
	private String adjustLeftRightTab;

	@ValueMapValue
	private String adjustTopBottomTab;

	@ValueMapValue
	private String adjustLeftRightMobile;

	@ValueMapValue
	private String adjustTopBottomMobile;

	public String getTitle() {
		return title;
	}

	public String getImage() {
		return image;
	}

	public String getAltText() {
		return altText;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public String getAdjustLeftRight() {
		return adjustLeftRight;
	}

	public String getAdjustTopBottom() {
		return adjustTopBottom;
	}

	public String getAdjustLeftRightTab() {
		return adjustLeftRightTab;
	}

	public String getAdjustTopBottomTab() {
		return adjustTopBottomTab;
	}

	public String getAdjustLeftRightMobile() {
		return adjustLeftRightMobile;
	}

	public String getAdjustTopBottomMobile() {
		return adjustTopBottomMobile;
	}
}
