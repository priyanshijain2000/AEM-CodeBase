package org.ets.core.services.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.AssetManager;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.apache.sling.api.resource.ResourceResolver;
import org.ets.core.bean.FooterSchema;
import org.ets.core.bean.HeaderSchema;
import org.ets.core.services.SIAFooterService;
import org.ets.core.services.SIAHeaderService;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.*;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Component(service = SIAFooterService.class, immediate = true)
public class SIAFooterServiceImpl implements SIAFooterService {
    private static final String MIME_TYPE = "application/json";
    private static final Logger log = LoggerFactory.getLogger(SIAFooterServiceImpl.class);
    private final Map<String, Object> footerDataMap = new LinkedHashMap<>();

    /**
     * Get footerJson items
     */
    @Override
    public void getFooterItems(Page parentPage, ResourceResolver resourceResolver, String jsonStorageDirectory, String jsonFileName) {
        try {
            footerDataMap.clear();
            Iterator<Page> footerPageList = parentPage.listChildren();
            while (footerPageList.hasNext()) {
                Page footerPage = footerPageList.next();
                switch (footerPage.getName()) {
                    case "footer-section":
                        List<FooterSchema> footerList = new ArrayList<>();
                        getNavigationPagesData(footerPage, footerList);
                        footerDataMap.put("footer", footerList);
                        break;
                    case "partner-label-section":
                        StringBuilder partnerLabel = new StringBuilder();
                        getPartnerLabelData(footerPage, partnerLabel);
                        footerDataMap.put("partnerLabel", partnerLabel.toString());
                        break;
                    case "membership-section":
                        List<FooterSchema> membershipList = new ArrayList<>();
                        getMembershipData(footerPage, membershipList);
                        footerDataMap.put("membershipSection", membershipList);
                        break;
                    case "social-follow-up-section":
                        FooterSchema socialFollowData = new FooterSchema();
                        getSocialFollowData(footerPage, socialFollowData);
                        footerDataMap.put("socialfollowupsection", socialFollowData);
                        break;
                    case "social-left-block-section":
                        FooterSchema socialLeftData = new FooterSchema();
                        getSocialLeftData(footerPage, socialLeftData);
                        footerDataMap.put("socialleftBlock", socialLeftData);
                        break;
                    case "copyright-section":
                        FooterSchema copyrightData = new FooterSchema();
                        getCopyrightData(footerPage, copyrightData);
                        footerDataMap.put("copyrightSection", copyrightData);
                        break;
                    case "external-link-disclaimer-section":
                        FooterSchema linkDisclaimerData = new FooterSchema();
                        getLinkDisclaimerData(footerPage, linkDisclaimerData);
                        footerDataMap.put("externalLinkDisclaimerSection", linkDisclaimerData);
                        break;
                    case "every-mundo-footer-section":
                        List<FooterSchema> mundoFooterList = new ArrayList<>();
                        getNavigationPagesData(footerPage, mundoFooterList);
                        footerDataMap.put("everyMundoFooter", mundoFooterList);
                        break;
                    case "award-image-section":
                        List<FooterSchema> awardImageList = new ArrayList<>();
                        getAwardImageData(footerPage, awardImageList);
                        footerDataMap.put("awardImageSection", awardImageList);
                        break;
                    default:
                        break;
                }
            }
            storeJsonInJcr(footerDataMap, resourceResolver, jsonStorageDirectory, jsonFileName);
        }catch (Exception e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching footer and everyMundoFooter section items
     */
    private void getNavigationPagesData(Page footerPage, List<FooterSchema> navigationList) {
        try {
            Iterator<Page> footerSectionPageList = footerPage.listChildren();
            List<FooterSchema> secondNavList = new ArrayList<>();
            while (footerSectionPageList.hasNext()) {
                FooterSchema navigationData = new FooterSchema();
                Page firstLevelPage = footerSectionPageList.next();
                navigationData = getFooterSchemaData(navigationData, firstLevelPage);
                if(firstLevelPage.listChildren().hasNext()) {
                    getSecondLevelItems(firstLevelPage, secondNavList);
                    navigationData.setSecondLevelFooterNavigation(secondNavList);
                }
                navigationList.add(navigationData);
            }
        }catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching secondLevelFooterNavigation items for footer and everyMundoFooter section
     */
    private void getSecondLevelItems(Page firstLevelPage, List<FooterSchema> secondNavList) {
        try {
            secondNavList.clear();
            Iterator<Page> secondLevelList = firstLevelPage.listChildren();
            while (secondLevelList.hasNext()) {
                FooterSchema secNavData = new FooterSchema();
                Page secondLevelPage = secondLevelList.next();
                secNavData = getFooterSchemaData(secNavData, secondLevelPage);
                secondNavList.add(secNavData);
            }
        }catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching item (partnerLabel value) for partnerLabel section
     */
    private void getPartnerLabelData(Page footerPage, StringBuilder partnerLabel) {
        try {
            Iterator<Page> partnerLabelPageList = footerPage.listChildren();
            if (partnerLabelPageList.hasNext()) {
                Page partnerLabelPage = partnerLabelPageList.next();
                Node partnerLabelNode = partnerLabelPage.adaptTo(Node.class);
                if (partnerLabelNode.hasNode(JcrConstants.JCR_CONTENT)) {
                    Node partnerPageNode = partnerLabelNode.getNode(JcrConstants.JCR_CONTENT);
                    if (partnerPageNode.hasProperty("partnerLabel")) {
                        partnerLabel.append(partnerPageNode.getProperty("partnerLabel").getValue().getString());
                    }
                }
            }
        } catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching items for membershipSection
     */
    private void getMembershipData(Page footerPage, List<FooterSchema> membershipList) {
        try {
            Iterator<Page> membershipItems = footerPage.listChildren();
            while (membershipItems.hasNext()) {
                FooterSchema membershipData = new FooterSchema();
                Page membershipPage = membershipItems.next();
                membershipData = getFooterSchemaData(membershipData, membershipPage);
                membershipList.add(membershipData);
            }
        } catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching items for socialfollowupSection
     */
    private void getSocialFollowData(Page footerPage, FooterSchema socialFollowData) {
        try {
            Iterator<Page> socialFollowItems = footerPage.listChildren();
            while (socialFollowItems.hasNext()) {
                List<FooterSchema> socialWidgetList = new ArrayList<>();
                Page socialFollowPage = socialFollowItems.next();
                socialFollowData = getFooterSchemaData(socialFollowData, socialFollowPage);
                if(socialFollowPage.getTitle().equals("Social Widget Section")) {
                    getSocialWidgetData(socialFollowPage, socialWidgetList);
                    socialFollowData.setSocialWidgetSection(socialWidgetList);
                }
            }
        } catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching socialWidgetSection items for socialfollowupSection
     */
    private void getSocialWidgetData(Page socialFollowPage, List<FooterSchema> socialWidgetList) {
        try {
            Iterator<Page> socialWidgetItems = socialFollowPage.listChildren();
            while (socialWidgetItems.hasNext()) {
                FooterSchema socialWidgetData = new FooterSchema();
                Page socialWidgetPage = socialWidgetItems.next();
                socialWidgetData = getFooterSchemaData(socialWidgetData, socialWidgetPage);
                socialWidgetList.add(socialWidgetData);
            }
        } catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching items for socialleftBlock
     */
    private void getSocialLeftData(Page footerPage, FooterSchema socialLeftData) {
        try {
            Iterator<Page> socialLeftItems = footerPage.listChildren();
            if (socialLeftItems.hasNext()) {
                Page socialLeftPage = socialLeftItems.next();
                socialLeftData = getFooterSchemaData(socialLeftData, socialLeftPage);
            }
        } catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching items for copyrightSection
     */
    private void getCopyrightData(Page footerPage, FooterSchema copyrightData) {
        try {
            Iterator<Page> copyrightItems = footerPage.listChildren();
            if (copyrightItems.hasNext()) {
                Page copyrightPage = copyrightItems.next();
                copyrightData = getFooterSchemaData(copyrightData, copyrightPage);
            }
        } catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching items for externalLinkDisclaimerSection
     */
    private void getLinkDisclaimerData(Page footerPage, FooterSchema linkDisclaimerData) {
        try {
            Iterator<Page> linkDisclaimerItems = footerPage.listChildren();
            if (linkDisclaimerItems.hasNext()) {
                Page copyrightPage = linkDisclaimerItems.next();
                linkDisclaimerData = getFooterSchemaData(linkDisclaimerData, copyrightPage);
            }
        } catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching items for awardImageSection
     */
    private void getAwardImageData(Page footerPage, List<FooterSchema> awardImageList) {
        try {
            Iterator<Page> awardItems = footerPage.listChildren();
            while (awardItems.hasNext()) {
                FooterSchema fs3 = new FooterSchema();
                Page awardPage = awardItems.next();
                fs3 = getFooterSchemaData(fs3, awardPage);
                awardImageList.add(fs3);
            }
        } catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    /**
     * Fetching property values of every page and setting them to a bean class
     */
    private FooterSchema getFooterSchemaData(FooterSchema fs, Page footerPage) throws RepositoryException {

        Node footerNode = footerPage.adaptTo(Node.class);
        if (footerNode.hasNode(JcrConstants.JCR_CONTENT)) {
            Node navPageNode = footerNode.getNode(JcrConstants.JCR_CONTENT);

            //Creating linkTypeContainer Map with link and targetType property
            String link, targetType;
            Map linkType = new HashMap<>();
            if (navPageNode.hasProperty("linkFooter")) {
                link = navPageNode.getProperty("linkFooter").getValue().getString();
                linkType.put("link", link);
            }

            if (navPageNode.hasProperty("targetTypeFooter")) {
                targetType = navPageNode.getProperty("targetTypeFooter").getValue().getString();
                linkType.put("targetType", targetType);
            }

            if (!linkType.isEmpty()) {
                fs.setLinkTypeContainer(linkType);
            }

            if(navPageNode.hasProperty("firstLevelLinkLabel")){
                fs.setFirstLevelLinkLabel(navPageNode.getProperty("firstLevelLinkLabel").getValue().getString());
            }

            if(navPageNode.hasProperty("secondLevelLinkLabel")){
                fs.setSecondLevelLinkLabel(navPageNode.getProperty("secondLevelLinkLabel").getValue().getString());
            }

            if(navPageNode.hasProperty("mundoFirstLevelLinkLabel")){
                fs.setFirstLevelLinkLabel(navPageNode.getProperty("mundoFirstLevelLinkLabel").getValue().getString());
            }

            if(navPageNode.hasProperty("mundoSecondLevelLinkLabel")){
                fs.setSecondLevelLinkLabel(navPageNode.getProperty("mundoSecondLevelLinkLabel").getValue().getString());
            }

            if(navPageNode.hasProperty("linkImageFooter")){
                fs.setLinkImage(navPageNode.getProperty("linkImageFooter").getValue().getString());
            }

            if(navPageNode.hasNode("allowedCountryList")) {
                List<String> allowedCountriesValues = new ArrayList<>();
                Node allowedCountriesNode = navPageNode.getNode("allowedCountryList");
                Iterator<Node> allowedCountriesItems = allowedCountriesNode.getNodes();
                while(allowedCountriesItems.hasNext()) {
                    Node allowedCountriesItem = allowedCountriesItems.next();
                    allowedCountriesValues.add(allowedCountriesItem.getProperty("allowedCountryListItems").getValue().getString());
                }
                fs.setAllowedCountry(allowedCountriesValues);
            }

            if(navPageNode.hasNode("restrictedCountryList")) {
                List<String> restrictedCountriesValues = new ArrayList<>();
                Node restrictedCountriesNode = navPageNode.getNode("restrictedCountryList");
                Iterator<Node> restrictedCountriesItems = restrictedCountriesNode.getNodes();
                while(restrictedCountriesItems.hasNext()) {
                    Node allowedCountriesItem = restrictedCountriesItems.next();
                    restrictedCountriesValues.add(allowedCountriesItem.getProperty("restrictedCountryListItems").getValue().getString());
                }
                fs.setRestrictedCountry(restrictedCountriesValues);
            }

            if(navPageNode.hasNode("socialAllowedCountryList")) {
                List<String> allowedCountriesValues = new ArrayList<>();
                Node allowedCountriesNode = navPageNode.getNode("socialAllowedCountryList");
                Iterator<Node> allowedCountriesItems = allowedCountriesNode.getNodes();
                while(allowedCountriesItems.hasNext()) {
                    Node allowedCountriesItem = allowedCountriesItems.next();
                    allowedCountriesValues.add(allowedCountriesItem.getProperty("socialAllowedCountryListItems").getValue().getString());
                }
                fs.setAllowedCountry(allowedCountriesValues);
            }

            if(navPageNode.hasNode("socialRestrictedCountryList")) {
                List<String> restrictedCountriesValues = new ArrayList<>();
                Node restrictedCountriesNode = navPageNode.getNode("socialRestrictedCountryList");
                Iterator<Node> restrictedCountriesItems = restrictedCountriesNode.getNodes();
                while(restrictedCountriesItems.hasNext()) {
                    Node allowedCountriesItem = restrictedCountriesItems.next();
                    restrictedCountriesValues.add(allowedCountriesItem.getProperty("socialRestrictedCountryListItems").getValue().getString());
                }
                fs.setRestrictedCountry(restrictedCountriesValues);
            }

            if(navPageNode.hasNode("mundoAllowedCountryList")) {
                List<String> allowedCountriesValues = new ArrayList<>();
                Node allowedCountriesNode = navPageNode.getNode("mundoAllowedCountryList");
                Iterator<Node> allowedCountriesItems = allowedCountriesNode.getNodes();
                while(allowedCountriesItems.hasNext()) {
                    Node allowedCountriesItem = allowedCountriesItems.next();
                    allowedCountriesValues.add(allowedCountriesItem.getProperty("mundoAllowedCountryListItems").getValue().getString());
                }
                fs.setAllowedCountry(allowedCountriesValues);
            }

            if(navPageNode.hasProperty("membershipImage")){
                fs.setImage(navPageNode.getProperty("membershipImage").getValue().getString());
            }

            if(navPageNode.hasProperty("membershipAltText")){
                fs.setAltText(navPageNode.getProperty("membershipAltText").getValue().getString());
            }

            if(navPageNode.hasProperty("awardImage")){
                fs.setAwardImage(navPageNode.getProperty("awardImage").getValue().getString());
            }

            if(navPageNode.hasProperty("awardAltText")){
                fs.setAltText(navPageNode.getProperty("awardAltText").getValue().getString());
            }

            if(navPageNode.hasProperty("copyrgtText")){
                fs.setCopyrgtText(navPageNode.getProperty("copyrgtText").getValue().getString());
            }

            if(navPageNode.hasProperty("externalLinkDisclaimerText")){
                fs.setExternalLinkDisclaimerText(navPageNode.getProperty("externalLinkDisclaimerText").getValue().getString());
            }

            if(navPageNode.hasProperty("newsletter")){
                fs.setNewsletter(navPageNode.getProperty("newsletter").getValue().getString());
            }

            if(navPageNode.hasProperty("socialFollowUpText")){
                fs.setSocialFollowUpText(navPageNode.getProperty("socialFollowUpText").getValue().getString());
            }

            if(navPageNode.hasProperty("socialIconName")){
                fs.setSocialIconName(navPageNode.getProperty("socialIconName").getValue().getString());
            }
        }
        return fs;
    }

    /**
     * Creating Footer JSON and store the file in DAM
     */
    private void storeJsonInJcr(Map<String, Object> footerDataMap, ResourceResolver resourceResolver, String jsonStorageDirectory, String jsonFileName) {
        try {
            AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);
            Session session = resourceResolver.adaptTo(Session.class);
            Gson gson = new Gson();
            String uglyJsonString = gson.toJson(footerDataMap);
            Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
            JsonElement je = JsonParser.parseString(uglyJsonString);
            String prettyJsonString = prettyGson.toJson(je);
            ValueFactory valueFactory = null;
            Binary binary = null;
            InputStream jsonInputStream = new ByteArrayInputStream(prettyJsonString.getBytes(StandardCharsets.UTF_8));
            valueFactory = session.getValueFactory();
            binary = valueFactory.createBinary(jsonInputStream);
            if (Objects.nonNull(assetManager)) {
                assetManager.createOrUpdateAsset(
                        jsonStorageDirectory.concat("/".concat(jsonFileName)),
                        binary,
                        MIME_TYPE,
                        true);
            } else {
                log.error("Asset Manager Object is NULL");
            }

        } catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }
}
