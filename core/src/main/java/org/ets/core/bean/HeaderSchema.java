package org.ets.core.bean;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HeaderSchema {

    private String title;
    private String deviceDisplay;
    private List<String> allowedCountry;
    private String country;
    private String linkImage;
    private String viewType;
    private List<String> userDisplay;
    private String travelType;
    private String expirationDate;
    private Map<String,String> linkTypeContainer;
    private List<HeaderSchema> secondLevelNavigationContainer;
    private List<HeaderSchema> thirdLevelNavigationContainer;
    private List<HeaderSchema> l4l5NavigationContainer;
    private List<HeaderSchema> fourthLevelNavigationContainer;
    private List<HeaderSchema> fifthLevelNavigationContainer;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDeviceDisplay() { return deviceDisplay; }

    public void setDeviceDisplay(String deviceDisplay) { this.deviceDisplay = deviceDisplay; }

    public List<String> getAllowedCountry() { return new ArrayList<>(allowedCountry); }

    public void setAllowedCountry(List<String> allowedCountry) { this.allowedCountry = new ArrayList<>(allowedCountry); }

    public String getCountry() { return country; }

    public void setCountry(String country) { this.country = country; }

    public String getLinkImage() { return linkImage; }

    public void setLinkImage(String linkImage) { this.linkImage = linkImage; }

    public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

    public String getTravelType() {
        return travelType;
    }

    public void setTravelType(String travelType) {
        this.travelType = travelType;
    }

    public List<String> getUserDisplay() {
        return new ArrayList<>(userDisplay);
    }

    public void setUserDisplay(List<String> userDisplay) {
        this.userDisplay = new ArrayList<>(userDisplay);
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Map<String,String> getLinkTypeContainer() { return linkTypeContainer; }

    public void setLinkTypeContainer(Map<String,String> linkTypeContainer) { this.linkTypeContainer = new HashMap<>(linkTypeContainer); }

    public List<HeaderSchema> getL4l5NavigationContainer() { return l4l5NavigationContainer; }
    public void setL4l5NavigationContainer(List<HeaderSchema> l4l5NavigationContainer) { this.l4l5NavigationContainer = new ArrayList<>(l4l5NavigationContainer); }

    public List<HeaderSchema> getFourthLevelNavigationContainer() { return fourthLevelNavigationContainer; }
    public void setFourthLevelNavigationContainer(List<HeaderSchema> fourthLevelNavigationContainer) { this.fourthLevelNavigationContainer = new ArrayList<>(fourthLevelNavigationContainer); }

    public List<HeaderSchema> getFifthLevelNavigationContainer() { return fifthLevelNavigationContainer; }
    public void setFifthLevelNavigationContainer(List<HeaderSchema> fifthLevelNavigationContainer) { this.fifthLevelNavigationContainer = new ArrayList<>(fifthLevelNavigationContainer); }

    public List<HeaderSchema> getSecondLevelNavigationContainer() { return secondLevelNavigationContainer; }
    public void setSecondLevelNavigationContainer(List<HeaderSchema> secondLevelNavigationContainer) { this.secondLevelNavigationContainer = new ArrayList<>(secondLevelNavigationContainer); }

    public List<HeaderSchema> getThirdLevelNavigationContainer() { return thirdLevelNavigationContainer; }
    public void setThirdLevelNavigationContainer(List<HeaderSchema> thirdLevelNavigationContainer) { this.thirdLevelNavigationContainer = new ArrayList<>(thirdLevelNavigationContainer); }

}