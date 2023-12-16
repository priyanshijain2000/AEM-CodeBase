package org.ets.core.models;

import java.util.Calendar;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ScheduleCaledarModel {
	
	@ValueMapValue
	private String testLabel;

	@ValueMapValue
	private String testPlaceholder;

	@ValueMapValue
	private String testAriaLabel;

	@ValueMapValue
	private String testJsonPath;

	@ValueMapValue
	private String locationLabel;
	
	@ValueMapValue
	private String locationPlaceholder;

	@ValueMapValue
	private String locationAriaLabel;

	@ValueMapValue
	private String distanceLabel;

	@ValueMapValue
	private String distanceAriaLabel;

	@ValueMapValue
	private String testCenter;
	
	@ValueMapValue
	private String testCenterPlaceHolder;

	@ValueMapValue
	private String testCenterInfo;

	@ValueMapValue
	private String testCenterAriaLabel;

	@ValueMapValue
	private String onlyRemoteTest;

	@ValueMapValue
	private String disableTestFromHome;
	
	@ValueMapValue
	private String testFromHome;

	@ValueMapValue
	private String bannerText;
	
	@ValueMapValue
	private String testFromHomeDescription;

	@ValueMapValue
	private String dataTestAnnouncementTestFromHome;

	@ValueMapValue
	private String dataTestAnnouncementTestCenter;

	@ValueMapValue
	private String dataTestAnnouncementLocation;
	
	@ValueMapValue
	private String dataTestAnnouncementDistance;

	@ValueMapValue
	private String scheduleButtonText;

	@ValueMapValue
	private String scheduleButtonUrl;

	@ValueMapValue
	private String testFromHomeReqLink;

	@ValueMapValue
	private String testFromHomeReqText;
	
	@ValueMapValue
	private String dataCalendarDialogDescription;

	@ValueMapValue
	private String dataCalendarFocusLabel;

	@ValueMapValue
	private String addressLabel;

	@ValueMapValue
	private String availTimeLabel;

	@ValueMapValue
	private String seatsOpenLabel;
	
	@ValueMapValue
	private String getDirectionLabel;

	@ValueMapValue
	private String getDirectionAccessibleLabel;

	@ValueMapValue
	private String jsonPath;

	@ValueMapValue
	private Calendar minTestDate;

	@ValueMapValue
	private Calendar maxTestDate;
	
	@ValueMapValue
	private String loader;

	@ValueMapValue
	private String praxisDisclaimerText;
	
	@ValueMapValue
	private String days;

	@ValueMapValue
	private String testCenterShortForm;

	@ValueMapValue
	private String testCenterLegend;

	@ValueMapValue
	private String testFromHomeShortForm;
	
	@ValueMapValue
	private String testFromHomeLegend;

	@ValueMapValue
	private String bothShortForm;

	@ValueMapValue
	private String bothLegend;
	
	@ValueMapValue
	private String preselectDescText;
	
	@ValueMapValue
	private String testErrorDescText;

	@ValueMapValue
	private String locationErrorDescText;

	@ValueMapValue
	private String tooltipText;
	
	@ValueMapValue
	private String alertTitle;
	
	@ValueMapValue
	private String alertDescription;
	
	@ValueMapValue
	private String alertLinkText;

	@ValueMapValue
	private String warnTitle;

	@ValueMapValue
	private String warnDescription;

	public String getTestLabel() {
		return testLabel;
	}

	public String getTestPlaceholder() {
		return testPlaceholder;
	}

	public String getTestAriaLabel() {
		return testAriaLabel;
	}

	public String getTestJsonPath() {
		return testJsonPath;
	}

	public String getLocationLabel() {
		return locationLabel;
	}

	public String getLocationPlaceholder() {
		return locationPlaceholder;
	}

	public String getLocationAriaLabel() {
		return locationAriaLabel;
	}

	public String getDistanceLabel() {
		return distanceLabel;
	}

	public String getDistanceAriaLabel() {
		return distanceAriaLabel;
	}

	public String getTestCenter() {
		return testCenter;
	}

	public String getTestCenterPlaceHolder() {
		return testCenterPlaceHolder;
	}

	public String getTestCenterInfo() {
		return testCenterInfo;
	}

	public String getTestCenterAriaLabel() {
		return testCenterAriaLabel;
	}

	public String getOnlyRemoteTest() {
		return onlyRemoteTest;
	}

	public String getDisableTestFromHome() {
		return disableTestFromHome;
	}

	public String getTestFromHome() {
		return testFromHome;
	}

	public String getBannerText() {
		return bannerText;
	}

	public String getTestFromHomeDescription() {
		return testFromHomeDescription;
	}

	public String getDataTestAnnouncementTestFromHome() {
		return dataTestAnnouncementTestFromHome;
	}

	public String getDataTestAnnouncementTestCenter() {
		return dataTestAnnouncementTestCenter;
	}

	public String getDataTestAnnouncementLocation() {
		return dataTestAnnouncementLocation;
	}

	public String getDataTestAnnouncementDistance() {
		return dataTestAnnouncementDistance;
	}

	public String getScheduleButtonText() {
		return scheduleButtonText;
	}

	public String getScheduleButtonUrl() {
		return scheduleButtonUrl;
	}

	public String getTestFromHomeReqLink() {
		return testFromHomeReqLink;
	}

	public String getTestFromHomeReqText() {
		return testFromHomeReqText;
	}

	public String getDataCalendarDialogDescription() {
		return dataCalendarDialogDescription;
	}

	public String getDataCalendarFocusLabel() {
		return dataCalendarFocusLabel;
	}

	public String getAddressLabel() {
		return addressLabel;
	}

	public String getAvailTimeLabel() {
		return availTimeLabel;
	}

	public String getSeatsOpenLabel() {
		return seatsOpenLabel;
	}

	public String getGetDirectionLabel() {
		return getDirectionLabel;
	}

	public String getGetDirectionAccessibleLabel() {
		return getDirectionAccessibleLabel;
	}

	public String getJsonPath() {
		return jsonPath;
	}

	public Calendar getMinTestDate() {
		return minTestDate;
	}

	public Calendar getMaxTestDate() {
		return maxTestDate;
	}

	public String getLoader() {
		return loader;
	}

	public String getPraxisDisclaimerText() {
		return praxisDisclaimerText;
	}

	public String getDays() {
		return days;
	}

	public String getTestCenterShortForm() {
		return testCenterShortForm;
	}

	public String getTestCenterLegend() {
		return testCenterLegend;
	}

	public String getTestFromHomeShortForm() {
		return testFromHomeShortForm;
	}

	public String getTestFromHomeLegend() {
		return testFromHomeLegend;
	}

	public String getBothShortForm() {
		return bothShortForm;
	}

	public String getBothLegend() {
		return bothLegend;
	}

	public String getPreselectDescText() {
		return preselectDescText;
	}

	public String getTestErrorDescText() {
		return testErrorDescText;
	}

	public String getLocationErrorDescText() {
		return locationErrorDescText;
	}

	public String getTooltipText() {
		return tooltipText;
	}

	public String getAlertTitle() {
		return alertTitle;
	}

	public String getAlertDescription() {
		return alertDescription;
	}

	public String getAlertLinkText() {
		return alertLinkText;
	}

	public String getWarnTitle() {
		return warnTitle;
	}

	public String getWarnDescription() {
		return warnDescription;
	}
}
