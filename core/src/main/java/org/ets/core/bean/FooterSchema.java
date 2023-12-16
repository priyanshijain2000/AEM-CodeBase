package org.ets.core.bean;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FooterSchema {

    private String firstLevelLinkLabel;
    private List<FooterSchema> secondLevelFooterNavigation;
    private String secondLevelLinkLabel;
    private String linkImage;
    private String image;
    private String socialFollowUpText;
    private List<FooterSchema> socialWidgetSection;
    private String socialIconName;
    private String newsletter;
    private String copyrgtText;
    private String externalLinkDisclaimerText;
    private String awardImage;
    private String altText;
    private Map<String,String> linkTypeContainer;
    private List<String> restrictedCountry;
    private List<String> allowedCountry;

    public String getFirstLevelLinkLabel() {
        return firstLevelLinkLabel;
    }
    public void setFirstLevelLinkLabel(String firstLevelLinkLabel) {
        this.firstLevelLinkLabel = firstLevelLinkLabel;
    }

    public String getSecondLevelLinkLabel() {
        return secondLevelLinkLabel;
    }
    public void setSecondLevelLinkLabel(String secondLevelLinkLabel) {
        this.secondLevelLinkLabel = secondLevelLinkLabel;
    }

    public String getSocialIconName() {
        return socialIconName;
    }
    public void setSocialIconName(String socialIconName) {
        this.socialIconName = socialIconName;
    }

    public String getLinkImage() {
        return linkImage;
    }
    public void setLinkImage(String linkImage) {
        this.linkImage = linkImage;
    }

    public String getSocialFollowUpText() {
        return socialFollowUpText;
    }
    public void setSocialFollowUpText(String socialFollowUpText) {
        this.socialFollowUpText = socialFollowUpText;
    }

    public String getNewsletter() {
        return newsletter;
    }
    public void setNewsletter(String newsletter) {
        this.newsletter = newsletter;
    }

    public String getCopyrgtText() {
        return copyrgtText;
    }
    public void setCopyrgtText(String copyrgtText) {
        this.copyrgtText = copyrgtText;
    }

    public String getExternalLinkDisclaimerText() {
        return externalLinkDisclaimerText;
    }
    public void setExternalLinkDisclaimerText(String externalLinkDisclaimerText) {
        this.externalLinkDisclaimerText = externalLinkDisclaimerText;
    }

    public List<String> getRestrictedCountry() { return new ArrayList<>(restrictedCountry); }

    public void setRestrictedCountry(List<String> restrictedCountry) { this.restrictedCountry = new ArrayList<>(restrictedCountry); }

    public List<String> getAllowedCountry() { return new ArrayList<>(allowedCountry); }

    public void setAllowedCountry(List<String> allowedCountry) { this.allowedCountry = new ArrayList<>(allowedCountry); }

    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }

    public String getAltText() {
        return altText;
    }
    public void setAltText(String altText) {
        this.altText = altText;
    }

    public String getAwardImage() {
        return awardImage;
    }
    public void setAwardImage(String awardImage) {
        this.awardImage = awardImage;
    }

    public Map<String,String> getLinkTypeContainer() { return linkTypeContainer; }
    public void setLinkTypeContainer(Map<String,String> linkTypeContainer) { this.linkTypeContainer = new HashMap<>(linkTypeContainer); }

    public List<FooterSchema> getSecondLevelFooterNavigation() { return secondLevelFooterNavigation; }
    public void setSecondLevelFooterNavigation(List<FooterSchema> secondLevelFooterNavigation) { this.secondLevelFooterNavigation = new ArrayList<>(secondLevelFooterNavigation); }

    public List<FooterSchema> getSocialWidgetSection() { return socialWidgetSection; }
    public void setSocialWidgetSection(List<FooterSchema> socialWidgetSection) { this.socialWidgetSection = new ArrayList<>(socialWidgetSection); }

}
